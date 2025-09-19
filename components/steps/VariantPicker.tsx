"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import { variantContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function VariantPicker({ formData, updateFormData, goToStep, stepKey }: StepProps & { stepKey?: string }) {
  // Determine if we're on elegant or modern path based on formData
  const isElegant = formData.style === "elegant" || formData.elegantStyle
  const currentStepKey = stepKey || (isElegant ? "elegant-variant1" : "modern-variant1")
  
  // Get the variant options for this step from config
  const config = variantContent[currentStepKey as keyof typeof variantContent]
  if (!config) {
    console.error(`No config found for variant step: ${currentStepKey}`)
    return null
  }

  const currentValue = isElegant ? formData.elegantStyle : formData.modernStyle
  const [selectedVariant, setSelectedVariant] = useState(currentValue || null)

  const handleVariantChoice = (variantKey: string) => {
    const variant = config.options.find((v: any) => v.key === variantKey)
    if (!variant) return

    setSelectedVariant(variant.dbValue)
    
    // Update the appropriate field based on path
    if (isElegant) {
      updateFormData({ elegantStyle: variant.dbValue })
    } else {
      updateFormData({ modernStyle: variant.dbValue })
    }
    
    // Navigate to next step
    goToStep(config.nextStep)
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
        </div>

        <ResponsiveCarousel
          items={config.options.map((variant: any) => ({
            key: variant.key,
            label: variant.label,
            imageSrc: variant.imageSrc
          }))}
          selectedItem={config.options.find((v: any) => v.dbValue === selectedVariant)?.key || null}
          onItemClick={handleVariantChoice}
          columns={config.columns || 2}
        />
      </section>
    </SlideContainer>
  )
}