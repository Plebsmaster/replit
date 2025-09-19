"use client"

import React, { useState, useEffect, useRef } from 'react'
import { TRANSITION_CONFIG } from '@/lib/transitions'

interface SlideTransitionProps {
  children: React.ReactNode
  stepId: string
  className?: string
}

interface StepState {
  stepId: string
  children: React.ReactNode
  isActive: boolean
}

export function SlideTransition({ children, stepId, className = '' }: SlideTransitionProps) {
  const [steps, setSteps] = useState<StepState[]>([{ stepId, children, isActive: true }])
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  useEffect(() => {
    const currentStep = steps.find(step => step.stepId === stepId)
    
    if (currentStep) {
      // Step exists, just update children
      setSteps(prev => prev.map(step => 
        step.stepId === stepId 
          ? { ...step, children }
          : step
      ))
    } else {
      // New step - add it and deactivate others
      setSteps(prev => [
        ...prev.map(step => ({ ...step, isActive: false })),
        { stepId, children, isActive: true }
      ])
      
      // Clean up old steps after transition
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setSteps(prev => prev.filter(step => step.isActive))
      }, TRANSITION_CONFIG.fade.duration + 100)
    }
  }, [stepId, children])
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  return (
    <div className={`${className} bg-background min-h-screen overflow-hidden relative`}>
      {steps.map((step) => (
        <div
          key={step.stepId}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            step.isActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            pointerEvents: step.isActive ? 'auto' : 'none',
          }}
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