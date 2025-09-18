import { createMachine, assign, fromPromise } from 'xstate'
import { FormData, getDefaultFormData } from './schema'
import {
  getStep,
  getNextStepId,
  canEnterStep,
  shouldSkipStep,
  validateStepData,
} from './steps'

// ===== Machine Types =====
export interface WizardContext {
  formData: FormData
  currentStepId: string
  previousStepId: string | null
  visitedSteps: string[]
  errors: Record<string, string[]>
  isSubmitting: boolean
  otpEmail: string | null
  otpVerified: boolean
  submissionId: string | null
}

export type WizardEvent =
  | { type: 'UPDATE_FORM_DATA'; data: Partial<FormData> }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'GO_TO_STEP'; stepId: string }
  | { type: 'OTP_SENT'; email: string }
  | { type: 'OTP_VERIFIED' }
  | { type: 'OTP_FAILED'; error: string }
  | { type: 'RESET_OTP' }
  | { type: 'SUBMIT' }
  | { type: 'SUBMISSION_SUCCESS'; submissionId: string }
  | { type: 'SUBMISSION_ERROR'; error: string }
  | { type: 'RESET' }
  | { type: 'VALIDATE_STEP' }

// ===== Initial Context =====
const initialContext: WizardContext = {
  formData: getDefaultFormData(),
  currentStepId: 'email',
  previousStepId: null,
  visitedSteps: ['email'],
  errors: {},
  isSubmitting: false,
  otpEmail: null,
  otpVerified: false,
  submissionId: null,
}

// ===== Machine Actions =====
export const wizardActions = {
  updateFormData: assign({
    formData: ({ context, event }) => {
      if (event.type !== 'UPDATE_FORM_DATA') return context.formData
      return { ...context.formData, ...event.data }
    },
  }),
  
  validateCurrentStep: assign({
    errors: ({ context }) => {
      const step = getStep(context.currentStepId)
      if (!step || !step.schema) {
        return {}
      }
      
      const validation = validateStepData(context.currentStepId, context.formData)
      
      if (!validation.isValid && validation.errors) {
        const errors: Record<string, string[]> = {}
        validation.errors.errors.forEach((err) => {
          const field = err.path.join('.')
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(err.message)
        })
        return errors
      }
      
      return {}
    },
  }),
  
  showValidationErrors: ({ context }: { context: WizardContext }) => {
    console.log('[Wizard] Validation errors:', context.errors)
  },
  
  saveCurrentStep: assign({
    visitedSteps: ({ context }) => {
      if (!context.visitedSteps.includes(context.currentStepId)) {
        return [...context.visitedSteps, context.currentStepId]
      }
      return context.visitedSteps
    },
  }),
  
  moveToNextStep: assign({
    currentStepId: ({ context }) => {
      let nextStepId = getNextStepId(context.currentStepId, context.formData)
      
      // Skip steps that should be skipped
      while (nextStepId && shouldSkipStep(nextStepId, context.formData)) {
        nextStepId = getNextStepId(nextStepId, context.formData)
      }
      
      return nextStepId || context.currentStepId
    },
    previousStepId: ({ context }) => context.currentStepId,
  }),
  
  moveToPreviousStep: assign({
    currentStepId: ({ context }) => {
      const currentIndex = context.visitedSteps.indexOf(context.currentStepId)
      if (currentIndex > 0) {
        let previousIndex = currentIndex - 1
        let previousStepId = context.visitedSteps[previousIndex]
        
        // Skip steps that should be skipped when going back
        while (previousIndex > 0 && shouldSkipStep(previousStepId, context.formData)) {
          previousIndex--
          previousStepId = context.visitedSteps[previousIndex]
        }
        
        return previousStepId
      }
      return context.currentStepId
    },
    previousStepId: ({ context }) => {
      const currentIndex = context.visitedSteps.indexOf(context.currentStepId)
      return currentIndex > 1 ? context.visitedSteps[currentIndex - 2] : null
    },
  }),
  
  jumpToStep: assign({
    currentStepId: ({ context, event }) => {
      if (event.type !== 'GO_TO_STEP') return context.currentStepId
      
      // Check if step exists and can be entered
      if (getStep(event.stepId) && canEnterStep(event.stepId, context.formData)) {
        return event.stepId
      }
      
      return context.currentStepId
    },
    visitedSteps: ({ context, event }) => {
      if (event.type !== 'GO_TO_STEP') return context.visitedSteps
      
      if (!context.visitedSteps.includes(event.stepId)) {
        return [...context.visitedSteps, event.stepId]
      }
      
      return context.visitedSteps
    },
  }),
  
  saveOtpEmail: assign({
    otpEmail: ({ context, event }) => {
      if (event.type !== 'OTP_SENT') return context.otpEmail
      return event.email
    },
  }),
  
  markOtpVerified: assign({
    otpVerified: true,
  }),
  
  resetOtpVerification: assign({
    otpVerified: false,
    otpEmail: null,
  }),
  
  showOtpError: ({ context, event }: { context: WizardContext; event: WizardEvent }) => {
    if (event.type === 'OTP_FAILED') {
      console.error('[Wizard] OTP verification failed:', event.error)
    }
  },
  
  startSubmission: assign({
    isSubmitting: true,
  }),
  
  handleSubmissionSuccess: assign({
    isSubmitting: false,
    submissionId: ({ event }: { event: { output?: { submissionId?: string } } }) => event.output?.submissionId || null,
  }),
  
  handleSubmissionError: assign({
    isSubmitting: false,
    errors: ({ event }: { event: { error?: { message?: string } | string } }) => {
      console.error('[Wizard] Submission error:', event.error)
      const errorMessage = typeof event.error === 'string' 
        ? event.error 
        : event.error?.message || 'Submission failed'
      return {
        submission: [errorMessage],
      }
    },
  }),
  
  onSubmissionComplete: ({ context }: { context: WizardContext }) => {
    console.log('[Wizard] Form submitted successfully:', context.submissionId)
  },
  
  resetWizard: assign(() => initialContext),
}

// ===== Machine Guards =====
export const wizardGuards = {
  canMoveForward: ({ context }: { context: WizardContext }) => {
    // Check OTP verification for OTP step
    if (context.currentStepId === 'otp-verification' && !context.otpVerified) {
      return false
    }
    
    // Validate current step
    const validation = validateStepData(context.currentStepId, context.formData)
    
    if (!validation.isValid) {
      return false
    }
    
    // Check if there's a next step
    const nextStepId = getNextStepId(context.currentStepId, context.formData)
    
    if (!nextStepId) {
      return false
    }
    
    // Check if we can enter the next step
    return canEnterStep(nextStepId, context.formData)
  },
  
  canMoveBackward: ({ context }: { context: WizardContext }) => {
    const currentIndex = context.visitedSteps.indexOf(context.currentStepId)
    return currentIndex > 0
  },
  
  isOtpStep: ({ context }: { context: WizardContext }) => {
    return context.currentStepId === 'otp-verification'
  },
  
  canSubmit: ({ context }: { context: WizardContext }) => {
    // Check if we're on the last step
    const nextStepId = getNextStepId(context.currentStepId, context.formData)
    if (nextStepId) {
      return false
    }
    
    // Define required steps based on user type
    let requiredSteps: string[] = ['email']
    
    if (context.formData.isExistingUser) {
      // Existing users: Email → OTP → Dashboard (minimal validation)
      // No need to validate questionnaire steps for existing users
      // But we do need OTP verification for existing users
      return context.otpVerified
    } else {
      // New users: Email → Name/Phone → Questionnaire (NO OTP required)
      requiredSteps = [
        'email',
        'name-phone',
        'style-selection',
        'ingredients',
      ]
      
      // Validate required steps for new users
      for (const stepId of requiredSteps) {
        const validation = validateStepData(stepId, context.formData)
        if (!validation.isValid) {
          return false
        }
      }
      
      // New users don't need OTP verification
      return true
    }
  },
}

// ===== Machine Actors =====
export const wizardActors = {
  submitFormData: fromPromise(async ({ input }: { input: { formData: FormData } }) => {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input.formData),
    })
    
    if (!response.ok) {
      throw new Error('Submission failed')
    }
    
    const data = await response.json()
    return { submissionId: data.id }
  }),
}

// ===== Machine Definition =====
// Now that actions, guards, and actors are defined, we can create the machine
export const wizardMachine = createMachine({
  id: 'wizard',
  initial: 'navigating',
  context: initialContext,
  types: {
    context: {} as WizardContext,
    events: {} as WizardEvent,
  },
  
  states: {
    navigating: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            UPDATE_FORM_DATA: {
              actions: 'updateFormData',
            },
            RESET_OTP: {
              actions: 'resetOtpVerification',
            },
            VALIDATE_STEP: {
              actions: 'validateCurrentStep',
            },
            NEXT: [
              {
                target: 'movingForward',
                guard: 'canMoveForward',
              },
              {
                target: 'idle',
                actions: 'showValidationErrors',
              },
            ],
            BACK: {
              target: 'movingBackward',
              guard: 'canMoveBackward',
            },
            GO_TO_STEP: {
              target: 'jumping',
            },
            SUBMIT: {
              target: '#wizard.submitting',
              guard: 'canSubmit',
            },
          },
        },
        
        movingForward: {
          entry: ['saveCurrentStep', 'moveToNextStep'],
          always: [
            {
              target: 'checkingOtp',
              guard: 'isOtpStep',
            },
            {
              target: 'idle',
            },
          ],
        },
        
        movingBackward: {
          entry: 'moveToPreviousStep',
          always: 'idle',
        },
        
        jumping: {
          entry: 'jumpToStep',
          always: 'idle',
        },
        
        checkingOtp: {
          on: {
            OTP_SENT: {
              target: 'waitingForOtp',
              actions: 'saveOtpEmail',
            },
            BACK: {
              target: 'movingBackward',
            },
          },
        },
        
        waitingForOtp: {
          on: {
            OTP_VERIFIED: {
              target: 'idle',
              actions: ['markOtpVerified', 'moveToNextStep'],
            },
            OTP_FAILED: {
              target: 'checkingOtp',
              actions: 'showOtpError',
            },
            BACK: {
              target: 'movingBackward',
            },
          },
        },
      },
    },
    
    submitting: {
      entry: 'startSubmission',
      invoke: {
        id: 'submitForm',
        src: 'submitFormData',
        input: ({ context }: { context: WizardContext }) => ({ formData: context.formData }),
        onDone: {
          target: 'submitted',
          actions: 'handleSubmissionSuccess',
        },
        onError: {
          target: 'navigating.idle',
          actions: 'handleSubmissionError',
        },
      },
    },
    
    submitted: {
      type: 'final',
      entry: 'onSubmissionComplete',
    },
  },
  
  on: {
    RESET: {
      target: '.navigating',
      actions: 'resetWizard',
    },
  },
}).provide({
  actions: wizardActions as any, // XState typing compatibility
  guards: wizardGuards,
  actors: wizardActors,
})

// ===== Helper Functions =====

/**
 * Get the progress percentage based on visited steps
 */
export function getProgress(context: WizardContext): number {
  // Get all possible steps in the flow
  const flowPath = getFlowPath(context.formData)
  
  if (!flowPath.length) return 0
  
  // Calculate how many steps have been visited
  const visitedCount = flowPath.filter((stepId) =>
    context.visitedSteps.includes(stepId)
  ).length
  
  return Math.round((visitedCount / flowPath.length) * 100)
}

/**
 * Get the flow path based on current form data
 */
function getFlowPath(formData: Partial<FormData>): string[] {
  const path: string[] = []
  let currentStepId: string | null = 'email'
  
  const maxSteps = 1000 // Allow for 100+ steps as designed, with high safety margin
  let stepCount = 0
  const visitedSteps = new Set<string>() // Cycle detection
  
  while (currentStepId && stepCount < maxSteps) {
    // Cycle detection - if we've seen this step before, break to prevent infinite loops
    if (visitedSteps.has(currentStepId)) {
      console.warn(`[Wizard] Cycle detected at step: ${currentStepId}. Breaking flow path calculation.`)
      break
    }
    
    visitedSteps.add(currentStepId)
    
    if (!shouldSkipStep(currentStepId, formData)) {
      path.push(currentStepId)
    }
    currentStepId = getNextStepId(currentStepId, formData)
    stepCount++
  }
  
  if (stepCount >= maxSteps) {
    console.warn(`[Wizard] Reached maximum step limit (${maxSteps}). Flow path calculation terminated.`)
  }
  
  return path
}

/**
 * Check if a specific step has been completed
 */
export function isStepCompleted(
  stepId: string,
  context: WizardContext
): boolean {
  if (!context.visitedSteps.includes(stepId)) {
    return false
  }
  
  const validation = validateStepData(stepId, context.formData)
  return validation.isValid
}

/**
 * Get all completed steps
 */
export function getCompletedSteps(context: WizardContext): string[] {
  return context.visitedSteps.filter((stepId) =>
    isStepCompleted(stepId, context)
  )
}

/**
 * Get the current step definition
 */
export function getCurrentStep(context: WizardContext) {
  return getStep(context.currentStepId)
}

// Types are already exported above with their definitions