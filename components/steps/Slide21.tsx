"use client"

import React from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"

interface Slide21Props {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
}

export default function Slide21({ formData, updateFormData, onBack, onNext }: Slide21Props) {
  
  // Auto-advance to next slide (ingredients)
  const handleContinue = () => {
    queueMicrotask(() => {
      onNext()
    })
  }

  // Automatically continue after a brief delay to show the slide
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleContinue()
    }, 1500) // 1.5 second delay
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <SlideContainer width="standard">
      <section>
        {/* Title */}
        <h1 className={getTypographyClasses("title", { alignment: "center" })}>
          Perfect! Je icoon is geselecteerd
        </h1>

        {/* Description */}
        <div className="max-w-[600px] mx-auto space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "center" })}>
            Uitstekende keuze! Je hebt een prachtig icoon geselecteerd dat perfect bij je ontwerp past.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "center" })}>
            We gaan nu verder met de laatste stappen van je persoonlijke productontwerp.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </section>
    </SlideContainer>
  )
}