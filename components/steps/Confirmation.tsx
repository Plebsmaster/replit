"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { confirmationContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function Confirmation({ formData, onNext, stepKey }: StepProps & { stepKey?: string }) {
  const config = confirmationContent[stepKey as keyof typeof confirmationContent]
  if (!config) {
    console.error(`No config found for confirmation step: ${stepKey}`)
    return null
  }

  // Function to get display value for a field
  const getDisplayValue = (fieldName: string): string => {
    const value = (formData as any)[fieldName]
    if (!value) return "Niet ingevuld"
    
    // Handle different value types
    if (typeof value === "boolean") {
      return value ? "Ja" : "Nee"
    }
    
    if (typeof value === "object") {
      return JSON.stringify(value)
    }
    
    return String(value)
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
        </div>

        {config.sections && (
          <div className="space-y-8">
            {config.sections.map((section: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.fields.map((field: any, fieldIndex: number) => (
                    <div key={fieldIndex} className="flex justify-between items-start">
                      <span className="text-gray-600">{field.label}:</span>
                      <span className="font-medium text-gray-900 text-right max-w-xs">
                        {getDisplayValue(field.fieldName)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {config.message && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              {config.message}
            </p>
          </div>
        )}

        {config.showContinue && (
          <div className="mt-8">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {config.continueText || "Doorgaan"}
            </button>
          </div>
        )}
      </section>
    </SlideContainer>
  )
}