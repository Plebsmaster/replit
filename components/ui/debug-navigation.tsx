"use client"

import React from 'react'
import { useWizard } from '@/lib/form/wizard-context'
import { getAllSteps } from '@/lib/form/steps'
import { ChevronDown, ChevronUp, Bug, Database, CheckCircle, XCircle, Loader } from 'lucide-react'
import { debugSubmitToDatabase, validateFormDataForSubmission } from '@/lib/debug/database-submission'

// Only show debug navigation in development mode
const isDev = process.env.NODE_ENV === 'development'

export function DebugNavigation() {
  const { currentStepId, debugGoToStep, visitedSteps, formData } = useWizard()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [submissionStatus, setSubmissionStatus] = React.useState<{
    status: 'idle' | 'submitting' | 'success' | 'error'
    message?: string
  }>({ status: 'idle' })
  
  // Don't render in production
  if (!isDev) {
    return null
  }
  
  // Get all slide steps (exclude registration steps)
  const registrationSteps = ['email', 'name-phone', 'otp-verification', 'dashboard-login']
  const slideSteps = getAllSteps().filter(step => !registrationSteps.includes(step.id))
  
  // Handle debug database submission
  const handleDebugSubmission = React.useCallback(async () => {
    setSubmissionStatus({ status: 'submitting', message: 'Submitting to database...' })
    
    // Validate form data first
    const validation = validateFormDataForSubmission(formData)
    if (!validation.isValid) {
      console.warn('🔍 [DEBUG] Form validation warnings:', {
        missing: validation.missingRequired,
        warnings: validation.warnings
      })
    }
    
    try {
      const result = await debugSubmitToDatabase(formData)
      
      if (result.success) {
        setSubmissionStatus({ status: 'success', message: result.message })
        // Auto-clear success status after 5 seconds
        setTimeout(() => setSubmissionStatus({ status: 'idle' }), 5000)
      } else {
        setSubmissionStatus({ status: 'error', message: result.message })
        // Auto-clear error status after 10 seconds
        setTimeout(() => setSubmissionStatus({ status: 'idle' }), 10000)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setSubmissionStatus({ status: 'error', message: `Submission failed: ${errorMessage}` })
      setTimeout(() => setSubmissionStatus({ status: 'idle' }), 10000)
    }
  }, [formData])
  
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
                  onClick={() => debugGoToStep(step.id)}
                  className={`
                    p-2 text-xs rounded border transition-all hover:scale-105
                    ${isActive 
                      ? 'bg-red-600 text-white border-red-700 shadow-md' 
                      : isVisited
                        ? 'bg-red-200 text-red-800 border-red-400 hover:bg-red-300'
                        : 'bg-white text-red-700 border-red-300 hover:bg-red-100'
                    }
                  `}
                  title={`${step.title} (${step.id}) - ${step.componentFile || 'N/A'}`}
                >
                  <div className="font-medium truncate">{step.title}</div>
                  <div className="text-[10px] opacity-75 truncate">{step.id}</div>
                  {step.componentFile && <div className="text-[10px] opacity-60 truncate">{step.componentFile}</div>}
                  {isActive && <div className="text-[10px] font-bold">CURRENT</div>}
                  {isVisited && !isActive && <div className="text-[10px]">✓</div>}
                </button>
              )
            })}
          </div>
          
          {/* Debug Database Submission */}
          <div className="mt-4 pt-3 border-t border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-red-700">Database Testing</h3>
                <span className="text-xs text-red-500">Force submit current form data</span>
              </div>
              
              <button
                onClick={handleDebugSubmission}
                disabled={submissionStatus.status === 'submitting'}
                className={`
                  flex items-center gap-2 px-3 py-2 text-xs rounded-md border transition-all duration-200
                  ${
                    submissionStatus.status === 'success'
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : submissionStatus.status === 'error'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : submissionStatus.status === 'submitting'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-300 cursor-not-allowed'
                      : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-sm'
                  }
                `}
                title="Force submit current form data to database for testing - bypasses validation and form flow"
              >
                {submissionStatus.status === 'submitting' && <Loader size={14} className="animate-spin" />}
                {submissionStatus.status === 'success' && <CheckCircle size={14} />}
                {submissionStatus.status === 'error' && <XCircle size={14} />}
                {submissionStatus.status === 'idle' && <Database size={14} />}
                
                <span className="font-medium">
                  {submissionStatus.status === 'submitting' && 'Submitting...'}
                  {submissionStatus.status === 'success' && 'Success!'}
                  {submissionStatus.status === 'error' && 'Failed'}
                  {submissionStatus.status === 'idle' && 'Submit to DB'}
                </span>
              </button>
            </div>
            
            {/* Status message */}
            {submissionStatus.message && (
              <div className={`
                mt-2 p-2 text-xs rounded border
                ${
                  submissionStatus.status === 'success'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : submissionStatus.status === 'error'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }
              `}>
                {submissionStatus.message}
              </div>
            )}
            
            {/* Form data summary for debugging */}
            <div className="mt-2 text-xs text-red-600">
              <div>Form data: {formData.email || '[no email]'} | {formData.firstName || '[no name]'} | Style: {formData.style || '[none]'}</div>
              <div>Progress: {visitedSteps.length} steps visited | Current: {currentStepId}</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-xs text-red-600">
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