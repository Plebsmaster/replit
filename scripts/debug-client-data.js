// Debug script to check what data exists for nino@salonid.com
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function debugClientData() {
  const email = "nino@salonid.com"

  console.log("[v0] =================================")
  console.log("[v0] Debugging data for:", email)
  console.log("[v0] =================================")

  // Check clients table
  console.log("[v0] 1. Checking clients table...")
  const { data: client, error: clientError } = await supabase.from("clients").select("*").eq("email", email).single()

  console.log("[v0] Client data:", client)
  console.log("[v0] Client error:", clientError)

  // Check form_submissions table
  console.log("[v0] 2. Checking form_submissions table...")
  const { data: formSubmissions, error: formError } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("email", email)

  console.log("[v0] Form submissions count:", formSubmissions?.length || 0)
  console.log("[v0] Form submissions:", formSubmissions)
  console.log("[v0] Form submissions error:", formError)

  // Check design_responses table
  if (client) {
    console.log("[v0] 3. Checking design_responses table...")
    const { data: designResponses, error: designError } = await supabase
      .from("design_responses")
      .select("*")
      .eq("client_id", client.id)

    console.log("[v0] Design responses count:", designResponses?.length || 0)
    console.log("[v0] Design responses:", designResponses)
    console.log("[v0] Design responses error:", designError)
  }

  // Check questionnaire_progress table
  if (client) {
    console.log("[v0] 4. Checking questionnaire_progress table...")
    const { data: progress, error: progressError } = await supabase
      .from("questionnaire_progress")
      .select("*")
      .eq("client_id", client.id)

    console.log("[v0] Questionnaire progress:", progress)
    console.log("[v0] Progress error:", progressError)
  }

  // Test the API endpoint that the dashboard uses
  console.log("[v0] 5. Testing API endpoint...")
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace("supabase.co", "vercel.app")}/api/submit-form?email=${encodeURIComponent(email)}`,
    )
    const result = await response.json()
    console.log("[v0] API response status:", response.status)
    console.log("[v0] API response:", result)
  } catch (apiError) {
    console.log("[v0] API test failed:", apiError)
  }

  console.log("[v0] =================================")
  console.log("[v0] Debug complete")
  console.log("[v0] =================================")
}

debugClientData().catch(console.error)
