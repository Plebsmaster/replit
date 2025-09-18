import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] OTP verification API called")
    const { email, code } = await request.json()
    console.log("[v0] Verifying OTP for email:", email, "with code:", code)

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 })
    }

    const requiredEnvVars = {
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key)

    if (missingVars.length > 0) {
      console.error("[v0] Missing Twilio environment variables:", missingVars)
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    try {
      const supabase = await createClient()

      // First verify that this is an existing user (only existing users should be verifying OTP)
      console.log("[v0] Checking if user exists and is eligible for OTP verification...")
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("id, email, first_name, last_name")
        .eq("email", email.toLowerCase().trim())
        .single()

      if (clientError || !client) {
        console.log("[v0] Client not found - verification not allowed for new users")
        return NextResponse.json({ error: "User not found or not eligible for verification" }, { status: 400 })
      }

      // Verify the OTP code from our database (since we generated and sent it via SendGrid)
      console.log("[v0] Looking up OTP in database...")
      const { data: otpRecord, error: otpError } = await supabase
        .from("email_otps")
        .select("*")
        .eq("email", email.toLowerCase().trim())
        .eq("otp_code", code)
        .eq("verified", false)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (otpError) {
        console.error("[v0] Database error during OTP lookup:", otpError)
        return NextResponse.json({ error: "Database query failed" }, { status: 500 })
      }

      if (!otpRecord) {
        console.log("[v0] OTP not found or already verified")
        
        // Increment attempts counter for existing OTPs to prevent brute force
        await supabase
          .from("email_otps")
          .update({ attempts: supabase.raw('attempts + 1') })
          .eq("email", email.toLowerCase().trim())
          .eq("verified", false)
          .gt("expires_at", new Date().toISOString())
        
        return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
      }

      // Check if OTP has expired
      const now = new Date()
      const expiresAt = new Date(otpRecord.expires_at)
      if (now > expiresAt) {
        console.log("[v0] OTP has expired")
        return NextResponse.json({ error: "Code has expired" }, { status: 400 })
      }

      // Check attempt limits (prevent brute force)
      if (otpRecord.attempts >= 5) {
        console.log("[v0] Too many attempts for this OTP")
        return NextResponse.json({ error: "Too many attempts" }, { status: 423 })
      }

      // Mark OTP as verified
      const { error: updateError } = await supabase
        .from("email_otps")
        .update({ 
          verified: true, 
          verified_at: new Date().toISOString(),
          attempts: otpRecord.attempts + 1
        })
        .eq("id", otpRecord.id)

      if (updateError) {
        console.error("[v0] Failed to update OTP record:", updateError)
        return NextResponse.json({ error: "Verification update failed" }, { status: 500 })
      }

      console.log("[v0] OTP verified successfully for existing client:", client.id)

      console.log("[v0] Setting session cookie for client:", client.id)
      const response = NextResponse.json({ ok: true })

      const host = request.headers.get("host") || "localhost"
      const isProduction = process.env.NODE_ENV === "production"

      // Logic to determine the correct cookie domain
      let cookieDomain: string | undefined
      if (isProduction) {
        // For production, scope to the root domain to include all subdomains
        // Assumes your production host is something like 'www.elixify.com' or 'elixify.com'
        cookieDomain = host.replace(/^www\./, "")
      } else if (host !== "localhost") {
        // For Vercel previews (and other non-localhost dev environments), use the exact host
        cookieDomain = host
      }
      // For localhost, cookieDomain remains undefined, which is correct.

      const cookieOptions = {
        name: "sid_client",
        value: client.id, // The verified client ID
        path: "/",
        httpOnly: true,
        secure: true, // Should always be true on Vercel (HTTPS)
        sameSite: "lax" as const,
        maxAge: 7 * 24 * 60 * 60, // 7 days
        domain: cookieDomain, // Apply the dynamic domain
      }

      console.log("[v0] Cookie options:", cookieOptions)
      response.cookies.set(cookieOptions)

      console.log("[v0] Session cookie set successfully")
      console.log("[v0] OTP verified, redirecting to dashboard")
      return response
    } catch (twilioError: any) {
      console.error("[v0] Twilio verification API error:", twilioError)
      return NextResponse.json({ error: "Verification service unavailable" }, { status: 502 })
    }
  } catch (error) {
    console.error("[v0] Error verifying OTP:", error)
    return NextResponse.json(
      {
        error: "Failed to verify OTP. Please try again.",
      },
      { status: 500 },
    )
  }
}
