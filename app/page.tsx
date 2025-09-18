"use client"

import { WizardProvider, StepRenderer, WizardProgressBar } from '@/lib/form/wizard-context'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Thin wrapper component that provides navigation UI
function WizardNavigation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Branding and Progress Bar */}
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
      
      {/* Main Content */}
      <div className="pt-28 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Step Renderer - Dynamically renders the current step */}
          <StepRenderer />
        </div>
      </div>
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