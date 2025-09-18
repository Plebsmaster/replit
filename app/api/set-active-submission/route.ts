import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { submissionId, email } = await request.json()

    if (!submissionId || !email) {
      return NextResponse.json({ success: false, message: "Submission ID and email are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // First, deactivate all submissions for this email
    const { error: deactivateError } = await supabase
      .from("form_submissions")
      .update({ is_active: false })
      .eq("email", email)
      .eq("is_locked", false) // Only update unlocked submissions

    if (deactivateError) {
      console.error("[v0] Error deactivating submissions:", deactivateError)
      throw new Error(`Failed to deactivate submissions: ${deactivateError.message}`)
    }

    // Then, activate the selected submission
    const { data, error: activateError } = await supabase
      .from("form_submissions")
      .update({ is_active: true })
      .eq("id", submissionId)
      .eq("email", email)
      .eq("is_locked", false) // Only update if not locked
      .select()

    if (activateError) {
      console.error("[v0] Error activating submission:", activateError)
      throw new Error(`Failed to activate submission: ${activateError.message}`)
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, message: "Submission not found or is locked" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Active submission updated successfully",
      data: data[0],
    })
  } catch (error) {
    console.error("[v0] Error setting active submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update active submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
