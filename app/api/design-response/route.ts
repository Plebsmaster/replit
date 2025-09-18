import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("clientId")

  if (!clientId) {
    return NextResponse.json({ success: false, message: "Client ID is required" }, { status: 400 })
  }

  try {
    const supabase = createServiceRoleClient()

    const { data, error } = await supabase
      .from("design_responses")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: data || null,
    })
  } catch (error) {
    console.error("Error fetching design response:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch design response" }, { status: 500 })
  }
}
