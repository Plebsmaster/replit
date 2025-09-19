"use client"

import React, { useState, useEffect, useRef } from 'react'
import { TRANSITION_CONFIG, type TransitionState } from '@/lib/transitions'

interface SlideTransitionProps {
  children: React.ReactNode
  stepId: string
  className?: string
}

interface StepEntry {
  stepId: string
  children: React.ReactNode
  state: TransitionState
}

export function SlideTransition({ children, stepId, className = '' }: SlideTransitionProps) {
  const [activeSteps, setActiveSteps] = useState<StepEntry[]>([{
    stepId,
    children,
    state: 'entering'
  }])
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map())

  // Clear timeout helper
  const clearStepTimeout = (id: string) => {
    const timeout = timeoutRefs.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutRefs.current.delete(id)
    }
  }

  // Set timeout helper
  const setStepTimeout = (id: string, callback: () => void, delay: number) => {
    clearStepTimeout(id)
    const timeout = setTimeout(callback, delay)
    timeoutRefs.current.set(id, timeout)
  }

  useEffect(() => {
    setActiveSteps(current => {
      // If this is the same step, just update children but keep state
      const existing = current.find(step => step.stepId === stepId)
      if (existing) {
        return current.map(step => 
          step.stepId === stepId 
            ? { ...step, children }
            : step
        )
      }

      // New step - start exit transition for previous steps and enter for new
      const updatedSteps = current.map(step => ({
        ...step,
        state: 'exiting' as TransitionState
      }))

      // Add new step in entering state
      const newStep: StepEntry = {
        stepId,
        children,
        state: 'entering'
      }

      // Schedule exit cleanup for old steps
      updatedSteps.forEach(step => {
        if (step.stepId !== stepId) {
          setStepTimeout(`exit-${step.stepId}`, () => {
            setActiveSteps(prev => prev.filter(s => s.stepId !== step.stepId))
          }, TRANSITION_CONFIG.fade.duration)
        }
      })

      // Schedule enter completion for new step
      setStepTimeout(`enter-${stepId}`, () => {
        setActiveSteps(prev => prev.map(step =>
          step.stepId === stepId 
            ? { ...step, state: 'entered' as TransitionState }
            : step
        ))
      }, 50)

      return [...updatedSteps, newStep]
    })

    return () => {
      // Cleanup all timeouts on unmount
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
      timeoutRefs.current.clear()
    }
  }, [stepId, children])

  // Generate transition styles using config
  const getTransitionStyle = (state: TransitionState): React.CSSProperties => {
    const config = TRANSITION_CONFIG.fade
    const stateStyles = TRANSITION_CONFIG.states[state]
    
    return {
      transition: `all ${config.duration}ms ${config.timingFunction}`,
      ...stateStyles,
    }
  }

  return (
    <div className={`relative ${className}`}>
      {activeSteps.map((step) => (
        <div
          key={step.stepId}
          className={step.stepId === stepId ? "" : "absolute inset-0 pointer-events-none"}
          style={getTransitionStyle(step.state)}
        >
          {step.children}
        </div>
      ))}
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