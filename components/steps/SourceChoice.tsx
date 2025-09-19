"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { sourceChoiceContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function SourceChoice({ formData, updateFormData, goToStep, stepKey }: StepProps & { stepKey?: string }) {
  const config = sourceChoiceContent[stepKey as keyof typeof sourceChoiceContent]
  if (!config) {
    console.error(`No config found for source choice step: ${stepKey}`)
    return null
  }

  const currentValue = (formData as any)[config.fieldName]
  const [selectedSource, setSelectedSource] = useState(currentValue || null)
  const [expandedOption, setExpandedOption] = useState<string | null>(null)

  const handleSourceChoice = (sourceKey: string) => {
    const source = config.options.find((opt: any) => opt.key === sourceKey)
    if (!source) return

    setSelectedSource(source.dbValue)
    updateFormData({ [config.fieldName]: source.dbValue })
    
    // Navigate to next step
    goToStep(source.nextStep)
  }

  const toggleExpanded = (key: string) => {
    setExpandedOption(expandedOption === key ? null : key)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          {config.title}
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            {config.description}
          </p>
        </div>

        <div className="space-y-4">
          {config.options.map((option: any) => (
            <div key={option.key} className="border border-gray-300 rounded-lg overflow-hidden">
              <div 
                className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedSource === option.dbValue ? "bg-gray-50" : ""
                }`}
                onClick={() => handleSourceChoice(option.key)}
              >
                <div className="flex items-start gap-4">
                  {option.icon && (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{option.icon}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.label}</h3>
                    <p className="text-gray-700">{option.description}</p>
                    
                    {option.features && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpanded(option.key)
                        }}
                        className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {expandedOption === option.key ? "Verberg details" : "Bekijk wat je krijgt"}
                      </button>
                    )}
                  </div>
                  {selectedSource === option.dbValue && (
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>

                {expandedOption === option.key && option.features && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="space-y-2">
                      {option.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}