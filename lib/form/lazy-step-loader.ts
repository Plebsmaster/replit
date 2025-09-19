import { lazy, ComponentType } from 'react'
import { StepProps } from './steps'

// Type for lazy-loaded components that handles both default and named exports
type LazyStepImport = { default?: ComponentType<StepProps>, [key: string]: any }
type LazyStepComponent = () => Promise<LazyStepImport>

// Helper to extract component from either default or named export
function extractComponent(module: LazyStepImport, stepId: string): ComponentType<StepProps> {
  // Try default export first
  if (module.default && typeof module.default === 'function') {
    return module.default
  }
  
  // Special handling for known named exports
  const namedExportMap: Record<string, string> = {
    'welcome': 'WelcomeStep',
    'email': 'EmailStep',
    'name-phone': 'NamePhoneStep',
    'client-details': 'ClientDetailsStep',
    'otp': 'OTPStep',
    'contact': 'ContactStep',
    'dashboard-login': 'DashboardLoginStep',
  }
  
  const expectedName = namedExportMap[stepId]
  if (expectedName && module[expectedName] && typeof module[expectedName] === 'function') {
    return module[expectedName] as ComponentType<StepProps>
  }
  
  // Try to find any named export that looks like a component
  const componentNames = Object.keys(module).filter(key => 
    typeof module[key] === 'function' && 
    key[0] === key[0].toUpperCase() && // Component names start with uppercase
    key !== 'default'
  )
  
  if (componentNames.length > 0) {
    console.warn(`[LazyLoader] Using named export '${componentNames[0]}' for step '${stepId}'`)
    return module[componentNames[0]] as ComponentType<StepProps>
  }
  
  console.error('[LazyLoader] Module structure for', stepId, ':', module)
  throw new Error(`No valid component export found for step: ${stepId}`)
}

// Map of step IDs to their lazy-loaded components
// This enables code-splitting - each component gets its own bundle
const stepComponents: Record<string, LazyStepComponent> = {
  // Onboarding Steps
  'email': () => import('@/components/steps/EmailStep'),
  'welcome': () => import('@/components/steps/Slide1'),
  'name-phone': () => import('@/components/steps/NamePhoneStep'),
  'client-details': () => import('@/components/steps/ClientDetailsStep'),
  'otp': () => import('@/components/steps/OTPStep'),
  'contact': () => import('@/components/steps/ContactStep'),
  
  // Style Selection Steps
  'slide2': () => import('@/components/steps/Slide2'),
  
  // Questionnaire Steps
  'slide3': () => import('@/components/steps/Slide3'),
  'slide4': () => import('@/components/steps/Slide4'),
  'slide5': () => import('@/components/steps/Slide5'),
  'slide6': () => import('@/components/steps/Slide6'),
  'slide7': () => import('@/components/steps/Slide7'),
  'slide8': () => import('@/components/steps/Slide8'),
  'slide9': () => import('@/components/steps/Slide9'),
  'slide10': () => import('@/components/steps/Slide10'),
  'slide11': () => import('@/components/steps/Slide11'),
  'slide12': () => import('@/components/steps/Slide12'),
  'slide13': () => import('@/components/steps/Slide13'),
  'slide14': () => import('@/components/steps/Slide14'),
  'slide15': () => import('@/components/steps/Slide15'),
  'slide30': () => import('@/components/steps/Slide30'),
  
  // Dashboard Steps
  'dashboard-login': () => import('@/components/steps/DashboardLoginStep'),
}

// Cache for lazy-loaded components to avoid re-creating them
const lazyComponentCache = new Map<string, ReturnType<typeof lazy>>()

/**
 * Get a lazy-loaded component for a given step ID
 * Components are cached after first creation to avoid re-creating lazy wrappers
 */
export function getLazyComponent(stepId: string) {
  if (!stepComponents[stepId]) {
    console.warn(`[LazyLoader] No lazy component found for step: ${stepId}`)
    return null
  }
  
  // Check cache first
  if (!lazyComponentCache.has(stepId)) {
    // Create lazy component with proper extraction logic
    const LazyComponent = lazy(async () => {
      try {
        const module = await stepComponents[stepId]()
        const Component = extractComponent(module, stepId)
        return { default: Component }
      } catch (error) {
        console.error(`[LazyLoader] Failed to load component for ${stepId}:`, error)
        throw error
      }
    })
    lazyComponentCache.set(stepId, LazyComponent)
  }
  
  return lazyComponentCache.get(stepId)!
}

/**
 * Preload a step component to avoid loading delays
 * This fetches the component code but doesn't render it
 */
export async function preloadStep(stepId: string) {
  const loader = stepComponents[stepId]
  if (!loader) {
    console.warn(`[LazyLoader] Cannot preload unknown step: ${stepId}`)
    return
  }
  
  try {
    // Trigger the dynamic import to load the component code
    await loader()
    console.log(`[LazyLoader] Preloaded step: ${stepId}`)
  } catch (error) {
    console.error(`[LazyLoader] Failed to preload step ${stepId}:`, error)
  }
}

/**
 * Preload multiple steps in parallel
 */
export async function preloadSteps(stepIds: string[]) {
  const promises = stepIds.map(id => preloadStep(id))
  await Promise.all(promises)
}

/**
 * Get the next steps that should be preloaded based on current step
 * This helps eliminate loading delays by fetching likely next steps
 */
export function getStepsToPreload(currentStepId: string, formData: any): string[] {
  const stepsToPreload: string[] = []
  
  // Preload based on current step and likely next steps
  switch (currentStepId) {
    case 'email':
      stepsToPreload.push('welcome', 'name-phone')
      break
    case 'welcome':
      stepsToPreload.push('name-phone', 'slide2')
      break
    case 'name-phone':
      stepsToPreload.push('slide2', 'slide3')
      break
    case 'slide2':
      // Preload next slides
      stepsToPreload.push('slide3', 'slide4')
      break
    default:
      // For numbered slides, preload next 2 slides
      const match = currentStepId.match(/slide(\d+)/)
      if (match) {
        const num = parseInt(match[1], 10)
        const nextSlides = []
        
        // Handle special cases for existing slides
        if (num === 15) {
          nextSlides.push('slide30')
        } else if (num < 15) {
          nextSlides.push(`slide${num + 1}`)
          if (num < 14) {
            nextSlides.push(`slide${num + 2}`)
          }
        }
        
        stepsToPreload.push(...nextSlides.filter(id => stepComponents[id]))
      }
      break
  }
  
  return stepsToPreload.filter(id => id !== currentStepId)
}