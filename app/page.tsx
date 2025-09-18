"use client"

import { WizardProvider, StepRenderer, WizardProgressBar, StepNavigation, useWizard } from '@/lib/form/wizard-context'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Helper function to determine if current step should show sticky navigation
function shouldShowStickyNavigation(currentStepId: string): boolean {
  // Registration steps and dashboard login should NOT show sticky navigation
  const stepsWithoutNavigation = [
    'email',
    'name-phone', 
    'otp-verification',
    'dashboard-login'
  ]
  
  return !stepsWithoutNavigation.includes(currentStepId)
}

// Thin wrapper component that provides navigation UI
function WizardNavigation() {
  const { currentStepId } = useWizard()
  const showStickyNav = shouldShowStickyNavigation(currentStepId)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Branding and Progress Bar - Only show for slide steps */}
      {showStickyNav && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4">
            {/* SalonID Design Branding */}
            <div className="py-4 text-center border-b border-gray-100">
              <h1 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                SalonID Design - Your dream, Your brand - We make it happen.
              </h1>
            </div>
            
            {/* Progress Bar */}
            <div className="py-3">
              <WizardProgressBar />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content - Adjust padding based on navigation visibility */}
      <div className={showStickyNav ? "pt-28 pb-24" : "py-4"}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Step Renderer - Dynamically renders the current step */}
          <StepRenderer />
        </div>
      </div>
      
      {/* Sticky Footer with Navigation - Only show for slide steps */}
      {showStickyNav && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <StepNavigation />
          </div>
        </div>
      )}
    </div>
  )
}

// Main page component - Just wraps everything in the WizardProvider
export default function SalonForm() {
  return (
    <WizardProvider>
      <WizardNavigation />
    </WizardProvider>
  )
}

// That's it! The entire page is now:
// 1. Clean and minimal (< 40 lines)
// 2. All logic is in the state machine
// 3. Steps are dynamically loaded from the registry
// 4. Adding new steps is trivial - just add to registry
// 5. TypeScript safe with proper types
// 6. Follows Next.js App Router best practices