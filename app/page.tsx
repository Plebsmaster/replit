"use client"

import { useState } from "react"
import { FormProvider } from "@/components/form/FormProvider"
import { FormNavigation } from "@/components/form/FormNavigation"
import { StepRenderer } from "@/components/form/StepRenderer"
import { useFormValidation } from "@/hooks/useFormValidation"
import { useFormSubmission } from "@/hooks/useFormSubmission"

const STEPS = [
  { id: 0, title: "Welkom", component: "slide1" },
  { id: 1, title: "E-mail", component: "email" },
  { id: 2, title: "Gegevens", component: "name-phone" },
  { id: 3, title: "Verificatie", component: "otp" },
  { id: 4, title: "Stijl Selectie", component: "slide2" },
  // ... other steps
]

function SalonFormContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [flowState, setFlowState] = useState<"normal" | "existing-user" | "new-user">("normal")
  const [otpData, setOtpData] = useState<{ email: string } | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  const { hasSelection } = useFormValidation(currentStep)
  const { isSubmitting, submitStatus, submitMessage, handleSubmit, resetSubmission } = useFormSubmission()

  const nextStep = () => {
    const nextStepNumber = currentStep + 1
    if (nextStepNumber <= STEPS.length - 1) {
      setCurrentStep(nextStepNumber)
    }
  }

  const prevStep = () => {
    const prevStepNumber = currentStep - 1
    if (prevStepNumber >= 0) {
      setCurrentStep(prevStepNumber)
    }
  }

  const handleEmailCheck = async (email: string) => {
    console.log("[v0] Starting email check for:", email)
    try {
      const response = await fetch("/api/otp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.sent === true) {
        setOtpData({ email })
        setFlowState("existing-user")
        setCurrentStep(3)
      } else if (data.sent === false) {
        setFlowState("new-user")
        setCurrentStep(2)
      }
    } catch (error) {
      console.error("[v0] Email check error:", error)
      setFlowState("new-user")
      setCurrentStep(2)
    }
  }

  const handleOTPVerified = async () => {
    console.log("[v0] OTP verified, redirecting to dashboard")
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 100)
  }

  const handleStyleSelection = (style: string) => {
    console.log("[v0] Style selected:", style)
    setTimeout(() => {
      nextStep()
    }, 500)
  }

  const handleSelectionMade = () => {
    if (hasSelection) {
      setTimeout(() => {
        nextStep()
      }, 500)
    }
  }

  const handleDashboardLogin = () => {
    setCurrentStep(1)
    setFlowState("normal")
    setOtpData(null)
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="max-w-2xl mx-auto px-6 pb-8">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-black mb-2">SalonID Design</h1>
          <p className="text-gray-600">Your dream, Your brand - We make it happen.</p>
        </div>

        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={nextStep}
          onPrev={prevStep}
          canGoNext={hasSelection}
          canGoPrev={currentStep > 0}
          isSubmitting={isSubmitting}
        />

        <div className="bg-stone-100">
          <StepRenderer
            currentStep={currentStep}
            onNext={nextStep}
            onPrev={prevStep}
            onEmailCheck={handleEmailCheck}
            onOTPVerified={handleOTPVerified}
            onStyleSelection={handleStyleSelection}
            onSelectionMade={handleSelectionMade}
            onSubmit={handleSubmit}
            onDashboardLogin={handleDashboardLogin}
            selectedStyle={selectedStyle}
            onSelectionChange={setSelectedStyle}
            otpData={otpData}
            flowState={flowState}
            setFlowState={setFlowState}
            setOtpData={setOtpData}
          />
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

export default function SalonForm() {
  return (
    <FormProvider>
      <SalonFormContent />
    </FormProvider>
  )
}