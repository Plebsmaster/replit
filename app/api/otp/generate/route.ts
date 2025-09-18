import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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

      console.log("[v0] Existing client found - using Twilio Verify API...")

      try {
        // Check for required Twilio environment variables
        const requiredTwilioVars = {
          TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
          TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
          TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
          TWILIO_VERIFY_TEMPLATE_ID: process.env.TWILIO_VERIFY_TEMPLATE_ID,
        }

        const missingTwilioVars = Object.entries(requiredTwilioVars)
          .filter(([_, value]) => !value)
          .map(([key, _]) => key)

        if (missingTwilioVars.length > 0) {
          console.error("[v0] Missing Twilio environment variables:", missingTwilioVars)
          return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        // Use Twilio Verify API to send OTP with custom template
        const twilioApiUrl = `https://verify.twilio.com/v2/Services/${requiredTwilioVars.TWILIO_VERIFY_SERVICE_SID}/Verifications`
        
        // Create Basic Auth header
        const authString = `${requiredTwilioVars.TWILIO_ACCOUNT_SID}:${requiredTwilioVars.TWILIO_AUTH_TOKEN}`
        const encodedAuth = Buffer.from(authString).toString('base64')

        // Prepare request body for Twilio Verify API
        const formData = new URLSearchParams({
          'To': email.toLowerCase().trim(),
          'Channel': 'email',
          'ChannelConfiguration[TemplateSid]': requiredTwilioVars.TWILIO_VERIFY_TEMPLATE_ID!
        })

        console.log("[v0] Sending OTP request to Twilio Verify API...")
        
        const twilioResponse = await fetch(twilioApiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${encodedAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData
        })

        if (!twilioResponse.ok) {
          const errorText = await twilioResponse.text()
          console.error("[v0] Twilio Verify API error:", twilioResponse.status, errorText)
          return NextResponse.json({ error: "Failed to send verification email" }, { status: 502 })
        }

        const twilioResult = await twilioResponse.json()
        console.log("[v0] OTP sent successfully via Twilio Verify API")

        // Log email event
        try {
          await supabase.from("email_events").insert({
            email: email.toLowerCase().trim(),
            event_type: "otp_sent_twilio_verify_api",
            created_at: new Date().toISOString(),
          })
          console.log("[v0] Email event logged")
        } catch (eventError) {
          console.warn("[v0] Failed to log email event (non-critical):", eventError)
        }

        return NextResponse.json({ sent: true })
      } catch (error: any) {
        console.error("[v0] OTP generation error:", error)
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