import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const CURRENT_SCHEMA_VERSION = 1

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Submit form API called")
    const formData = await request.json()

    console.log("[v0] Received form data:", JSON.stringify(formData, null, 2))

    // Create Supabase client
    const supabase = await createClient()
    console.log("[v0] Supabase client created successfully")

    const normalizedData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone || null,
      style: formData.style || null,
      text_color: formData.textColor || null,
      color_palette: formData.colorPalette || null,
      color_mode: formData.colorMode || null,
      ingredients: formData.ingredients || [],
      product_colors: formData.productColors || {},
      agree_terms: formData.agreeTerms || false,
      subscribe_newsletter: formData.subscribeNewsletter || false,
    }

    const { data: transactionResult, error: transactionError } = await supabase.rpc("handle_form_submission", {
      p_email: formData.email,
      p_first_name: formData.firstName,
      p_last_name: formData.lastName,
      p_phone: formData.phone || null,
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

    const submissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone || null,
      style: formData.style || null,
      text_color: formData.textColor || null,
      color_palette: formData.colorPalette || null,
      color_mode: formData.colorMode || null,
      ingredients: formData.ingredients || [],
      product_colors: formData.productColors || {},
      agree_terms: formData.agreeTerms || false,
      subscribe_newsletter: formData.subscribeNewsletter || false,
    }

    const { data: logData, error: logError } = await supabase.from("form_submissions").insert(submissionData).select()

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

    const supabase = await createClient()

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .single()

    if (clientError && clientError.code !== "PGRST116") {
      console.error("[v0] Error fetching client data:", clientError)
      throw new Error(`Database error: ${clientError.message}`)
    }

    const { data: formSubmissions, error: submissionError } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })

    if (submissionError) {
      console.error("[v0] Error fetching form submissions:", submissionError)
    }

    const latestSubmission = formSubmissions?.[0]
    const isLocked = clientData?.is_locked || latestSubmission?.is_locked || false

    return NextResponse.json({
      success: true,
      data: {
        client: clientData,
        currentDesign: latestSubmission || null,
        isLocked: isLocked,
        lastUpdated: latestSubmission?.created_at || null,
        hasSubmission: !!latestSubmission,
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
