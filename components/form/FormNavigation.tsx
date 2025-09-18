"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  canGoNext: boolean
  canGoPrev: boolean
  isSubmitting?: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  isSubmitting = false
}: FormNavigationProps) {
  const getProgressPercentage = () => {
    return Math.round((currentStep / (totalSteps - 1)) * 100)
  }

  if (currentStep === 0) return null

  return (
    <>
      {/* Top Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onPrev}
            variant="outline"
            disabled={!canGoPrev || isSubmitting}
            className="bg-black text-white hover:bg-gray-800 border-black h-10 px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug
          </Button>
          <span className="text-sm text-gray-600 font-medium">
            {getProgressPercentage()}%
          </span>
          <Button
            onClick={onNext}
            variant="outline"
            disabled={!canGoNext || isSubmitting}
            className={`h-10 px-4 border-black ${
              canGoNext && !isSubmitting
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
            }`}
          >
            Doorgaan
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            onClick={onPrev}
            variant="outline"
            disabled={!canGoPrev || isSubmitting}
            className="bg-black text-white hover:bg-gray-800 border-black h-10 px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug
          </Button>
          <Button
            onClick={onNext}
            variant="outline"
            disabled={!canGoNext || isSubmitting}
            className={`h-10 px-4 border-black ${
              canGoNext && !isSubmitting
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Doorgaan"}
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </>
  )
}