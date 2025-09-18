import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest) {
  try {
    const { submissionId, email } = await request.json()

    if (!submissionId || !email) {
      return NextResponse.json({ success: false, message: "Submission ID and email are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Delete the submission (only if not locked and belongs to the email)
    const { data, error } = await supabase
      .from("form_submissions")
      .delete()
      .eq("id", submissionId)
      .eq("email", email)
      .eq("is_locked", false) // Only delete if not locked
      .select()

    if (error) {
      console.error("[v0] Error deleting submission:", error)
      throw new Error(`Failed to delete submission: ${error.message}`)
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, message: "Submission not found, already deleted, or is locked" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Error deleting submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
