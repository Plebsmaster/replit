"use client"

import { useState } from "react"
import { useFormData } from "@/components/form/FormProvider"

interface UseFormSubmissionReturn {
  isSubmitting: boolean
  submitStatus: "idle" | "success" | "error"
  submitMessage: string
  handleSubmit: () => Promise<void>
  resetSubmission: () => void
}

export function useFormSubmission(): UseFormSubmissionReturn {
  const { formData } = useFormData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async () => {
    console.log("[v0] Starting form submission...")
    console.log("[v0] Form data being submitted:", formData)

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      console.log("[v0] Sending POST request to /api/submit-form")
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("[v0] Response status:", response.status)
      const result = await response.json()
      console.log("[v0] API response:", result)

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setSubmitMessage("Formulier succesvol verzonden!")
        console.log("[v0] Submission successful!")
      } else {
        throw new Error(result.message || "Er is een fout opgetreden")
      }
    } catch (error) {
      console.error("[v0] Submission error:", error)
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Er is een onbekende fout opgetreden")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetSubmission = () => {
    setSubmitStatus("idle")
    setSubmitMessage("")
  }

  return {
    isSubmitting,
    submitStatus,
    submitMessage,
    handleSubmit,
    resetSubmission
  }
}