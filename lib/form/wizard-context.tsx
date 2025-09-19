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
    
    // Use the proper DEBUG_GOTO_STEP event that bypasses guards
    send({ type: 'DEBUG_GOTO_STEP', stepId })
  }, [send])
  
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

// ===== Step Renderer Component with Premium Fade Transitions =====
export function StepRenderer() {
  const { formData, updateFormData, goToNext, goToPrevious, goToStep, currentStepId, verifyOtp, sendOtp } = useWizard()
  
  // Track transition state
  const [displayedStepId, setDisplayedStepId] = React.useState(currentStepId)
  const [fadeState, setFadeState] = React.useState<'visible' | 'fading-out' | 'fading-in'>('visible')
  const transitionTimerRef = React.useRef<NodeJS.Timeout>()
  
  // Detect step changes and trigger animation
  React.useEffect(() => {
    if (displayedStepId !== currentStepId) {
      // Clear any existing timer
      clearTimeout(transitionTimerRef.current)
      
      // Start fade out
      setFadeState('fading-out')
      
      // After fade out completes, switch step and fade in
      transitionTimerRef.current = setTimeout(() => {
        setDisplayedStepId(currentStepId)
        setFadeState('fading-in')
        
        // Complete fade in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setFadeState('visible')
          })
        })
      }, 700) // Match transition duration
      
      return () => clearTimeout(transitionTimerRef.current)
    }
  }, [currentStepId, displayedStepId])
  
  // Load component based on displayed step
  const Component = getLazyComponent(displayedStepId)
  
  // Handle OTP verification
  const handleOtpVerified = React.useCallback(() => {
    verifyOtp()
    goToNext()
  }, [verifyOtp, goToNext])
  
  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Step Not Found</h2>
          <p className="text-gray-600">The step "{displayedStepId}" could not be loaded.</p>
        </div>
      </div>
    )
  }
  
  // Determine animation classes based on fade state
  const animationClasses = React.useMemo(() => {
    switch (fadeState) {
      case 'fading-out':
        return 'opacity-0 scale-98 blur-sm'
      case 'fading-in':
        return 'opacity-0 scale-102 blur-sm'
      case 'visible':
      default:
        return 'opacity-100 scale-100 blur-0'
    }
  }, [fadeState])
  
  // Single layer with proper fade transitions
  return (
    <div className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${animationClasses} ${
      fadeState !== 'visible' ? 'pointer-events-none' : ''
    }`}>
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
    <div className="flex items-center gap-4">
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gray-800 to-black transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 min-w-[45px]">
        {Math.round(progress)}%
      </span>
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
      {showGlobalPrev ? (
        <button
          onClick={goToPrevious}
          disabled={!canGoPrevious()}
          className="px-8 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors min-w-[100px]"
        >
          Terug
        </button>
      ) : (
        <div className="min-w-[100px]" /> // Consistent spacer width
      )}
      
      {showGlobalNext && (
        <button
          onClick={goToNext}
          disabled={!canGoNext()}
          className="px-8 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          Doorgaan
        </button>
      )}
    </div>
  )
}


// ===== Exports =====
export default WizardProvider