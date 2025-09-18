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
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
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

      if (!client) {
        console.log("[v0] New client - proceeding with normal flow")
        return NextResponse.json({ sent: false })
      }

      console.log("[v0] Existing client found, sending OTP...")

      try {
        const twilioUrl = `https://verify.twilio.com/v2/Services/${requiredEnvVars.TWILIO_VERIFY_SERVICE_SID}/Verifications`

        const verificationData = new URLSearchParams({
          Channel: "email",
          To: email,
        })

        // Add template if available
        if (process.env.TWILIO_VERIFY_TEMPLATE_ID) {
          verificationData.append(
            "ChannelConfiguration",
            JSON.stringify({
              template_id: process.env.TWILIO_VERIFY_TEMPLATE_ID,
            }),
          )
        }

        const authHeader = Buffer.from(
          `${requiredEnvVars.TWILIO_ACCOUNT_SID}:${requiredEnvVars.TWILIO_AUTH_TOKEN}`,
        ).toString("base64")

        console.log("[v0] Making Twilio HTTP API request...")
        const twilioResponse = await fetch(twilioUrl, {
          method: "POST",
          headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: verificationData.toString(),
        })

        console.log("[v0] Twilio response status:", twilioResponse.status)

        if (!twilioResponse.ok) {
          const errorText = await twilioResponse.text()
          console.error("[v0] Twilio API error:", errorText)

          // Handle specific HTTP status codes
          if (twilioResponse.status === 401) {
            return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
          } else if (twilioResponse.status === 429) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
          } else {
            return NextResponse.json({ error: "Failed to send verification email" }, { status: 502 })
          }
        }

        const twilioResult = await twilioResponse.json()
        console.log("[v0] OTP sent successfully via Twilio HTTP API:", twilioResult.status)

        try {
          await supabase.from("email_events").insert({
            email: email.toLowerCase().trim(),
            event_type: "otp_sent",
            created_at: new Date().toISOString(),
          })
          console.log("[v0] Email event logged")
        } catch (eventError) {
          console.warn("[v0] Failed to log email event (non-critical):", eventError)
        }

        return NextResponse.json({ sent: true })
      } catch (twilioError: any) {
        console.error("[v0] Twilio HTTP API error:", twilioError)
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
