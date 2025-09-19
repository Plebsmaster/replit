"use client"

import { useState } from "react"
import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import { getUserContext, slideImages, navigationConfig } from "@/lib/slide-content-config"

interface IconYesNoSlideProps {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
  goToStep?: (stepId: string) => void
  stepKey?: string // 'slide9' or 'slide19'
}

export default function IconYesNoSlide({ 
  formData, 
  updateFormData, 
  onBack, 
  onNext, 
  goToStep,
  stepKey 
}: IconYesNoSlideProps) {
  // Determine which slide this is from the wizard context or props
  const userContext = getUserContext(formData)
  const isElegantPath = userContext.style === 'elegant'
  
  // Map canonical IDs to legacy IDs for navigation config lookup
  const stepKeyMap: Record<string, string> = {
    'icon-choice': 'slide9',
    'slide9': 'slide9',
    'slide19': 'slide19'
  }
  const configKey = stepKeyMap[stepKey || ''] || (isElegantPath ? 'slide9' : 'slide19')
  
  // Get the appropriate images and navigation based on path
  const images = isElegantPath ? slideImages.iconYesNo.elegant : slideImages.iconYesNo.modern
  const navigation = navigationConfig.iconYesNo[configKey as keyof typeof navigationConfig.iconYesNo]
  
  // Determine field name based on which slide this is
  const fieldName = configKey === 'slide9' ? 'iconChoice' : 'icoonJaNee'
  const secondaryField = configKey === 'slide9' ? 'selectedIcon' : null
  
  const [selectedOption, setSelectedOption] = useState<string | null>(formData[fieldName] || null)

  const handleAnswer = (choice: 'withIcon' | 'withoutIcon') => {
    const dbValue = choice === 'withIcon' ? 'Met icoon' : 'Zonder icoon'
    setSelectedOption(dbValue)
    
    // Update form data with appropriate field
    const updates: any = { [fieldName]: dbValue }
    if (secondaryField) {
      updates[secondaryField] = choice === 'withIcon'
    }
    updateFormData(updates)
    
    // Store in localStorage for resilience
    try {
      localStorage.setItem(`salonid:${fieldName}`, dbValue)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    
    // Navigate to the appropriate next slide
    const nextSlide = navigation[choice]
    if (goToStep && nextSlide) {
      queueMicrotask(() => {
        goToStep(nextSlide)
      })
    } else {
      // Fallback to onNext if no specific navigation
      queueMicrotask(() => {
        onNext()
      })
    }
  }

  const iconOptions = [
    {
      key: "with-icon",
      label: "Met Icoon",
      imageSrc: images.withIcon,
      alt: "Met icoon",
    },
    {
      key: "without-icon", 
      label: "Zonder Icoon",
      imageSrc: images.withoutIcon,
      alt: "Zonder icoon",
    },
  ]

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Wil je een icoon op de verpakking?
        </h2>

        <div className="max-w-[760px] space-y-4">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            We bieden de mogelijkheid om een icoon toe te voegen aan je verpakkingsontwerp. Een icoon kan je merk
            visueel versterken en een extra dimensie toevoegen aan het design.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Het kan helpen om specifieke productkenmerken te benadrukken of gewoon een stijlvolle aanvulling zijn.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            <strong>Voordeel:</strong> Versterkt de visuele identiteit van je merk.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            <strong>Nadeel:</strong> Een minimalistische uitstraling gaat mogelijk verloren.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Klik op <strong>Met Icoon</strong> of <strong>Zonder Icoon</strong> om direct door te gaan.
          </p>
        </div>

        <ResponsiveCarousel
          items={iconOptions}
          selectedItem={selectedOption === 'Met icoon' ? 'with-icon' : selectedOption === 'Zonder icoon' ? 'without-icon' : null}
          onItemClick={(key) => {
            if (key === 'with-icon') {
              handleAnswer('withIcon')
            } else if (key === 'without-icon') {
              handleAnswer('withoutIcon')
            }
          }}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}