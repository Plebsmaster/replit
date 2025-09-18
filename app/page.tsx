"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { WelcomeStep } from "@/components/steps/Slide1"
import StyleSelectionStep from "@/components/steps/Slide2"
import Slide3 from "@/components/steps/Slide3"
import Slide4 from "@/components/steps/Slide4"
import Slide5 from "@/components/steps/Slide5"
import Slide6 from "@/components/steps/Slide6"
import Slide7 from "@/components/steps/Slide7"
import Slide8 from "@/components/steps/Slide8"
import Slide9 from "@/components/steps/Slide9"
import Slide10 from "@/components/steps/Slide10"
import Slide11 from "@/components/steps/Slide11"
import Slide12 from "@/components/steps/Slide12"
import Slide13 from "@/components/steps/Slide13"
import Slide14 from "@/components/steps/Slide14"
import Slide15 from "@/components/steps/Slide15"
import { EmailStep } from "@/components/steps/EmailStep"
import { NamePhoneStep } from "@/components/steps/NamePhoneStep"
import { OTPStep } from "@/components/steps/OTPStep"
import Slide30, { type FormData } from "@/components/steps/Slide30"
import { DashboardLoginStep } from "@/components/steps/DashboardLoginStep"

const STEPS = [
  { id: 0, title: "Welkom", component: "slide1" }, // Slide1 - Welcome (always first)
  { id: 1, title: "E-mail", component: "email" }, // Slide11 - Email (after welcome)
  { id: 2, title: "Gegevens", component: "name-phone" }, // Slide12 - Name/Phone
  { id: 3, title: "Verificatie", component: "otp" }, // Slide13 - OTP Verification
  { id: 4, title: "Stijl Selectie", component: "slide2" }, // Slide2 - Style Selection
  { id: 5, title: "Elegante Stijlen", component: "slide3" }, // Slide3 - Elegant Styles
  { id: 6, title: "Elegante Variant 1", component: "slide4" }, // Slide4 - Elegant Variant 1
  { id: 7, title: "Elegante Variant 2", component: "slide5" }, // Slide5 - Elegant Variant 2
  { id: 8, title: "Kleur Selectie (2)", component: "slide6" }, // Slide6 - Color Selection (2 options)
  { id: 9, title: "Kleur Selectie (3)", component: "slide7" }, // Slide7 - Color Selection (3 options)
  { id: 10, title: "Kleur Palet", component: "slide8" }, // Slide8 - Color Palette
  { id: 11, title: "Icoon Keuze", component: "slide9" }, // Slide9 - Icon Choice
  { id: 12, title: "Icoon Selectie", component: "slide10" }, // Slide10 - Icon Selection
  { id: 13, title: "Moderne Stijlen", component: "slide11" }, // Slide11 - Modern Styles
  { id: 14, title: "Modern 1 Variant", component: "slide12" }, // Slide12 - Modern 1 Variant
  { id: 15, title: "Modern 2 Variant", component: "slide13" }, // Slide13 - Modern 2 Variant
  { id: 16, title: "Modern 3 Variant", component: "slide14" }, // Slide14 - Modern 3 Variant
  { id: 17, title: "Modern 6 Variant", component: "slide15" }, // Slide15 - Modern 6 Variant
  { id: 18, title: "Slide 19", component: "slide19" },
  { id: 19, title: "Slide 20", component: "slide20" },
  { id: 20, title: "Slide 21", component: "slide21" },
  { id: 21, title: "Slide 22", component: "slide22" },
  { id: 22, title: "Slide 23", component: "slide23" },
  { id: 23, title: "Slide 24", component: "slide24" },
  { id: 24, title: "Slide 25", component: "slide25" },
  { id: 25, title: "Slide 26", component: "slide26" },
  { id: 26, title: "Slide 27", component: "slide27" },
  { id: 27, title: "Slide 28", component: "slide28" },
  { id: 28, title: "Slide 29", component: "slide29" },
  { id: 29, title: "Slide 30", component: "slide30" },
  { id: 30, title: "Ingrediënten", component: "ingredients" }, // Slide30 - Ingredients
  { id: 31, title: "Slide 32", component: "slide32" },
  { id: 32, title: "Slide 33", component: "slide33" },
  { id: 33, title: "Slide 34", component: "slide34" },
  { id: 34, title: "Slide 35", component: "slide35" },
  { id: 35, title: "Slide 36", component: "slide36" },
  { id: 36, title: "Slide 37", component: "slide37" },
  { id: 37, title: "Slide 38", component: "slide38" },
  { id: 38, title: "Slide 39", component: "slide39" },
  { id: 39, title: "Slide 40", component: "slide40" },
  { id: 40, title: "Slide 41", component: "slide41" },
  { id: 41, title: "Slide 42", component: "slide42" },
  { id: 42, title: "Slide 43", component: "slide43" },
  { id: 43, title: "Slide 44", component: "slide44" },
  { id: 44, title: "Slide 45", component: "slide45" },
  { id: 45, title: "Slide 46", component: "slide46" },
  { id: 46, title: "Slide 47", component: "slide47" },
  { id: 47, title: "Slide 48", component: "slide48" },
  { id: 48, title: "Slide 49", component: "slide49" },
  { id: 49, title: "Slide 50", component: "slide50" },
  { id: 50, title: "Slide 51", component: "slide51" },
  { id: 51, title: "Slide 52", component: "slide52" },
  { id: 52, title: "Slide 53", component: "slide53" },
  { id: 53, title: "Slide 54", component: "slide54" },
  { id: 54, title: "Slide 55", component: "slide55" },
  { id: 55, title: "Dashboard", component: "dashboard-login" }, // Slide14 - Dashboard (always last at position 56)
]

export default function SalonForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const [flowState, setFlowState] = useState<"normal" | "existing-user" | "new-user">("normal")
  const [otpData, setOtpData] = useState<{ email: string } | null>(null)

  const [formData, setFormData] = useState<FormData>({
    ingredients: [],
    style: null,
    elegantStyle: "",
    styleVariant: "",
    variantNumber: "",
    textColor: "",
    colorPalette: "",
    productColors: {},
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeTerms: false,
    subscribeNewsletter: false,
    colorChoice: "", // Added for color selection
  })

  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  const updateFormData = (updates: Partial<FormData>) => {
    console.log("[v0] Updating form data:", updates)
    const newFormData = { ...formData, ...updates }
    setFormData(newFormData)
  }

  const getNextStep = (currentStep: number) => {
    return currentStep + 1
  }

  const nextStep = () => {
    const nextStepNumber = getNextStep(currentStep)
    if (nextStepNumber <= STEPS.length - 1) {
      setCurrentStep(nextStepNumber)
    }
  }

  const getPrevStep = (currentStep: number) => {
    return currentStep - 1
  }

  const prevStep = () => {
    const prevStepNumber = getPrevStep(currentStep)
    if (prevStepNumber >= 0) {
      setCurrentStep(prevStepNumber)
    }
  }

  const handleEmailCheck = async (email: string) => {
    console.log("[v0] Starting email check for:", email)
    try {
      console.log("[v0] Making request to /api/otp/generate")
      const response = await fetch("/api/otp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

      let data
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
        console.log("[v0] Response data:", data)
      } else {
        console.error("[v0] Non-JSON response received:", response.status, response.statusText)
        const responseText = await response.text()
        console.error("[v0] Response text:", responseText)
        throw new Error("Server returned non-JSON response")
      }

      if (data.sent === true) {
        console.log("[v0] OTP sent successfully, switching to existing user flow")
        setOtpData({ email })
        setFlowState("existing-user")
        setCurrentStep(3)
      } else if (data.sent === false) {
        console.log("[v0] New user detected, switching to new user flow")
        setFlowState("new-user")
        setCurrentStep(2)
      } else if (response.status === 429) {
        console.log("[v0] Rate limited")
        setSubmitStatus("error")
        setSubmitMessage("Too many OTP requests. Please try again later.")
      } else if (response.status === 502) {
        console.log("[v0] Service unavailable")
        setSubmitStatus("error")
        setSubmitMessage("Failed to send verification email. Please try again.")
      } else {
        console.log("[v0] Unexpected response:", data)
        setSubmitStatus("error")
        setSubmitMessage(data.error || "An unexpected error occurred")
      }
    } catch (error) {
      console.error("[v0] Email check error:", error)
      console.log("[v0] Falling back to new user flow due to error")
      setFlowState("new-user")
      setCurrentStep(2)
    }
  }

  const handleOTPVerified = async () => {
    console.log("[v0] OTP verified, redirecting to dashboard")
    setTimeout(() => {
      console.log("[v0] Performing redirect to dashboard")
      window.location.href = "/dashboard"
    }, 100)
  }

  const handleClientDetailsNext = () => {
    if (formData.email) {
      handleEmailCheck(formData.email)
    } else {
      nextStep()
    }
  }

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
      console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

      const result = await response.json()
      console.log("[v0] API response:", result)

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setSubmitMessage("Formulier succesvol verzonden!")
        console.log("[v0] Submission successful!")

        setTimeout(() => {
          setCurrentStep(55) // Go to dashboard login step
          setSubmitStatus("idle")
          setSubmitMessage("")
        }, 2000)
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

  const handleDashboardLogin = () => {
    // Reset form state and go to email step for login
    setFormData({
      ingredients: [],
      style: null,
      elegantStyle: "",
      styleVariant: "",
      variantNumber: "",
      textColor: "",
      colorPalette: "",
      productColors: {},
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      agreeTerms: false,
      subscribeNewsletter: false,
      colorChoice: "", // Added for color selection
    })
    setCurrentStep(1) // Go to email step
    setFlowState("normal")
    setOtpData(null)
  }

  const handleStyleSelection = (style: string) => {
    console.log("[v0] Style selected:", style)
    updateFormData({ style })
    // Auto-progress after a short delay to show selection feedback
    setTimeout(() => {
      console.log("[v0] Auto-progressing from style selection")
      nextStep()
    }, 500)
  }

  const handleSlide3SelectionChange = (style: string | null) => {
    setSelectedStyle(style)
  }

  const handleSelectionMade = () => {
    if (hasSelection()) {
      // Small delay to show selection feedback, then auto-progress
      setTimeout(() => {
        nextStep()
      }, 500)
    }
  }

  const hasSelection = () => {
    console.log("[v0] Checking hasSelection for step:", currentStep, "formData.style:", formData.style)
    switch (currentStep) {
      case 4: // Slide2 - Style Selection
        const hasStyleSelection = formData.style !== null && formData.style !== "" && formData.style !== undefined
        console.log("[v0] Style selection check:", hasStyleSelection)
        return hasStyleSelection
      case 5: // Slide3 - Elegant Styles
        return selectedStyle !== null
      case 6: // Slide4 - Elegant Variant 1
        return formData.styleVariant !== "" && formData.styleVariant !== null && formData.styleVariant !== undefined
      case 7: // Slide5 - Elegant Variant 2
        return formData.styleVariant !== "" && formData.styleVariant !== null && formData.styleVariant !== undefined
      case 8: // Slide6 - Color Selection (2 options)
        return formData.colorChoice !== "" && formData.colorChoice !== null && formData.colorChoice !== undefined
      case 9: // Slide7 - Color Selection (3 options)
        return formData.colorChoice !== "" && formData.colorChoice !== null && formData.colorChoice !== undefined
      case 10: // Slide8 - Color Palette
        return formData.colorPalette !== ""
      // Add more cases as needed for other slides
      default:
        return true // For slides without selections, always allow continue
    }
  }

  const renderStep = () => {
    if (submitStatus === "success") {
      return (
        <div className="text-center py-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {flowState === "dashboard-redirect" ? "Welcome Back!" : "Bedankt!"}
            </h2>
            <p className="text-green-700 mb-4">{submitMessage}</p>
            {flowState !== "dashboard-redirect" && (
              <p className="text-sm text-green-600">
                We nemen binnen 24 uur contact met je op om je ontwerp te bespreken.
              </p>
            )}
          </div>
        </div>
      )
    }

    if (submitStatus === "error") {
      return (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-6">
            <div className="text-red-600 text-4xl mb-4">✗</div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Er ging iets mis</h2>
            <p className="text-red-700 mb-4">{submitMessage}</p>
            <Button onClick={() => setSubmitStatus("idle")} className="bg-black text-white hover:bg-gray-800">
              Probeer opnieuw
            </Button>
          </div>
        </div>
      )
    }

    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} /> // Slide1
      case 1:
        return <EmailStep formData={formData} updateFormData={updateFormData} onNext={handleEmailCheck} /> // Slide11 - Email
      case 2:
        return <NamePhoneStep formData={formData} updateFormData={updateFormData} onNext={nextStep} /> // Slide12 - Name/Phone
      case 3:
        return (
          <OTPStep
            email={otpData ? otpData.email : formData.email}
            onVerified={handleOTPVerified}
            onBack={() => {
              setCurrentStep(1)
              setFlowState("normal")
              setOtpData(null)
            }}
          />
        ) // Slide13 - OTP
      case 4:
        return (
          <StyleSelectionStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={(style) => handleStyleSelection(style)}
            onBack={prevStep}
          />
        ) // Slide2
      case 5:
        return (
          <Slide3
            onNext={nextStep}
            onBack={prevStep}
            selectedStyle={selectedStyle}
            onSelectionChange={handleSlide3SelectionChange}
          />
        ) // Slide3
      case 6:
        return (
          <Slide4
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            onSelectionMade={handleSelectionMade}
          />
        ) // Slide4
      case 7:
        return (
          <Slide5
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            onSelectionMade={handleSelectionMade}
          />
        ) // Slide5
      case 8:
        return (
          <Slide6
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            onSelectionMade={handleSelectionMade}
          />
        ) // Slide6
      case 9:
        return (
          <Slide7
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            onSelectionMade={handleSelectionMade}
          />
        ) // Slide7
      case 10:
        return <Slide8 onNext={nextStep} onBack={prevStep} /> // Slide8
      case 11:
        return <Slide9 onNext={nextStep} onBack={prevStep} /> // Slide9
      case 12:
        return <Slide10 onNext={nextStep} onBack={prevStep} /> // Slide10
      case 13:
        return <Slide11 onNext={nextStep} onBack={prevStep} /> // Slide11
      case 14:
        return <Slide12 onNext={nextStep} onBack={prevStep} /> // Modern 1 Variant
      case 15:
        return <Slide13 onNext={nextStep} onBack={prevStep} /> // Modern 2 Variant
      case 16:
        return <Slide14 onNext={nextStep} onBack={prevStep} /> // Modern 3 Variant
      case 17:
        return <Slide15 onNext={nextStep} onBack={prevStep} /> // Modern 6 Variant
      case 30:
        return (
          <Slide30
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            onSubmit={handleSubmit}
          />
        ) // Ingredients
      case 55:
        return <DashboardLoginStep onNext={handleDashboardLogin} /> // Dashboard (last slide)
      default:
        if (currentStep >= 18 && currentStep <= 54) {
          return <div>Placeholder for Step {currentStep}</div>
        }
        return <WelcomeStep onNext={nextStep} />
    }
  }

  const getProgressPercentage = () => {
    if (flowState === "existing-user") {
      const totalSteps = 7
      const adjustedStep = currentStep > 2 ? currentStep - 1 : currentStep
      return (adjustedStep / totalSteps) * 100
    } else if (flowState === "new-user") {
      const totalSteps = 8
      const adjustedStep = currentStep > 3 ? currentStep - 1 : currentStep
      return (adjustedStep / totalSteps) * 100
    } else {
      return (currentStep / (STEPS.length - 1)) * 100
    }
  }

  const getStepDisplay = () => {
    const percentage = Math.round(getProgressPercentage())
    return `${percentage}%`
  }

  const getCurrentSlideComponent = () => {
    switch (currentStep) {
      case 0:
        return "Slide1.tsx"
      case 1:
        return "EmailStep.tsx"
      case 2:
        return "NamePhoneStep.tsx"
      case 3:
        return "OTPStep.tsx"
      case 4:
        return "StyleSelectionStep.tsx"
      case 5:
        return "Slide3.tsx"
      case 6:
        return "Slide4.tsx"
      case 7:
        return "Slide5.tsx"
      case 8:
        return "Slide6.tsx"
      case 9:
        return "Slide7.tsx"
      case 10:
        return "Slide8.tsx"
      case 11:
        return "Slide9.tsx"
      case 12:
        return "Slide10.tsx"
      case 13:
        return "Slide11.tsx"
      case 14:
        return "Slide12.tsx"
      case 15:
        return "Slide13.tsx"
      case 16:
        return "Slide14.tsx"
      case 17:
        return "Slide15.tsx"
      case 30:
        return "Slide30.tsx"
      case 55:
        return "DashboardLoginStep.tsx"
      default:
        return `Placeholder-${currentStep}`
    }
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="max-w-2xl mx-auto px-6 pb-8">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-black mb-2">SalonID Design</h1>
          <p className="text-gray-600">Your dream, Your brand - We make it happen.</p>
        </div>

        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <div className="text-sm text-yellow-800 mb-2">
            <strong>Debug Info:</strong> Step {currentStep} - {getCurrentSlideComponent()}
          </div>
          <div className="flex flex-wrap gap-2">
            {STEPS.slice(0, 18).map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-2 py-1 text-xs rounded ${
                  currentStep === step.id
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                }`}
              >
                {step.id}
              </button>
            ))}
            <button
              onClick={() => setCurrentStep(30)}
              className={`px-2 py-1 text-xs rounded ${
                currentStep === 30 ? "bg-yellow-600 text-white" : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
              }`}
            >
              30
            </button>
            <button
              onClick={() => setCurrentStep(55)}
              className={`px-2 py-1 text-xs rounded ${
                currentStep === 55 ? "bg-yellow-600 text-white" : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
              }`}
            >
              55
            </button>
          </div>
        </div>

        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={prevStep}
                variant="outline"
                className="bg-black text-white hover:bg-gray-800 border-black h-10 px-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
              <span className="text-sm text-gray-600 font-medium">{getStepDisplay()}</span>
              <Button
                onClick={nextStep}
                variant="outline"
                disabled={!hasSelection()}
                className={`h-10 px-4 border-black ${
                  hasSelection()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
              >
                Doorgaan
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-stone-100">{renderStep()}</div>

        {currentStep > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button
                onClick={prevStep}
                variant="outline"
                className="bg-black text-white hover:bg-gray-800 border-black h-10 px-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
              <Button
                onClick={nextStep}
                variant="outline"
                disabled={!hasSelection()}
                className={`h-10 px-4 border-black ${
                  hasSelection()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
              >
                Doorgaan
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <div className="text-sm text-blue-800 mb-2">
            <strong>Debug Submission:</strong>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Form (Debug)"}
          </Button>
          {submitStatus !== "idle" && (
            <div className={`mt-2 text-sm ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
              {submitMessage}
            </div>
          )}
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            BEGIN YOUR TAILORED JOURNEY – UPLOAD YOUR LOGO OR EMBARK ON CREATING ONE.
          </p>
        </div>
      </div>
    </div>
  )
}
