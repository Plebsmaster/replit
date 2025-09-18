import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { generateOTP, sendOTPEmail } from "@/lib/sendgrid"

export async function POST(request: NextRequest) {
  console.log("[v0] OTP API: Request received")

  try {
    let email: string
    try {
      const body = await request.json()
      email = body.email

      if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
      }

      console.log("[v0] OTP API: Valid email received:", email)
    } catch (parseError) {
      console.error("[v0] OTP API: Failed to parse request JSON:", parseError)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    const requiredEnvVars = {
      SUPABASE_URL: process.env.SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key)

    if (missingVars.length > 0) {
      console.error("[v0] Missing environment variables:", missingVars)
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    let supabase
    try {
      console.log("[v0] Creating Supabase client...")
      const cookieStore = await cookies()

      supabase = createServerClient(requiredEnvVars.SUPABASE_URL!, requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch (error) {
              console.warn("[v0] Cookie setting failed (non-critical):", error)
            }
          },
        },
      })

      console.log("[v0] Supabase client created successfully")
    } catch (supabaseError) {
      console.error("[v0] Supabase client creation error:", supabaseError)
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    console.log("[v0] Checking if client exists...")
    try {
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("id, email, first_name")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle()

      if (clientError) {
        console.error("[v0] Database error during client lookup:", clientError)
        return NextResponse.json({ error: "Database query failed" }, { status: 500 })
      }

      // NEW LOGIC: Only send OTP for existing users
      if (!client) {
        console.log("[v0] New user detected - no OTP needed")
        return NextResponse.json({ 
          sent: false, 
          message: "New user - OTP not required" 
        })
      }

      console.log("[v0] Existing client found - sending OTP via SendGrid...")

      try {
        // Generate OTP code
        const otpCode = generateOTP()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

        // Store OTP in database
        const { error: otpInsertError } = await supabase
          .from("email_otps")
          .insert({
            email: email.toLowerCase().trim(),
            otp_code: otpCode,
            expires_at: expiresAt.toISOString(),
            verified: false,
            attempts: 0
          })

        if (otpInsertError) {
          console.error("[v0] Failed to store OTP in database:", otpInsertError)
          return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 })
        }

        // Send OTP via SendGrid
        const emailSent = await sendOTPEmail(email, otpCode)

        if (!emailSent) {
          console.error("[v0] Failed to send OTP email via SendGrid")
          return NextResponse.json({ error: "Failed to send verification email" }, { status: 502 })
        }

        console.log("[v0] OTP sent successfully via SendGrid")

        // Log email event
        try {
          await supabase.from("email_events").insert({
            email: email.toLowerCase().trim(),
            event_type: "otp_sent_sendgrid",
            created_at: new Date().toISOString(),
          })
          console.log("[v0] Email event logged")
        } catch (eventError) {
          console.warn("[v0] Failed to log email event (non-critical):", eventError)
        }

        return NextResponse.json({ sent: true })
      } catch (sendGridError: any) {
        console.error("[v0] SendGrid email error:", sendGridError)
        return NextResponse.json({ error: "Failed to send verification email" }, { status: 502 })
      }
    } catch (dbError) {
      console.error("[v0] Database operation error:", dbError)
      return NextResponse.json({ error: "Database operation failed" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Unexpected error in OTP generation:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}