"use client"

import React, { createContext, useContext, ReactNode, Suspense } from 'react'
import { useMachine } from '@xstate/react'
import { wizardMachine, wizardGuards, WizardContext as MachineContext, WizardEvent } from './machine'
import { FormData } from './schema'
import { getStep, getNextStepId, shouldSkipStep, StepProps, getFlowPath } from './steps'
import { getLazyComponent, preloadSteps, getStepsToPreload } from './lazy-step-loader'

// ===== Context Types =====
interface WizardContextValue {
  // State
  currentStepId: string
  formData: FormData
  errors: Record<string, string[]>
  isSubmitting: boolean
  visitedSteps: string[]
  progress: number
  
  // Actions
  updateFormData: (data: Partial<FormData>) => void
  goToNext: () => void
  goToPrevious: () => void
  goToStep: (stepId: string) => void
  debugGoToStep: (stepId: string) => void  // Debug-only bypass for development
  submitForm: () => void
  resetForm: () => void
  validateCurrentStep: () => boolean
  
  // OTP specific
  sendOtp: (email: string) => void
  verifyOtp: () => void
  otpVerified: boolean
  
  // Helper methods
  canGoNext: () => boolean
  canGoPrevious: () => boolean
  isStepCompleted: (stepId: string) => boolean
  getCurrentStepComponent: () => React.ComponentType<StepProps> | null
}

// ===== Create Context =====
const WizardContext = createContext<WizardContextValue | undefined>(undefined)

// ===== Provider Component =====
export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, send, service] = useMachine(wizardMachine)
  
  // Calculate progress
  const progress = React.useMemo(() => {
    const flowPath = getFlowPath(state.context.formData)
    if (!flowPath.length) return 0
    
    const visitedCount = flowPath.filter((stepId) =>
      state.context.visitedSteps.includes(stepId)
    ).length
    
    return Math.round((visitedCount / flowPath.length) * 100)
  }, [state.context.formData, state.context.visitedSteps])
  
  // Get current step component (lazy loaded)
  const getCurrentStepComponent = React.useCallback(() => {
    // Load component via lazy loader exclusively
    const LazyComponent = getLazyComponent(state.context.currentStepId)
    return LazyComponent || null
  }, [state.context.currentStepId])
  
  // Preload next steps when current step changes
  React.useEffect(() => {
    const stepsToPreload = getStepsToPreload(state.context.currentStepId, state.context.formData)
    if (stepsToPreload.length > 0) {
      preloadSteps(stepsToPreload).catch(console.error)
    }
  }, [state.context.currentStepId, state.context.formData])
  
  // Action methods
  const updateFormData = React.useCallback((data: Partial<FormData>) => {
    // Reset OTP verification if email changes
    if (data.email && data.email !== state.context.formData.email && state.context.otpVerified) {
      send({ type: 'RESET_OTP' })
    }
    send({ type: 'UPDATE_FORM_DATA', data })
  }, [send, state.context.formData.email, state.context.otpVerified])
  
  const goToNext = React.useCallback(() => {
    send({ type: 'NEXT' })
  }, [send])
  
  const goToPrevious = React.useCallback(() => {
    send({ type: 'BACK' })
  }, [send])
  
  const goToStep = React.useCallback((stepId: string) => {
    send({ type: 'GO_TO_STEP', stepId })
  }, [send])
  
  // Debug-only method that bypasses all guards and validation
  // Only works in development mode  
  const debugGoToStep = React.useCallback((stepId: string) => {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('[Wizard] debugGoToStep is only available in development mode')
      return
    }
    
    // Check if step exists
    const step = getStep(stepId)
    if (!step) {
      console.warn(`[Wizard] Debug navigation: Step "${stepId}" does not exist`)
      return
    }
    
    console.log(`[Wizard] Debug navigation: Bypassing all checks and jumping to "${stepId}"`)
    
    // Simple approach: just try normal navigation first
    send({ type: 'GO_TO_STEP', stepId })
    
    // If that didn't work (due to guards), force it by updating the context
    setTimeout(() => {
      const currentState = service.getSnapshot()
      if (currentState.context.currentStepId !== stepId) {
        console.log(`[Wizard] Normal navigation blocked, forcing debug navigation to ${stepId}`)
        
        // Force the step change by sending UPDATE_FORM_DATA events
        send({ 
          type: 'UPDATE_FORM_DATA', 
          data: { 
            ...currentState.context.formData,
            __debugCurrentStep: stepId 
          } 
        })
        
        // Update the internal state by patching the machine context directly
        const machine = service.getSnapshot()
        if (machine.context.currentStepId !== stepId) {
          // Last resort: direct property assignment (dev only)
          try {
            Object.assign(machine.context, {
              currentStepId: stepId,
              visitedSteps: machine.context.visitedSteps.includes(stepId) 
                ? machine.context.visitedSteps 
                : [...machine.context.visitedSteps, stepId]
            })
            // Trigger re-render
            send({ type: 'UPDATE_FORM_DATA', data: {} })
          } catch (error) {
            console.error('[Wizard] Debug navigation failed:', error)
          }
        }
      }
    }, 50)
  }, [send, service])
  
  const submitForm = React.useCallback(() => {
    send({ type: 'SUBMIT' })
  }, [send])
  
  const resetForm = React.useCallback(() => {
    send({ type: 'RESET' })
  }, [send])
  
  const validateCurrentStep = React.useCallback(() => {
    send({ type: 'VALIDATE_STEP' })
    return Object.keys(state.context.errors).length === 0
  }, [send, state.context.errors])
  
  const sendOtp = React.useCallback((email: string) => {
    send({ type: 'OTP_SENT', email })
  }, [send])
  
  const verifyOtp = React.useCallback(() => {
    send({ type: 'OTP_VERIFIED' })
  }, [send])
  
  // Guard checks
  const canGoNext = React.useCallback(() => {
    return wizardGuards.canMoveForward({ context: state.context })
  }, [state.context])
  
  const canGoPrevious = React.useCallback(() => {
    return wizardGuards.canMoveBackward({ context: state.context })
  }, [state.context])
  
  const isStepCompleted = React.useCallback((stepId: string) => {
    return state.context.visitedSteps.includes(stepId)
  }, [state.context.visitedSteps])
  
  const value: WizardContextValue = {
    // State
    currentStepId: state.context.currentStepId,
    formData: state.context.formData,
    errors: state.context.errors,
    isSubmitting: state.context.isSubmitting,
    visitedSteps: state.context.visitedSteps,
    progress,
    
    // Actions
    updateFormData,
    goToNext,
    goToPrevious,
    goToStep,
    debugGoToStep,
    submitForm,
    resetForm,
    validateCurrentStep,
    
    // OTP specific
    sendOtp,
    verifyOtp,
    otpVerified: state.context.otpVerified,
    
    // Helper methods
    canGoNext,
    canGoPrevious,
    isStepCompleted,
    getCurrentStepComponent,
  }
  
  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  )
}

// ===== Hook =====
export function useWizard() {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider')
  }
  return context
}

// ===== Step Renderer Component with Clean Lazy Loading =====
export function StepRenderer() {
  const { getCurrentStepComponent, formData, updateFormData, goToNext, goToPrevious, goToStep, currentStepId, verifyOtp, sendOtp } = useWizard()
  
  const Component = getCurrentStepComponent()
  
  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Step Not Found</h2>
          <p className="text-gray-600">The step "{currentStepId}" could not be loaded.</p>
        </div>
      </div>
    )
  }

  // Handle OTP verification - set state machine flag before advancing
  const handleOtpVerified = React.useCallback(() => {
    verifyOtp()
    goToNext()
  }, [verifyOtp, goToNext])
  
  // Clean Suspense wrapper - let lazy loading handle transitions naturally
  return (
    <div className="transition-opacity duration-300 ease-in-out">
      <Suspense fallback={<StepTransitionFallback />}>
        <Component
          formData={formData}
          updateFormData={updateFormData}
          onNext={goToNext}
          onBack={goToPrevious}
          goToStep={goToStep}
          email={formData.email}
          onVerified={handleOtpVerified}
          verifyOtp={verifyOtp}
          sendOtp={sendOtp}
        />
      </Suspense>
    </div>
  )
}

// ===== Smooth Transition Fallback (No Spinner) =====
function StepTransitionFallback() {
  return (
    <div className="animate-pulse">
      {/* Invisible placeholder to maintain layout during transition */}
      <div className="min-h-[400px]" />
    </div>
  )
}

// ===== Progress Bar Component =====
export function WizardProgressBar() {
  const { progress } = useWizard()
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-gray-800 to-black transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ===== Step Navigation Component =====
export function StepNavigation() {
  const { canGoPrevious, canGoNext, goToPrevious, goToNext, currentStepId } = useWizard()
  
  // Get current step metadata to determine button visibility
  const currentStep = getStep(currentStepId)
  const showGlobalNext = currentStep?.showGlobalNext !== false // Default to true (manual continue)
  const showGlobalPrev = currentStep?.showGlobalPrev !== false // Default to true
  
  return (
    <div className="flex justify-between items-center">
      {showGlobalPrev && (
        <button
          onClick={goToPrevious}
          disabled={!canGoPrevious()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Terug
        </button>
      )}
      
      {!showGlobalPrev && <div />} {/* Spacer for consistent layout when prev button is hidden */}
      
      {showGlobalNext && (
        <button
          onClick={goToNext}
          disabled={!canGoNext()}
          className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          Doorgaan
        </button>
      )}
    </div>
  )
}


// ===== Exports =====
export default WizardProvider