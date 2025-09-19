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
  'otp-verification': () => import('@/components/steps/OTPStep'), // Semantic ID mapping
  'contact': () => import('@/components/steps/ContactStep'),
  
  // Style Selection Steps (with semantic IDs)
  'style-selection': () => import('@/components/steps/Slide2'),
  'slide2': () => import('@/components/steps/Slide2'),
  
  // Elegant Style Flow (with semantic IDs)
  'elegant-styles': () => import('@/components/steps/Slide3'),
  'slide3': () => import('@/components/steps/Slide3'),
  'elegant-variant1': () => import('@/components/steps/Slide4'),
  'slide4': () => import('@/components/steps/Slide4'),
  'elegant-variant2': () => import('@/components/steps/Slide5'),
  'slide5': () => import('@/components/steps/Slide5'),
  
  // Modern Style Flow (with semantic IDs)
  'modern-styles': () => import('@/components/steps/Slide11'),
  'slide11': () => import('@/components/steps/Slide11'),
  'modern1-variant': () => import('@/components/steps/Slide12'),
  'slide12': () => import('@/components/steps/Slide12'),
  'modern2-variant': () => import('@/components/steps/Slide13'),
  'slide13': () => import('@/components/steps/Slide13'),
  'modern3-variant': () => import('@/components/steps/Slide14'),
  'slide14': () => import('@/components/steps/Slide14'),
  'modern6-variant': () => import('@/components/steps/Slide15'),
  'slide15': () => import('@/components/steps/Slide15'),
  
  // Color Configuration Flow (with semantic IDs)
  'color-scheme': () => import('@/components/steps/Slide6'),
  'slide6': () => import('@/components/steps/Slide6'),
  'final-color': () => import('@/components/steps/Slide7'),
  'slide7': () => import('@/components/steps/Slide7'),
  'color-palette': () => import('@/components/steps/Slide8'),
  'slide8': () => import('@/components/steps/ColorConfigurator'),
  
  // Icon Flow (with semantic IDs)
  'icon-choice': () => import('@/components/steps/Slide9'),
  'slide9': () => import('@/components/steps/IconYesNoSlide'),
  'icon-selection': () => import('@/components/steps/Slide10'),
  'slide10': () => import('@/components/steps/IconPickerSlide'),
  
  // Final Steps (with semantic IDs)
  'ingredients': () => import('@/components/steps/Slide30'),
  'slide30': () => import('@/components/steps/Slide30'),
  
  // Consolidated components
  'slide18': () => import('@/components/steps/ColorConfigurator'), // Same as slide8
  'slide19': () => import('@/components/steps/IconYesNoSlide'), // Same as slide9
  'slide20': () => import('@/components/steps/IconPickerSlide'), // Same as slide10
  
  // Explicit mappings for critical slides (will be supplemented by fallback)
  'slide22': () => import('@/components/steps/Slide22'),
  
  // New Slides (46-55) - Country Selection, Slogan and QR-Code Flow
  'slide46': () => import('@/components/steps/Slide46'),
  'slide48': () => import('@/components/steps/Slide48'),
  'slide49': () => import('@/components/steps/Slide49'),
  'slide50': () => import('@/components/steps/Slide50'),
  'slide51': () => import('@/components/steps/Slide51'),
  'slide52': () => import('@/components/steps/Slide52'),
  'slide53': () => import('@/components/steps/Slide53'),
  'slide54': () => import('@/components/steps/Slide54'),
  'slide55': () => import('@/components/steps/Slide55'),
  
  // Dashboard Steps
  'dashboard-login': () => import('@/components/steps/DashboardLoginStep'),
}

// Cache for lazy-loaded components to avoid re-creating them
const lazyComponentCache = new Map<string, ReturnType<typeof lazy>>()

/**
 * Fallback loader for numeric slides (slide1, slide2, etc.)
 * Dynamically imports components/steps/SlideN for slideN pattern
 */
function createFallbackLoader(stepId: string): LazyStepComponent | null {
  const match = stepId.match(/^slide(\d+)$/)
  if (match) {
    const slideNumber = match[1]
    return () => import(`@/components/steps/Slide${slideNumber}`)
  }
  return null
}

/**
 * Get a lazy-loaded component for a given step ID
 * Components are cached after first creation to avoid re-creating lazy wrappers
 */
export function getLazyComponent(stepId: string): ReturnType<typeof lazy> | null {
  let loader = stepComponents[stepId]
  
  // Try fallback for numeric slides if not found in explicit mapping
  if (!loader) {
    const fallbackLoader = createFallbackLoader(stepId)
    if (fallbackLoader) {
      // Cache the fallback loader for future use
      stepComponents[stepId] = fallbackLoader
      loader = fallbackLoader
    } else {
      console.warn(`[LazyLoader] No lazy component found for step: ${stepId}`)
      return null
    }
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
  let loader = stepComponents[stepId]
  
  // Try fallback for numeric slides if not found in explicit mapping
  if (!loader) {
    const fallbackLoader = createFallbackLoader(stepId)
    if (fallbackLoader) {
      // Cache the fallback loader for future use
      stepComponents[stepId] = fallbackLoader
      loader = fallbackLoader
    } else {
      console.warn(`[LazyLoader] Cannot preload unknown step: ${stepId}`)
      return
    }
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
 * Get the next steps that should be preloaded based on current step and conditional logic
 * This intelligently analyzes step registry to preload all possible next paths
 */
export function getStepsToPreload(currentStepId: string, formData: any): string[] {
  const stepsToPreload: string[] = []
  
  // Import the step registry dynamically to get conditional logic
  const { getStep, getNextStepId } = require('./steps')
  const currentStep = getStep(currentStepId)
  
  if (!currentStep) {
    return []
  }
  
  // Smart preloading based on conditional logic in step definitions
  switch (currentStepId) {
    case 'email':
      // Preload both paths: new user (name-phone) and existing user (otp-verification)
      stepsToPreload.push('name-phone', 'otp-verification')
      break
      
    case 'welcome':
      stepsToPreload.push('email', 'name-phone')
      break
      
    case 'name-phone':
      // Next is style-selection for all users
      stepsToPreload.push('style-selection')
      break
      
    case 'style-selection':
    case 'slide2':
      // Preload BOTH style paths since user hasn't chosen yet
      stepsToPreload.push('elegant-styles', 'modern-styles')
      // Also preload the first slides of each path
      stepsToPreload.push('slide3', 'slide11')
      break
      
    case 'elegant-styles':
    case 'slide3':
      // User chose elegant, preload both elegant variants
      stepsToPreload.push('elegant-variant1', 'elegant-variant2')
      stepsToPreload.push('slide4', 'slide5')
      break
      
    case 'modern-styles':
    case 'slide11':
      // User chose modern, preload all modern variants
      stepsToPreload.push('modern1-variant', 'modern2-variant', 'modern3-variant', 'modern6-variant')
      stepsToPreload.push('slide12', 'slide13', 'slide14', 'slide15')
      break
      
    case 'elegant-variant1':
    case 'elegant-variant2':
    case 'slide4':
    case 'slide5':
    case 'modern1-variant':
    case 'modern2-variant':
    case 'modern3-variant':
    case 'modern6-variant':
    case 'slide12':
    case 'slide13':
    case 'slide14':
    case 'slide15':
      // All these lead to color-scheme
      stepsToPreload.push('color-scheme', 'slide6')
      break
      
    case 'color-scheme':
    case 'slide6':
      stepsToPreload.push('final-color', 'slide7')
      break
      
    case 'final-color':
    case 'slide7':
      stepsToPreload.push('color-palette', 'slide8')
      break
      
    case 'color-palette':
    case 'slide8':
      stepsToPreload.push('icon-choice', 'slide9')
      break
      
    case 'icon-choice':
    case 'slide9':
      stepsToPreload.push('icon-selection', 'slide10')
      break
      
    case 'icon-selection':
    case 'slide10':
      stepsToPreload.push('ingredients', 'slide30')
      break
      
    case 'ingredients':
    case 'slide30':
      stepsToPreload.push('dashboard-login')
      break
      
    default:
      // Try to get next step from the step definition
      if (currentStep.nextStep && typeof currentStep.nextStep === 'function') {
        const nextStepId = currentStep.nextStep(formData)
        if (nextStepId) {
          stepsToPreload.push(nextStepId)
        }
      }
      break
  }
  
  // Filter out invalid steps and the current step
  // Include steps that can be loaded via fallback (slideNN pattern)
  return stepsToPreload.filter(id => {
    if (id === currentStepId) return false
    return stepComponents[id] || createFallbackLoader(id) !== null
  })
}