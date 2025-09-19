"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import { colorChoiceContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function ColorChoice({ formData, updateFormData, goToStep, stepKey }: StepProps & { stepKey?: string }) {
  const config = colorChoiceContent[stepKey as keyof typeof colorChoiceContent]
  if (!config) {
    console.error(`No config found for color choice step: ${stepKey}`)
    return null
  }

  // Determine which field to use based on path
  const isElegant = formData.style === "elegant" || formData.elegantStyle
  const fieldName = isElegant ? "colorScheme" : "kleurZwartWit"
  const currentValue = (formData as any)[fieldName]
  
  const [selectedColor, setSelectedColor] = useState(currentValue || null)

  const handleColorChoice = (colorKey: string) => {
    const color = config.options.find((opt: any) => opt.key === colorKey)
    if (!color) return

    setSelectedColor(color.dbValue)
    
    // Update the appropriate field based on path
    updateFormData({ [fieldName]: color.dbValue })
    
    // Navigate to next step
    goToStep(color.nextStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>
            {config.title}
          </h2>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            {config.description}
          </p>
          {config.helperText && (
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              {config.helperText}
            </p>
          )}
        </div>

        <ResponsiveCarousel
          items={config.options.map((option: any) => ({
            key: option.key,
            label: option.label,
            imageSrc: option.imageSrc
          }))}
          selectedItem={config.options.find((opt: any) => opt.dbValue === selectedColor)?.key || null}
          onItemClick={handleColorChoice}
          columns={config.columns || 2}
        />
      </section>
    </SlideContainer>
  )
}