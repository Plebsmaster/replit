import { type NextRequest, NextResponse } from "next/server"
import { createClient, createServiceRoleClient } from "@/lib/supabase/server"
import { createDesignData, createSubmissionData } from "@/lib/database/field-mappings"

const CURRENT_SCHEMA_VERSION = 1

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Submit form API called")
    const formData = await request.json()

    console.log("[v0] Received form data:", JSON.stringify(formData, null, 2))

    // Create Supabase client
    const supabase = await createClient()
    console.log("[v0] Supabase client created successfully")

    // Use centralized mapping system for all form data
    const normalizedData = createDesignData(formData)
    const fullSubmissionData = createSubmissionData(formData)

    const { data: transactionResult, error: transactionError } = await supabase.rpc("handle_form_submission", {
      p_email: fullSubmissionData.email,
      p_first_name: fullSubmissionData.first_name,
      p_last_name: fullSubmissionData.last_name,
      p_phone: fullSubmissionData.phone,
      p_design_data: normalizedData,
      p_schema_version: CURRENT_SCHEMA_VERSION,
    })

    if (transactionError) {
      console.error("[v0] Transaction error:", transactionError)

      if (transactionError.message?.includes("locked")) {
        return NextResponse.json(
          {
            success: false,
            message: "Your design is locked. Contact support.",
            locked: true,
          },
          { status: 423 },
        )
      }

      throw new Error(`Database error: ${transactionError.message}`)
    }

    // Use the already mapped submission data for database insert
    const { data: logData, error: logError } = await supabase.from("form_submissions").insert(fullSubmissionData).select()

    if (logError) {
      console.warn("[v0] Warning: Failed to create immutable log:", logError.message)
    }

    console.log("[v0] Successfully processed form submission")

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data: transactionResult,
    })
  } catch (error) {
    console.error("[v0] Error submitting form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ success: false, message: "Email parameter is required" }, { status: 400 })
    }

    const supabase = createServiceRoleClient()

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .single()

    if (clientError && clientError.code !== "PGRST116") {
      console.error("[v0] Error fetching client data:", clientError)
      throw new Error(`Database error: ${clientError.message}`)
    }

    console.log("[v0] Querying form_submissions for email:", email)
    
    const { data: formSubmissions, error: submissionError } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })

    console.log("[v0] Form submissions query result:", {
      data: formSubmissions,
      error: submissionError,
      count: formSubmissions?.length || 0
    })

    if (submissionError) {
      console.error("[v0] Error fetching form submissions:", submissionError)
    }

    const latestSubmission = formSubmissions?.[0]
    const isLocked = clientData?.is_locked || latestSubmission?.is_locked || false

    // Check for design responses
    const { data: designResponses, error: designError } = await supabase
      .from("design_responses")
      .select("*")
      .eq("client_id", clientData?.id)
      .order("created_at", { ascending: false })

    if (designError && designError.code !== "PGRST116") {
      console.error("[v0] Error fetching design responses:", designError)
    }

    const hasDesignResponse = !!(designResponses && designResponses.length > 0)

    console.log("[v0] GET /api/submit-form debug for email:", email, {
      hasClient: !!clientData,
      hasSubmissions: !!(formSubmissions && formSubmissions.length > 0),
      submissionCount: formSubmissions?.length || 0,
      latestSubmissionData: latestSubmission ? {
        id: latestSubmission.id,
        style: latestSubmission.style,
        created_at: latestSubmission.created_at
      } : null,
      isLocked,
      hasDesignResponse
    })

    return NextResponse.json({
      success: true,
      data: {
        client: clientData,
        currentDesign: latestSubmission || null,
        isLocked: isLocked,
        lastUpdated: latestSubmission?.created_at || null,
        hasFormSubmission: !!latestSubmission,  // Fixed: was hasSubmission, now matches dashboard expectation
        hasDesignResponse: hasDesignResponse,    // Added: missing field expected by dashboard
        formSubmissions: formSubmissions || [],
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching client data:", error)
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
