import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServiceRoleClient()

    const { data: admins, error } = await supabase
      .from("admin_users")
      .select("id, email, created_at, is_active, created_by")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ admins })
  } catch (error) {
    console.error("Error fetching admins:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch admin users" },
      { status: 500 },
    )
  }
}
