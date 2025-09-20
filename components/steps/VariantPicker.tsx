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
    // Use semantic IDs that actually exist in the configuration
    'slide3': 'elegant-styles',
    'slide11': 'modern-styles', 
    'slide4': 'elegant-variant1',
    'slide5': 'elegant-variant2',
    'slide12': 'modern1-variant',
    'slide13': 'modern2-variant', 
    'slide15': 'modern3-variant'
  }
  
  // Determine step key and type properly
  const rawStepKey = stepKey || "elegant-variant1"
  const currentStepKey = keyAliases[rawStepKey] || rawStepKey
  
  // Determine if we're on elegant or modern path based on form data and step
  const isElegant = formData.style === "elegant" || currentStepKey.includes('elegant')
  
  // Detect if this is a style gateway step vs variant step
  const isStyleGateway = ['elegant-styles', 'modern-styles'].includes(currentStepKey)
  
  // Get the variant options for this step from config
  let config = variantContent[currentStepKey as keyof typeof variantContent]
  if (!config) {
    console.warn(`No config found for variant step: ${rawStepKey} (resolved to: ${currentStepKey}), trying fallback`)
    // Try fallback based on style using semantic IDs
    const fallbackKey = isElegant ? 'elegant-styles' : 'modern-styles'
    config = variantContent[fallbackKey]
    if (!config) {
      console.error(`Fallback config also not found for ${fallbackKey}`)
      return null
    }
    console.log(`Using fallback config for ${fallbackKey}`)
  }

  // Initialize selection based on step type
  const currentValue = isStyleGateway 
    ? (isElegant ? formData.elegantStyle : formData.modernStyle)
    : formData.styleVariant
  const [selectedVariant, setSelectedVariant] = useState(currentValue || null)

  const handleVariantChoice = (variantKey: string) => {
    const variant = config.options.find((v: any) => v.key === variantKey)
    if (!variant) return

    setSelectedVariant(variant.dbValue)
    
    // Update the appropriate field based on step type
    if (isStyleGateway) {
      // For style gateway steps, update the style selection field and ensure style is set
      if (isElegant) {
        updateFormData({ elegantStyle: variant.dbValue, style: 'elegant' })
      } else {
        updateFormData({ modernStyle: variant.dbValue, style: 'modern' })
      }
    } else {
      // For variant steps, update the styleVariant field
      updateFormData({ styleVariant: variant.dbValue })
    }
    
    // Navigate to next step - support per-option navigation or fallback to config default
    const nextStep = variant.nextStep || config.nextStep
    goToStep(nextStep)
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