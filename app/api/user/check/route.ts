import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  console.log("[v0] User Check API: Request received")

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

      console.log("[v0] User Check API: Valid email received:", email)
    } catch (parseError) {
      console.error("[v0] User Check API: Failed to parse request JSON:", parseError)
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

    console.log("[v0] Checking if user exists...")
    try {
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("id, email, first_name, last_name, phone, created_at")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle()

      if (clientError) {
        console.error("[v0] Database error during client lookup:", clientError)
        return NextResponse.json({ error: "Database query failed" }, { status: 500 })
      }

      if (!client) {
        console.log("[v0] User not found - new user")
        return NextResponse.json({ 
          exists: false,
          user: null 
        })
      }

      console.log("[v0] Existing user found:", client.email)
      return NextResponse.json({ 
        exists: true,
        user: {
          id: client.id,
          email: client.email,
          firstName: client.first_name || '',
          lastName: client.last_name || '',
          phone: client.phone || '',
          createdAt: client.created_at
        }
      })

    } catch (dbError) {
      console.error("[v0] Database operation error:", dbError)
      return NextResponse.json({ error: "Database operation failed" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Unexpected error in user check:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}