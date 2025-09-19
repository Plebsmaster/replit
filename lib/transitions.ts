// Global transition configuration for premium slide animations

export const TRANSITION_CONFIG = {
  // Fade transition settings
  fade: {
    duration: 500, // milliseconds
    timingFunction: 'ease-in-out',
    staggerDelay: 50, // delay between elements
    enterDelay: 100, // delay for step transitions
  },
  
  // Animation states
  states: {
    entering: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    entered: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    exiting: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
  },
} as const

export type TransitionState = 'entering' | 'entered' | 'exiting'

// CSS transition classes for different states (deprecated - use config-based styles)
export const TRANSITION_CLASSES = {
  base: 'transition-all duration-500 ease-in-out',
  entering: 'opacity-0 translate-y-2',
  entered: 'opacity-100 translate-y-0',
  exiting: 'opacity-0 -translate-y-2',
} as const

// Hook for managing transition states (deprecated - use config-based styles)
export function getTransitionClasses(state: TransitionState): string {
  return `${TRANSITION_CLASSES.base} ${TRANSITION_CLASSES[state]}`
}

// Get configurable transition duration for dynamic usage
export function getTransitionDuration(): number {
  return TRANSITION_CONFIG.fade.duration
}

// Get transition timing function for dynamic usage
export function getTransitionTimingFunction(): string {
  return TRANSITION_CONFIG.fade.timingFunction
}