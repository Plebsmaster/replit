"use client"

import React, { useState, useEffect, useRef } from 'react'
import { TRANSITION_CONFIG } from '@/lib/transitions'

interface SlideTransitionProps {
  children: React.ReactNode
  stepId: string
  className?: string
}

export function SlideTransition({ children, stepId, className = '' }: SlideTransitionProps) {
  const [currentStep, setCurrentStep] = useState(stepId)
  const [transitioning, setTransitioning] = useState(false)
  const [displayedChildren, setDisplayedChildren] = useState(children)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // If stepId changed, start transition
    if (stepId !== currentStep) {
      setTransitioning(true)
      
      // After fade out completes, update content and fade in
      timeoutRef.current = setTimeout(() => {
        setCurrentStep(stepId)
        setDisplayedChildren(children)
        setTransitioning(false)
      }, TRANSITION_CONFIG.fade.duration / 2)
    } else {
      // Same step, just update children
      setDisplayedChildren(children)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [stepId, children, currentStep])

  // Generate transition styles
  const transitionStyle: React.CSSProperties = {
    transition: `opacity ${TRANSITION_CONFIG.fade.duration}ms ${TRANSITION_CONFIG.fade.timingFunction}, transform ${TRANSITION_CONFIG.fade.duration}ms ${TRANSITION_CONFIG.fade.timingFunction}`,
    opacity: transitioning ? 0 : 1,
    transform: transitioning ? 'translateY(10px)' : 'translateY(0px)',
  }

  return (
    <div className={className} style={transitionStyle}>
      {displayedChildren}
    </div>
  )
}

// Higher-order component for wrapping steps with transitions
export function withSlideTransition<P extends object>(
  Component: React.ComponentType<P>,
  stepId: string
): React.ComponentType<P> {
  const TransitionWrappedComponent = (props: P) => {
    return (
      <SlideTransition stepId={stepId}>
        <Component {...props} />
      </SlideTransition>
    )
  }

  TransitionWrappedComponent.displayName = `withSlideTransition(${Component.displayName || Component.name})`
  
  return TransitionWrappedComponent
}