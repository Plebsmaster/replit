import { lazy, ComponentType, LazyExoticComponent } from 'react'
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
  Component: ComponentType<StepProps>
  schema?: z.ZodSchema<Partial<FormData>>
  guards?: {
    canEnter?: (formData: Partial<FormData>) => boolean
    canLeave?: (formData: Partial<FormData>) => boolean
  }
  onEnter?: (formData: Partial<FormData>) => void
  onLeave?: (formData: Partial<FormData>) => void
  skipIf?: (formData: Partial<FormData>) => boolean
  nextStep?: (formData: Partial<FormData>) => string | null
}

// ===== Step Components with Dynamic Imports =====
// Using lazy loading for code splitting
const WelcomeStep = lazy(() => 
  import('@/components/steps/Slide1').then(m => ({ default: m.WelcomeStep }))
)
const EmailStep = lazy(() => 
  import('@/components/steps/EmailStep').then(m => ({ default: m.EmailStep }))
)
const NamePhoneStep = lazy(() => 
  import('@/components/steps/NamePhoneStep').then(m => ({ default: m.NamePhoneStep }))
)
const OTPStep = lazy(() => 
  import('@/components/steps/OTPStep').then(m => ({ default: m.OTPStep }))
)
const StyleSelectionStep = lazy(() => 
  import('@/components/steps/Slide2')
)
const ElegantStyleStep = lazy(() => 
  import('@/components/steps/Slide3')
)
const ElegantVariant1Step = lazy(() => 
  import('@/components/steps/Slide4')
)
const ElegantVariant2Step = lazy(() => 
  import('@/components/steps/Slide5')
)
const ColorSchemeStep = lazy(() => 
  import('@/components/steps/Slide6')
)
const FinalColorStep = lazy(() => 
  import('@/components/steps/Slide7')
)
const ColorPaletteStep = lazy(() => 
  import('@/components/steps/Slide8')
)
const IconChoiceStep = lazy(() => 
  import('@/components/steps/Slide9')
)
const IconSelectionStep = lazy(() => 
  import('@/components/steps/Slide10')
)
const ModernStyleStep = lazy(() => 
  import('@/components/steps/Slide11')
)
const Modern1VariantStep = lazy(() => 
  import('@/components/steps/Slide12')
)
const Modern2VariantStep = lazy(() => 
  import('@/components/steps/Slide13')
)
const Modern3VariantStep = lazy(() => 
  import('@/components/steps/Slide14')
)
const Modern6VariantStep = lazy(() => 
  import('@/components/steps/Slide15')
)
const IngredientsStep = lazy(() => 
  import('@/components/steps/Slide30')
)
const DashboardLoginStep = lazy(() => 
  import('@/components/steps/DashboardLoginStep').then(m => ({ default: m.DashboardLoginStep }))
)

// ===== Step Registry =====
export const stepRegistry: Map<string, StepDefinition> = new Map([
  // Welcome Flow
  ['welcome', {
    id: 'welcome',
    key: 'welcome',
    title: 'Welkom',
    Component: WelcomeStep,
    schema: welcomeSchema,
    nextStep: (formData: Partial<FormData>): string => 'email',
  }],
  
  // Authentication Flow
  ['email', {
    id: 'email',
    key: 'email',
    title: 'E-mail',
    Component: EmailStep,
    schema: emailStepSchema,
    nextStep: (formData: Partial<FormData>): string => 'name-phone',
  }],
  
  ['name-phone', {
    id: 'name-phone',
    key: 'namePhone',
    title: 'Gegevens',
    Component: NamePhoneStep,
    schema: namePhoneSchema,
    nextStep: (formData: Partial<FormData>): string => 'otp-verification',
  }],
  
  ['otp-verification', {
    id: 'otp-verification',
    key: 'otp',
    title: 'Verificatie',
    Component: OTPStep,
    schema: otpSchema,
    nextStep: (formData: Partial<FormData>): string => 'style-selection',
  }],
  
  // Style Selection Flow
  ['style-selection', {
    id: 'style-selection',
    key: 'styleSelection',
    title: 'Stijl Selectie',
    Component: StyleSelectionStep,
    schema: styleSelectionSchema,
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
    Component: ElegantStyleStep,
    schema: elegantStyleSchema,
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
    Component: ModernStyleStep,
    schema: modernStyleSchema,
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
    Component: ColorSchemeStep,
    schema: colorSchemeSchema,
    nextStep: (formData: Partial<FormData>): string => 'final-color',
  }],
  
  ['final-color', {
    id: 'final-color',
    key: 'finalColor',
    title: 'Finale Kleur',
    Component: FinalColorStep,
    schema: finalColorSchema,
    nextStep: (formData: Partial<FormData>): string => 'color-palette',
  }],
  
  ['color-palette', {
    id: 'color-palette',
    key: 'colorPalette',
    title: 'Kleur Palet',
    Component: ColorPaletteStep,
    schema: colorPaletteSchema,
    nextStep: (formData: Partial<FormData>): string => 'icon-choice',
  }],
  
  // Icon Flow
  ['icon-choice', {
    id: 'icon-choice',
    key: 'iconChoice',
    title: 'Icoon Keuze',
    Component: IconChoiceStep,
    nextStep: (formData: Partial<FormData>): string => 'icon-selection',
  }],
  
  ['icon-selection', {
    id: 'icon-selection',
    key: 'iconSelection',
    title: 'Icoon Selectie',
    Component: IconSelectionStep,
    schema: iconSelectionSchema,
    nextStep: (formData: Partial<FormData>): string => 'ingredients',
  }],
  
  // Final Steps
  ['ingredients', {
    id: 'ingredients',
    key: 'ingredients',
    title: 'Ingrediënten',
    Component: IngredientsStep,
    schema: ingredientsSchema,
    nextStep: (): string => 'dashboard-login',
  }],
  
  ['dashboard-login', {
    id: 'dashboard-login',
    key: 'dashboardLogin',
    title: 'Dashboard',
    Component: DashboardLoginStep,
    schema: agreementsSchema,
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
  let currentStepId: string | null = 'welcome'
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