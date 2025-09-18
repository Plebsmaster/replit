"use client"

import React from 'react'
import { useWizard } from '@/lib/form/wizard-context'
import { getAllSteps } from '@/lib/form/steps'
import { ChevronDown, ChevronUp, Bug } from 'lucide-react'

// Only show debug navigation in development mode
const isDev = process.env.NODE_ENV === 'development'

export function DebugNavigation() {
  const { currentStepId, goToStep, visitedSteps } = useWizard()
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  // Don't render in production
  if (!isDev) {
    return null
  }
  
  // Get all slide steps (exclude registration steps)
  const registrationSteps = ['email', 'name-phone', 'otp-verification', 'dashboard-login']
  const slideSteps = getAllSteps().filter(step => !registrationSteps.includes(step.id))
  
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-50 border-b-2 border-red-300 shadow-sm">
      {/* Debug header with toggle */}
      <div className="max-w-6xl mx-auto px-4 py-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-red-700 hover:text-red-900 transition-colors text-sm font-medium"
        >
          <Bug size={16} />
          <span>Debug Navigation ({slideSteps.length} slides)</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {/* Current step indicator */}
        <div className="text-xs text-red-600 mt-1">
          Current: {currentStepId} | Visited: {visitedSteps.length}
        </div>
      </div>
      
      {/* Expanded grid view */}
      {isExpanded && (
        <div className="max-w-6xl mx-auto px-4 pb-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {slideSteps.map((step) => {
              const isActive = step.id === currentStepId
              const isVisited = visitedSteps.includes(step.id)
              
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  className={`
                    p-2 text-xs rounded border transition-all hover:scale-105
                    ${isActive 
                      ? 'bg-red-600 text-white border-red-700 shadow-md' 
                      : isVisited
                        ? 'bg-red-200 text-red-800 border-red-400 hover:bg-red-300'
                        : 'bg-white text-red-700 border-red-300 hover:bg-red-100'
                    }
                  `}
                  title={`${step.title} (${step.id})`}
                >
                  <div className="font-medium truncate">{step.title}</div>
                  <div className="text-[10px] opacity-75 truncate">{step.id}</div>
                  {isActive && <div className="text-[10px] font-bold">CURRENT</div>}
                  {isVisited && !isActive && <div className="text-[10px]">✓</div>}
                </button>
              )
            })}
          </div>
          
          {/* Legend */}
          <div className="flex gap-4 mt-3 text-xs text-red-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-200 border border-red-400 rounded"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-white border border-red-300 rounded"></div>
              <span>Available</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}