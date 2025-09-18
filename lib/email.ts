import { createClient } from "@/lib/supabase/server"

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

interface EmailResult {
  success: boolean
  error?: string
}

export async function sendMail({ to, subject, text, html }: EmailOptions): Promise<EmailResult> {
  const supabase = await createClient()

  // Create email content
  const fromName = process.env.EMAIL_FROM_NAME || "SalonID Support"
  const fromAddress = process.env.EMAIL_FROM_ADDRESS || "support@salonid.com"
  const replyTo = process.env.EMAIL_FROM_ADDRESS || "support@salonid.com"

  const emailContent = {
    from: `${fromName} <${fromAddress}>`,
    replyTo,
    to,
    subject,
    text,
    html: html || text,
  }

  let lastError: any
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`[v0] Email attempt ${attempt} to ${to}`)
      console.log(`[v0] Email content:`, emailContent)

      const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL

      if (!googleScriptUrl) {
        throw new Error("GOOGLE_SCRIPT_URL environment variable is not set")
      }

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          text,
          html: html || text,
          from: fromAddress,
          fromName,
          replyTo,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Email sending failed")
      }

      try {
        const { data: client } = await supabase.from("clients").select("id").eq("email", to).single()

        await supabase.from("email_events").insert({
          email: to,
          client_id: client?.id || null,
          event_type: "otp_sent",
          meta: { subject, attempt },
        })
      } catch (dbError) {
        console.error("[v0] Failed to log email event:", dbError)
      }

      console.log(`[v0] Email sent successfully to ${to}`)
      return { success: true }
    } catch (error: any) {
      lastError = error
      console.error(`[v0] Email attempt ${attempt} failed:`, error.message)

      const isRetryable =
        error.message.includes("timeout") ||
        error.message.includes("ECONNRESET") ||
        error.message.includes("500") ||
        error.message.includes("429")

      if (!isRetryable || attempt === 3) {
        break
      }

      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  try {
    const { data: client } = await supabase.from("clients").select("id").eq("email", to).single()

    await supabase.from("email_events").insert({
      email: to,
      client_id: client?.id || null,
      event_type: "otp_failed",
      meta: {
        subject,
        error: lastError?.message || "Unknown error",
        attempts: 3,
      },
    })
  } catch (dbError) {
    console.error("[v0] Failed to log email failure event:", dbError)
  }

  return {
    success: false,
    error: lastError?.message || "Failed to send email after 3 attempts",
  }
}
