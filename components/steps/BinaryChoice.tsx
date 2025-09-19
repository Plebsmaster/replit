"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import { binaryChoiceContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function BinaryChoice({ formData, updateFormData, goToStep, stepKey }: StepProps & { stepKey?: string }) {
  const config = binaryChoiceContent[stepKey as keyof typeof binaryChoiceContent]
  if (!config) {
    console.error(`No config found for binary choice step: ${stepKey}`)
    return null
  }

  const currentValue = (formData as any)[config.fieldName]
  const [selectedChoice, setSelectedChoice] = useState(currentValue || null)

  const handleChoice = (choiceKey: string) => {
    const choice = config.options.find((opt: any) => opt.key === choiceKey)
    if (!choice) return

    setSelectedChoice(choice.dbValue)
    
    // Update form data
    updateFormData({ [config.fieldName]: choice.dbValue })
    
    // Navigate to next step
    goToStep(choice.nextStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>
            {config.title}
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              {config.description}
            </p>
            {config.options.map((option: any) => option.explanation && (
              <p key={option.key} className={getTypographyClasses("paragraph", { alignment: "left" })}>
                <strong>{option.label}:</strong> {option.explanation}
              </p>
            ))}
            {config.instructions && (
              <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
                {config.instructions}
              </p>
            )}
          </div>
        </div>

        <ResponsiveCarousel
          items={config.options.map((option: any) => ({
            key: option.key,
            label: option.label,
            imageSrc: option.imageSrc
          }))}
          selectedItem={config.options.find((opt: any) => opt.dbValue === selectedChoice)?.key || null}
          onItemClick={handleChoice}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}