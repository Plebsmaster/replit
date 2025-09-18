import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] /api/client/me: Request received")

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("sid_client")

    console.log("[v0] /api/client/me: Session cookie:", sessionCookie ? "present" : "missing")

    if (!sessionCookie?.value) {
      console.log("[v0] /api/client/me: No session cookie, returning 401")
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] /api/client/me: Creating service role Supabase client...")
    const supabase = createServiceRoleClient()

    console.log("[v0] /api/client/me: Looking up client with ID:", sessionCookie.value)
    const { data: client, error } = await supabase.from("clients").select("*").eq("id", sessionCookie.value).single()

    if (error || !client) {
      console.error("[v0] /api/client/me: Client not found:", error)
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 })
    }

    console.log("[v0] /api/client/me: Client found, returning data for:", client.email)
    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        email: client.email,
        firstName: client.first_name,
        lastName: client.last_name,
      },
    })
  } catch (error) {
    console.error("[v0] /api/client/me: Error fetching client data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch client data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
