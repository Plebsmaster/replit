"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { productNameContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function ProductNameSelector({ formData, updateFormData, stepKey }: StepProps & { stepKey?: string }) {
  const config = productNameContent[stepKey as keyof typeof productNameContent]
  if (!config) {
    console.error(`No config found for product name step: ${stepKey}`)
    return null
  }

  // Initialize selections from formData
  const initialSelections = config.sections.reduce((acc: Record<string, string>, section: any) => {
    acc[section.key] = (formData as any)[section.fieldName] || section.options[0]
    return acc
  }, {} as Record<string, string>)

  const [selectedChoices, setSelectedChoices] = useState(initialSelections)

  // Check if all products have selections
  const isComplete = useMemo(() => {
    return config.sections.every((section: any) => selectedChoices[section.key])
  }, [selectedChoices, config.sections])

  const handleOptionSelect = (sectionKey: string, option: string) => {
    const newSelections = { ...selectedChoices, [sectionKey]: option }
    setSelectedChoices(newSelections)

    // Find the section config
    const section = config.sections.find((s: any) => s.key === sectionKey)
    if (!section) return

    // Update formData with the selections
    const updates = {
      [section.fieldName]: option
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const storageKey = `salonid:${section.key}Name`
      localStorage.setItem(storageKey, option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
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
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            {config.instructions}
          </p>
        </div>

        <div className="space-y-8">
          {config.sections.map((section: any) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.options.map((option: string) => {
                  const isSelected = selectedChoices[section.key] === option
                  return (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(section.key, option)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-800 font-medium">{option}</div>
                        </div>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-black flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}