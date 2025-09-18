import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { submissionId } = await request.json()

    if (!submissionId) {
      return NextResponse.json({ success: false, message: "Submission ID is required" }, { status: 400 })
    }

    // Get authenticated client session
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("sid_client")

    if (!sessionCookie?.value) {
      return NextResponse.json({ success: false, message: "Unauthorized - no session" }, { status: 401 })
    }

    // Use service role to verify session and get client email
    const supabase = createServiceRoleClient()
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("email")
      .eq("id", sessionCookie.value)
      .single()

    if (clientError || !client) {
      return NextResponse.json({ success: false, message: "Unauthorized - invalid session" }, { status: 401 })
    }

    const email = client.email
    console.log("[v0] Setting active submission for authenticated user:", { submissionId, email })

    // Verify submission ownership - ensure submissionId belongs to authenticated user
    const { data: verifySubmission, error: verifyError } = await supabase
      .from('form_submissions')
      .select('id, email, is_locked')
      .eq('id', submissionId)
      .single()

    if (verifyError || !verifySubmission) {
      return NextResponse.json({ success: false, message: "Submission not found" }, { status: 404 })
    }

    if (verifySubmission.email !== email) {
      console.error("[v0] Ownership verification failed:", { submissionEmail: verifySubmission.email, userEmail: email })
      return NextResponse.json({ success: false, message: "Unauthorized - submission does not belong to user" }, { status: 403 })
    }

    if (verifySubmission.is_locked) {
      return NextResponse.json({ success: false, message: "Submission is locked and cannot be modified" }, { status: 403 })
    }

    // First, deactivate all submissions for this authenticated user
    const { error: deactivateError } = await supabase
      .from('form_submissions')
      .update({ is_active: false })
      .eq('email', email)
      .eq('is_locked', false)

    if (deactivateError) {
      console.error("[v0] Error deactivating submissions:", deactivateError)
      return NextResponse.json(
        { success: false, message: "Failed to deactivate other submissions" },
        { status: 500 }
      )
    }

    // Then, activate the selected submission (now verified to belong to user)
    const { data, error: activateError } = await supabase
      .from('form_submissions')
      .update({ 
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId)
      .eq('email', email)
      .select()

    if (activateError) {
      console.error("[v0] Error activating submission:", activateError)
      return NextResponse.json(
        { success: false, message: "Failed to activate submission" },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, message: "Submission not found after update" }, { status: 404 })
    }

    console.log("[v0] Successfully set active submission:", data[0])
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
