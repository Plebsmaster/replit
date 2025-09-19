"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { singleChoiceContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function SingleChoice({ formData, updateFormData, onNext, stepKey }: StepProps & { stepKey?: string }) {
  const config = singleChoiceContent[stepKey as keyof typeof singleChoiceContent]
  if (!config) {
    console.error(`No config found for single choice step: ${stepKey}`)
    return null
  }

  const [selectedOption, setSelectedOption] = useState(
    (formData as any)[config.fieldName] || config.defaultValue || null
  )

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    updateFormData({ [config.fieldName]: option })

    // Auto-advance if configured
    if (config.autoAdvance) {
      setTimeout(() => onNext(), 100)
    }
  }

  return (
    <SlideContainer width="standard">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          {config.title}
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            {config.description}
          </p>
          {config.helperText && (
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              {config.helperText}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {config.options.map((option: any) => {
            const isSelected = selectedOption === option.value
            return (
              <div
                key={option.value}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                  isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-black flex-shrink-0" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {!config.autoAdvance && (
          <div className="mt-8">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              disabled={!selectedOption}
            >
              Doorgaan
            </button>
          </div>
        )}
      </section>
    </SlideContainer>
  )
}