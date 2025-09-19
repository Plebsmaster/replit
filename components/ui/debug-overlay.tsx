"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Bug } from "lucide-react"
import { useWizard } from "@/lib/form/wizard-context"
import { getStep } from "@/lib/form/steps"

export function DebugOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const { formData, currentStepId } = useWizard()
  const currentStep = getStep(currentStepId)

  // Extract key debugging info
  const debugInfo = {
    currentStepId,
    style: formData.style,
    elegantStyle: formData.elegantStyle,
    modernStyle: formData.modernStyle,
    colorScheme: formData.colorScheme,
    finalColorChoice: formData.finalColorChoice,
    kleurZwartWit: formData.kleurZwartWit,
    iconChoice: formData.iconChoice,
    icoonJaNee: formData.icoonJaNee,
    selectedIcon: formData.selectedIcon, 
    nextStep: currentStep?.nextStep ? (typeof currentStep.nextStep === 'function' ? currentStep.nextStep(formData) : currentStep.nextStep) : null,
    showGlobalNext: currentStep?.showGlobalNext,
    showGlobalPrev: currentStep?.showGlobalPrev,
  }

  // Determine which path user is on
  const isElegantPath = formData.style === 'elegant'
  const pathInfo = {
    path: isElegantPath ? 'ELEGANT' : formData.style === 'modern' ? 'MODERN' : 'NONE',
    variant: formData.elegantStyle || formData.modernStyle || 'none',
  }

  // Image paths being used (example for consolidated components)
  const imagePaths: Record<string, string> = {}
  if (currentStepId === 'slide8' || currentStepId === 'slide18' || currentStepId === 'color-palette') {
    imagePaths['Color Config'] = isElegantPath ? '/img/slide8/*' : '/img/slide18/*'
  }
  if (currentStepId === 'slide9' || currentStepId === 'slide19' || currentStepId === 'icon-choice') {
    imagePaths['Icon Yes/No'] = isElegantPath ? '/img/slide9/*' : '/img/slide19/*'
  }
  if (currentStepId === 'slide10' || currentStepId === 'slide20' || currentStepId === 'icon-selection') {
    imagePaths['Icon Picker'] = 'Dynamic based on template variant'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-gray-900 text-white rounded-lg shadow-2xl font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-t-lg"
      >
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4" />
          <span className="font-bold">Debug Info</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
          {/* Current Step Info */}
          <div className="border-b border-gray-700 pb-2">
            <div className="text-yellow-400 font-bold mb-1">CURRENT STEP</div>
            <div>ID: {debugInfo.currentStepId}</div>
            <div>Next: {debugInfo.nextStep || 'none'}</div>
            <div>Nav Buttons: Next={String(debugInfo.showGlobalNext)} Prev={String(debugInfo.showGlobalPrev)}</div>
          </div>

          {/* Path Info */}
          <div className="border-b border-gray-700 pb-2">
            <div className="text-green-400 font-bold mb-1">PATH INFO</div>
            <div>Path: {pathInfo.path}</div>
            <div>Variant: {pathInfo.variant}</div>
          </div>

          {/* Icon Fields */}
          <div className="border-b border-gray-700 pb-2">
            <div className="text-blue-400 font-bold mb-1">ICON FIELDS</div>
            <div>iconChoice (slide9): {debugInfo.iconChoice || 'null'}</div>
            <div>icoonJaNee (slide19): {debugInfo.icoonJaNee || 'null'}</div>
            <div>selectedIcon: {debugInfo.selectedIcon ? 'true' : 'false'}</div>
          </div>

          {/* Color Fields */}
          <div className="border-b border-gray-700 pb-2">
            <div className="text-purple-400 font-bold mb-1">COLOR FIELDS</div>
            <div>colorScheme: {debugInfo.colorScheme || 'null'}</div>
            <div>finalColorChoice: {debugInfo.finalColorChoice || 'null'}</div>
            <div>kleurZwartWit: {debugInfo.kleurZwartWit || 'null'}</div>
          </div>

          {/* Image Paths */}
          {Object.keys(imagePaths).length > 0 && (
            <div className="border-b border-gray-700 pb-2">
              <div className="text-orange-400 font-bold mb-1">IMAGE PATHS</div>
              {Object.entries(imagePaths).map(([key, path]) => (
                <div key={key}>{key}: {path}</div>
              ))}
            </div>
          )}

          {/* Raw FormData (collapsed) */}
          <details className="cursor-pointer">
            <summary className="text-gray-400 hover:text-white">Full FormData (click to expand)</summary>
            <pre className="mt-2 text-xs overflow-x-auto bg-gray-800 p-2 rounded">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}