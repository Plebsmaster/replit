"use client"

import { lazy, Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Lazy load step components for better performance
const WelcomeStep = lazy(() => import("@/components/steps/Slide1").then(m => ({ default: m.WelcomeStep })))
const EmailStep = lazy(() => import("@/components/steps/EmailStep").then(m => ({ default: m.EmailStep })))
const NamePhoneStep = lazy(() => import("@/components/steps/NamePhoneStep").then(m => ({ default: m.NamePhoneStep })))
const OTPStep = lazy(() => import("@/components/steps/OTPStep").then(m => ({ default: m.OTPStep })))
const StyleSelectionStep = lazy(() => import("@/components/steps/Slide2"))
const Slide3 = lazy(() => import("@/components/steps/Slide3"))
const Slide4 = lazy(() => import("@/components/steps/Slide4"))
const Slide5 = lazy(() => import("@/components/steps/Slide5"))
const Slide6 = lazy(() => import("@/components/steps/Slide6"))
const Slide7 = lazy(() => import("@/components/steps/Slide7"))
const Slide8 = lazy(() => import("@/components/steps/Slide8"))
const Slide30 = lazy(() => import("@/components/steps/Slide30"))
const DashboardLoginStep = lazy(() => import("@/components/steps/DashboardLoginStep").then(m => ({ default: m.DashboardLoginStep })))

interface LazyStepRendererProps {
  currentStep: number
  // ... other props
}

function StepLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <LoadingSpinner size="lg" />
      <span className="ml-3 text-gray-600">Loading step...</span>
    </div>
  )
}

export function LazyStepRenderer({ currentStep, ...props }: LazyStepRendererProps) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep {...props} />
      case 1:
        return <EmailStep {...props} />
      case 2:
        return <NamePhoneStep {...props} />
      case 3:
        return <OTPStep {...props} />
      case 4:
        return <StyleSelectionStep {...props} />
      case 5:
        return <Slide3 {...props} />
      case 6:
        return <Slide4 {...props} />
      case 7:
        return <Slide5 {...props} />
      case 8:
        return <Slide6 {...props} />
      case 9:
        return <Slide7 {...props} />
      case 10:
        return <Slide8 {...props} />
      case 30:
        return <Slide30 {...props} />
      case 55:
        return <DashboardLoginStep {...props} />
      default:
        return <div>Step not found</div>
    }
  }

  return (
    <Suspense fallback={<StepLoadingFallback />}>
      {renderStep()}
    </Suspense>
  )
}