"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import { variantContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function VariantPicker({ formData, updateFormData, goToStep, stepKey }: StepProps & { stepKey?: string }) {
  // Key aliasing to handle different step ID formats
  const keyAliases: Record<string, string> = {
    'elegant-styles': 'slide3',
    'modern-styles': 'slide11',
    'modern1-variant': 'slide12',
    'modern2-variant': 'slide13',
    'modern3-variant': 'slide15',
    'modern6-variant': 'slide15',
    'elegant-variant1': 'slide4',
    'elegant-variant2': 'slide5'
  }
  
  // Determine if we're on elegant or modern path based on formData
  const isElegant = formData.style === "elegant" || formData.elegantStyle
  const rawStepKey = stepKey || (isElegant ? "elegant-variant1" : "modern-variant1")
  const currentStepKey = keyAliases[rawStepKey] || rawStepKey
  
  // Get the variant options for this step from config
  let config = variantContent[currentStepKey as keyof typeof variantContent]
  if (!config) {
    console.warn(`No config found for variant step: ${rawStepKey} (resolved to: ${currentStepKey}), trying fallback`)
    // Try fallback based on style
    const fallbackKey = isElegant ? 'slide3' : 'slide11'
    config = variantContent[fallbackKey]
    if (!config) {
      console.error(`Fallback config also not found for ${fallbackKey}`)
      return null
    }
    console.log(`Using fallback config for ${fallbackKey}`)
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
    
    // Don't auto-advance - let the user click continue
    // The StepNavigation component will handle the continue button
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