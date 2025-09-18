import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const supabase = createServiceRoleClient()

    const { error: submissionError } = await supabase.from("form_submissions").delete().eq("email", email)

    if (submissionError) {
      throw submissionError
    }

    // Get client ID and clear design responses
    const { data: client } = await supabase.from("clients").select("id").eq("email", email).single()

    if (client) {
      const { error: responseError } = await supabase.from("design_responses").delete().eq("client_id", client.id)

      if (responseError) {
        console.error("Error clearing design responses:", responseError)
      }

      const { error: clientError } = await supabase.from("clients").delete().eq("email", email)

      if (clientError) {
        console.error("Error clearing client record:", clientError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error clearing submissions:", error)
    return NextResponse.json({ success: false, message: "Failed to clear submissions" }, { status: 500 })
  }
}
