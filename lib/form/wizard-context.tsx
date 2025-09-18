"use client"

import React, { createContext, useContext, ReactNode, Suspense } from 'react'
import { useMachine } from '@xstate/react'
import { wizardMachine, wizardGuards, WizardContext as MachineContext, WizardEvent } from './machine'
import { FormData } from './schema'
import { getStep, getNextStepId, shouldSkipStep, StepProps, getFlowPath } from './steps'

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
  
  // Get current step component
  const getCurrentStepComponent = React.useCallback(() => {
    const step = getStep(state.context.currentStepId)
    return step?.Component || null
  }, [state.context.currentStepId])
  
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

// ===== Step Renderer Component =====
export function StepRenderer() {
  const { getCurrentStepComponent, formData, updateFormData, goToNext, goToPrevious, currentStepId, verifyOtp, sendOtp } = useWizard()
  
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
  
  // Wrap in Suspense for lazy-loaded components
  return (
    <Suspense fallback={<StepLoadingFallback />}>
      <Component
        formData={formData}
        updateFormData={updateFormData}
        onNext={goToNext}
        onBack={goToPrevious}
        email={formData.email}
        onVerified={handleOtpVerified}
        verifyOtp={verifyOtp}
        sendOtp={sendOtp}
      />
    </Suspense>
  )
}

// ===== Loading Fallback =====
function StepLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading step...</p>
      </div>
    </div>
  )
}

// ===== Progress Bar Component =====
export function WizardProgressBar() {
  const { progress } = useWizard()
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ===== Step Navigation Component =====
export function StepNavigation() {
  const { canGoPrevious, canGoNext, goToPrevious, goToNext } = useWizard()
  
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={goToPrevious}
        disabled={!canGoPrevious()}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
      >
        Terug
      </button>
      
      <button
        onClick={goToNext}
        disabled={!canGoNext()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        Doorgaan
      </button>
    </div>
  )
}


// ===== Exports =====
export default WizardProvider