"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import type { FormData } from "@/lib/form/schema"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export function EmailStep({ formData, updateFormData, onNext }: StepProps) {
  const [email, setEmail] = useState(formData.email || "")
  const [error, setError] = useState("")
  const [validationState, setValidationState] = useState<"idle" | "valid" | "invalid">("idle")
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (touched) {
      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim()) {
          setError("E-mailadres is verplicht")
          setValidationState("invalid")
        } else if (!emailRegex.test(email)) {
          setError("Voer een geldig e-mailadres in")
          setValidationState("invalid")
        } else {
          setError("")
          setValidationState("valid")
        }
      }

      const timeout = setTimeout(validateEmail, 300)
      return () => clearTimeout(timeout)
    }
  }, [email, touched])

  const handleEmailChange = (value: string) => {
    console.log("[v0] EmailStep: Email changed to:", value)
    setEmail(value)
    updateFormData({ email: value })
    setTouched(true)
  }

  const handleNext = () => {
    console.log("[v0] EmailStep: Next button clicked with email:", email)
    console.log("[v0] EmailStep: Validation state:", validationState)
    if (validationState === "valid") {
      console.log("[v0] EmailStep: Calling onNext")
      onNext()
    } else {
      console.log("[v0] EmailStep: Email validation failed, not proceeding")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && validationState === "valid") {
      console.log("[v0] EmailStep: Enter key pressed, proceeding")
      handleNext()
    }
  }

  const getInputClassName = () => {
    const baseClass = "w-full p-4 border rounded-lg transition-colors duration-200 text-lg"
    const focusClass = "focus:outline-none focus:ring-2 focus:ring-offset-1"

    if (validationState === "valid") {
      return `${baseClass} ${focusClass} border-green-300 focus:border-green-500 focus:ring-green-200`
    } else if (validationState === "invalid") {
      return `${baseClass} ${focusClass} border-red-300 focus:border-red-500 focus:ring-red-200`
    } else {
      return `${baseClass} ${focusClass} border-gray-300 focus:border-black focus:ring-black/10`
    }
  }

  const getValidationIcon = () => {
    if (validationState === "valid") {
      return <CheckCircle className="w-6 h-6 text-green-500" />
    } else if (validationState === "invalid") {
      return <AlertCircle className="w-6 h-6 text-red-500" />
    }
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={getTypographyClasses("title", { alignment: "center" })}>Welkom bij SalonID</h2>
        <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} max-w-2xl mx-auto`}>
          Voer je e-mailadres in om te beginnen. Als je al een account hebt, log je automatisch in op je dashboard.
        </p>
      </div>

      <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
          <Input
            type="email"
            placeholder="je@email.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyPress={handleKeyPress}
            className={`${getInputClassName()} pl-12 pr-12`}
            autoFocus
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">{getValidationIcon()}</div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        <div className="mt-6">
          <Button
            onClick={handleNext}
            disabled={validationState !== "valid"}
            className="w-full bg-gray-900 text-white hover:bg-gray-800 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Doorgaan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className={getTypographyClasses("paragraph", { alignment: "center", removeSpacing: true })}>
            Nieuw hier? We vragen je daarna om je naam en telefoonnummer.
          </p>
        </div>
      </div>
    </div>
  )
}
