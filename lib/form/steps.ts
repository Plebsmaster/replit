// No component imports needed - all components loaded via lazy-step-loader
import { z } from 'zod'
import {
  welcomeSchema,
  emailStepSchema,
  namePhoneSchema,
  otpSchema,
  styleSelectionSchema,
  elegantStyleSchema,
  styleVariantSchema,
  colorSchemeSchema,
  finalColorSchema,
  colorPaletteSchema,
  textColorSchema,
  iconSelectionSchema,
  modernStyleSchema,
  ingredientsSchema,
  agreementsSchema,
  FormData,
} from './schema'

// ===== Types =====
// Shared base interface that all step components must accept
export interface StepProps {
  onNext: () => void
  onBack: () => void
  goToStep: (stepId: string) => void
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onSubmit?: () => Promise<void>
  
  // Optional props for specific steps
  email?: string
  onVerified?: () => void
  verifyOtp?: () => void
  sendOtp?: (email: string) => void
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
}

// Legacy interface for backward compatibility
export interface WizardStepProps extends StepProps {
}

// Legacy interface for backward compatibility
export interface StepComponentProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
  onSubmit?: () => Promise<void>
}

export interface StepDefinition {
  id: string
  key: string
  title: string
  // Remove Component property - will be loaded via lazy-step-loader
  schema?: z.ZodSchema<Partial<FormData>>
  componentFile?: string  // TSX filename for debug navigation
  guards?: {
    canEnter?: (formData: Partial<FormData>) => boolean
    canLeave?: (formData: Partial<FormData>) => boolean
  }
  onEnter?: (formData: Partial<FormData>) => void
  onLeave?: (formData: Partial<FormData>) => void
  skipIf?: (formData: Partial<FormData>) => boolean
  nextStep?: (formData: Partial<FormData>) => string | null
  // Navigation button visibility controls
  showGlobalNext?: boolean  // Show "Doorgaan" button (default: true for manual steps)
  showGlobalPrev?: boolean  // Show "Terug" button (default: true)
}

// ===== Step Components Removed =====
// Components are now loaded exclusively via lazy-step-loader.ts
// This ensures true code-splitting and reduces initial bundle size

// ===== Step Registry =====
export const stepRegistry: Map<string, StepDefinition> = new Map([
  // Welcome Flow
  ['welcome', {
    id: 'welcome',
    key: 'welcome',
    title: 'Welkom',
    schema: welcomeSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'email',
  }],
  
  // Authentication Flow
  ['email', {
    id: 'email',
    key: 'email',
    title: 'E-mail',
    schema: emailStepSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // If existing user, skip name-phone and go directly to OTP
      if (formData.isExistingUser) {
        return 'otp-verification'
      }
      // If new user, proceed to name-phone collection
      return 'name-phone'
    },
  }],
  
  ['name-phone', {
    id: 'name-phone',
    key: 'namePhone',
    title: 'Gegevens',
    schema: namePhoneSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // For new users, skip OTP and go directly to questionnaire
      if (!formData.isExistingUser) {
        return 'style-selection'
      }
      // For existing users, they should have already gone through OTP from email step
      // This shouldn't happen in normal flow, but fallback to style-selection
      return 'style-selection'
    },
  }],
  
  ['otp-verification', {
    id: 'otp-verification',
    key: 'otp',
    title: 'Verificatie',
    schema: otpSchema,
    showGlobalNext: false, // Has own button
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.isExistingUser === true,
    },
    skipIf: (formData: Partial<FormData>) => formData.isExistingUser !== true,
    nextStep: (formData: Partial<FormData>): string => {
      // If existing user, go to dashboard login after OTP verification
      if (formData.isExistingUser) {
        return 'dashboard-login'
      }
      // If new user, proceed to questionnaire (style selection)
      return 'style-selection'
    },
  }],
  
  // Style Selection Flow
  ['style-selection', {
    id: 'style-selection',
    key: 'styleSelection',
    title: 'Stijl Selectie',
    schema: styleSelectionSchema,
    componentFile: 'Slide2.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string | null => {
      if (formData.style === 'elegant') return 'elegant-styles'
      if (formData.style === 'modern') return 'modern-styles'
      return null
    },
  }],
  
  // Elegant Style Flow
  ['elegant-styles', {
    id: 'elegant-styles',
    key: 'elegantStyle',
    title: 'Elegante Stijlen',
    schema: elegantStyleSchema,
    componentFile: 'Slide3.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'elegant',
    },
    nextStep: (formData: Partial<FormData>): string => {
      // Based on selection, go to appropriate variant
      if (formData.elegantStyle === 'elegant1') return 'elegant-variant1'
      if (formData.elegantStyle === 'elegant2') return 'elegant-variant2'
      return 'elegant-variant1' // default
    },
  }],
  
  ['elegant-variant1', {
    id: 'elegant-variant1',
    key: 'styleVariant',
    title: 'Elegante Variant 1',
    Component: ElegantVariant1Step,
    schema: styleVariantSchema,
    componentFile: 'Slide4.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'elegant',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['elegant-variant2', {
    id: 'elegant-variant2',
    key: 'styleVariant',
    title: 'Elegante Variant 2',
    Component: ElegantVariant2Step,
    schema: styleVariantSchema,
    componentFile: 'Slide5.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'elegant',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  // Modern Style Flow
  ['modern-styles', {
    id: 'modern-styles',
    key: 'modernStyle',
    title: 'Moderne Stijlen',
    schema: modernStyleSchema,
    componentFile: 'Slide11.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => {
      // Based on selection, go to appropriate modern variant
      if (formData.modernStyle === 'modern1') return 'modern1-variant'
      if (formData.modernStyle === 'modern2') return 'modern2-variant'
      if (formData.modernStyle === 'modern3') return 'modern3-variant'
      if (formData.modernStyle === 'modern6') return 'modern6-variant'
      return 'modern1-variant' // default
    },
  }],
  
  ['modern1-variant', {
    id: 'modern1-variant',
    key: 'styleVariant',
    title: 'Modern 1 Variant',
    Component: Modern1VariantStep,
    schema: styleVariantSchema,
    componentFile: 'Slide12.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['modern2-variant', {
    id: 'modern2-variant',
    key: 'styleVariant',
    title: 'Modern 2 Variant',
    Component: Modern2VariantStep,
    schema: styleVariantSchema,
    componentFile: 'Slide13.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['modern3-variant', {
    id: 'modern3-variant',
    key: 'styleVariant',
    title: 'Modern 3 Variant',
    Component: Modern3VariantStep,
    schema: styleVariantSchema,
    componentFile: 'Slide14.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['modern6-variant', {
    id: 'modern6-variant',
    key: 'styleVariant',
    title: 'Modern 6 Variant',
    Component: Modern6VariantStep,
    schema: styleVariantSchema,
    componentFile: 'Slide15.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  // Color Configuration Flow
  ['color-scheme', {
    id: 'color-scheme',
    key: 'colorScheme',
    title: 'Kleur Selectie',
    schema: colorSchemeSchema,
    componentFile: 'Slide6.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'final-color',
  }],
  
  ['final-color', {
    id: 'final-color',
    key: 'finalColor',
    title: 'Finale Kleur',
    schema: finalColorSchema,
    componentFile: 'Slide7.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'color-palette',
  }],
  
  ['color-palette', {
    id: 'color-palette',
    key: 'colorPalette',
    title: 'Kleur Palet',
    schema: colorPaletteSchema,
    componentFile: 'Slide8.tsx',
    showGlobalNext: true,  // Manual continue - SPECIAL CASE: Slide8 requires manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'icon-choice',
  }],
  
  // Icon Flow
  ['icon-choice', {
    id: 'icon-choice',
    key: 'iconChoice',
    title: 'Icoon Keuze',
    componentFile: 'Slide9.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'icon-selection',
  }],
  
  ['icon-selection', {
    id: 'icon-selection',
    key: 'iconSelection',
    title: 'Icoon Selectie',
    schema: iconSelectionSchema,
    componentFile: 'Slide10.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'ingredients',
  }],
  
  // Final Steps
  ['ingredients', {
    id: 'ingredients',
    key: 'ingredients',
    title: 'Ingrediënten',
    schema: ingredientsSchema,
    componentFile: 'Slide30.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (): string => 'dashboard-login',
  }],
  
  ['dashboard-login', {
    id: 'dashboard-login',
    key: 'dashboardLogin',
    title: 'Dashboard',
    schema: agreementsSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): null => null, // End of flow
  }],
])

// ===== Helper Functions =====

/**
 * Get step definition by ID
 */
export function getStep(stepId: string): StepDefinition | undefined {
  return stepRegistry.get(stepId)
}

/**
 * Get all steps in order
 */
export function getAllSteps(): StepDefinition[] {
  return Array.from(stepRegistry.values())
}

/**
 * Get the next step ID based on current step and form data
 */
export function getNextStepId(
  currentStepId: string,
  formData: Partial<FormData>
): string | null {
  const currentStep = getStep(currentStepId)
  if (!currentStep) return null
  
  if (typeof currentStep.nextStep === 'function') {
    return currentStep.nextStep(formData)
  }
  
  return null
}

/**
 * Get the previous step ID in the flow
 */
export function getPreviousStepId(
  currentStepId: string,
  visitedSteps: string[]
): string | null {
  const currentIndex = visitedSteps.indexOf(currentStepId)
  if (currentIndex <= 0) return null
  
  return visitedSteps[currentIndex - 1]
}

/**
 * Check if a step can be entered based on guards
 */
export function canEnterStep(
  stepId: string,
  formData: Partial<FormData>
): boolean {
  const step = getStep(stepId)
  if (!step) return false
  
  if (step.guards?.canEnter) {
    return step.guards.canEnter(formData)
  }
  
  return true
}

/**
 * Check if a step should be skipped
 */
export function shouldSkipStep(
  stepId: string,
  formData: Partial<FormData>
): boolean {
  const step = getStep(stepId)
  if (!step) return false
  
  if (step.skipIf) {
    return step.skipIf(formData)
  }
  
  return false
}

/**
 * Validate step data
 */
export function validateStepData(
  stepId: string,
  formData: Partial<FormData>
): { isValid: boolean; errors?: z.ZodError } {
  const step = getStep(stepId)
  if (!step || !step.schema) {
    return { isValid: true }
  }
  
  // Pass the entire formData to the schema - each schema knows which fields to validate
  const result = step.schema.safeParse(formData)
  
  if (!result.success) {
    return { isValid: false, errors: result.error }
  }
  
  return { isValid: true }
}

/**
 * Get linear flow path based on form data
 */
export function getFlowPath(formData: Partial<FormData>): string[] {
  const path: string[] = []
  let currentStepId: string | null = 'email'
  const visited = new Set<string>()
  const maxSteps = 1000 // Support up to 1000 steps
  let stepCount = 0
  
  while (currentStepId && stepCount < maxSteps) {
    // Break on cycles - if we've seen this step before, stop
    if (visited.has(currentStepId)) {
      break
    }
    
    visited.add(currentStepId)
    
    if (!shouldSkipStep(currentStepId, formData)) {
      path.push(currentStepId)
    }
    
    currentStepId = getNextStepId(currentStepId, formData)
    stepCount++
  }
  
  return path
}

/**
 * Add a new step to the registry
 * This makes adding new steps trivial - just call this function
 */
export function registerStep(step: StepDefinition): void {
  stepRegistry.set(step.id, step)
}

/**
 * Remove a step from the registry
 */
export function unregisterStep(stepId: string): void {
  stepRegistry.delete(stepId)
}

// Types are already exported above with their definitions