"use client"

import { WizardProvider, StepRenderer, WizardProgressBar, StepNavigation, useWizard } from '@/lib/form/wizard-context'
import { DebugNavigation } from '@/components/ui/debug-navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuoteDisplay } from '@/components/ui/quote-display'

// Helper function to determine if current step should show sticky navigation
function shouldShowStickyNavigation(currentStepId: string): boolean {
  // Registration steps, welcome page, and dashboard login should NOT show sticky navigation
  const stepsWithoutNavigation = [
    'welcome',
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
      {/* Debug Navigation - Always at the very top in development */}
      <DebugNavigation />
      
      {/* Header with Branding and Progress Bar - Only show for slide steps */}
      {showStickyNav && (
        <div className="fixed left-0 right-0 z-50 bg-white shadow-sm" style={{ top: process.env.NODE_ENV === 'development' ? '52px' : '0px' }}>
          <div className="max-w-4xl mx-auto px-4 py-3">
            {/* Logo and Progress Bar */}
            <div className="flex items-center gap-4">
              {/* Logo on the left */}
              <img 
                src="/salonid.svg" 
                alt="SalonID" 
                className="h-10 w-auto flex-shrink-0"
              />
              
              {/* Progress Bar with percentage */}
              <WizardProgressBar />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content - Adjust padding based on navigation visibility and debug mode */}
      <div className={
        showStickyNav 
          ? (process.env.NODE_ENV === 'development' ? "pt-24 pb-20" : "pt-16 pb-20")
          : (process.env.NODE_ENV === 'development' ? "pt-20 pb-8" : "pt-12 pb-8")
      }>
        <div className="max-w-4xl mx-auto px-4">
          {/* Step Renderer - Dynamically renders the current step */}
          <StepRenderer />
          
          {/* Quotes at bottom of slide content for pages with sticky navigation */}
          {showStickyNav && (
            <div className="mt-16 mb-8">
              <QuoteDisplay />
            </div>
          )}
        </div>
      </div>
      
      {/* Quotes for pages without sticky navigation */}
      {!showStickyNav && (
        <div className="fixed bottom-8 left-0 right-0 z-10 pointer-events-none">
          <QuoteDisplay />
        </div>
      )}
      
      {/* Sticky Footer with Navigation - Only show for slide steps */}
      {showStickyNav && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
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