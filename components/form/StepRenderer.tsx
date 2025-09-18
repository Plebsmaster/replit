"use client"

import { WelcomeStep } from "@/components/steps/Slide1"
import { EmailStep } from "@/components/steps/EmailStep"
import { NamePhoneStep } from "@/components/steps/NamePhoneStep"
import { OTPStep } from "@/components/steps/OTPStep"
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
import Slide30 from "@/components/steps/Slide30"
import { DashboardLoginStep } from "@/components/steps/DashboardLoginStep"
import { useFormData } from "@/components/form/FormProvider"

interface StepRendererProps {
  currentStep: number
  onNext: () => void
  onPrev: () => void
  onEmailCheck: (email: string) => void
  onOTPVerified: () => void
  onStyleSelection: (style: string) => void
  onSelectionMade: () => void
  onSubmit: () => void
  onDashboardLogin: () => void
  selectedStyle: string | null
  onSelectionChange: (style: string | null) => void
  otpData: { email: string } | null
  flowState: "normal" | "existing-user" | "new-user"
  setFlowState: (state: "normal" | "existing-user" | "new-user") => void
  setOtpData: (data: { email: string } | null) => void
}

export function StepRenderer({
  currentStep,
  onNext,
  onPrev,
  onEmailCheck,
  onOTPVerified,
  onStyleSelection,
  onSelectionMade,
  onSubmit,
  onDashboardLogin,
  selectedStyle,
  onSelectionChange,
  otpData,
  flowState,
  setFlowState,
  setOtpData
}: StepRendererProps) {
  const { formData, updateFormData } = useFormData()

  switch (currentStep) {
    case 0:
      return <WelcomeStep onNext={onNext} />
    
    case 1:
      return (
        <EmailStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={onEmailCheck} 
        />
      )
    
    case 2:
      return (
        <NamePhoneStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={onNext} 
        />
      )
    
    case 3:
      return (
        <OTPStep
          email={otpData ? otpData.email : formData.email}
          onVerified={onOTPVerified}
          onBack={() => {
            onPrev()
            setFlowState("normal")
            setOtpData(null)
          }}
        />
      )
    
    case 4:
      return (
        <StyleSelectionStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={onStyleSelection}
          onBack={onPrev}
        />
      )
    
    case 5:
      return (
        <Slide3
          onNext={onNext}
          onBack={onPrev}
          selectedStyle={selectedStyle}
          onSelectionChange={onSelectionChange}
        />
      )
    
    case 6:
      return (
        <Slide4
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onPrev}
          onSelectionMade={onSelectionMade}
        />
      )
    
    case 7:
      return (
        <Slide5
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onPrev}
          onSelectionMade={onSelectionMade}
        />
      )
    
    case 8:
      return (
        <Slide6
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onPrev}
          onSelectionMade={onSelectionMade}
        />
      )
    
    case 9:
      return (
        <Slide7
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onPrev}
          onSelectionMade={onSelectionMade}
        />
      )
    
    case 10:
      return <Slide8 onNext={onNext} onBack={onPrev} />
    
    case 11:
      return <Slide9 onNext={onNext} onBack={onPrev} />
    
    case 12:
      return <Slide10 onNext={onNext} onBack={onPrev} />
    
    case 13:
      return <Slide11 onNext={onNext} onBack={onPrev} />
    
    case 14:
      return <Slide12 onNext={onNext} onBack={onPrev} />
    
    case 15:
      return <Slide13 onNext={onNext} onBack={onPrev} />
    
    case 16:
      return <Slide14 onNext={onNext} onBack={onPrev} />
    
    case 17:
      return <Slide15 onNext={onNext} onBack={onPrev} />
    
    case 30:
      return (
        <Slide30
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onPrev}
          onSubmit={onSubmit}
        />
      )
    
    case 55:
      return <DashboardLoginStep onNext={onDashboardLogin} />
    
    default:
      if (currentStep >= 18 && currentStep <= 54) {
        return <div>Placeholder for Step {currentStep}</div>
      }
      return <WelcomeStep onNext={onNext} />
  }
}