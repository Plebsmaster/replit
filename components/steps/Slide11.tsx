"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps & {
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
}

export default function Slide11({ onBack, onNext, updateFormData, formData, selectedStyle: globalSelectedStyle, onSelectionChange }: Props) {
  const [localSelectedStyle, setLocalSelectedStyle] = useState<string | null>(formData.modernStyle || globalSelectedStyle || null)
  
  const selectedStyle = globalSelectedStyle !== undefined ? globalSelectedStyle : localSelectedStyle


  const items = useMemo(
    () => [
      { key: "modern1", label: "Modern 1", imageSrc: "/img/elegant/e1.jpg" },
      { key: "modern2", label: "Modern 2", imageSrc: "/img/elegant/e2.jpg" },
      { key: "modern3", label: "Modern 3", imageSrc: "/img/elegant/e3.jpg" },
      { key: "modern6", label: "Modern 6", imageSrc: "/img/variants/variant1.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string) => {
    setLocalSelectedStyle(key)
    onSelectionChange?.(key)

    // Update form data with the selected modern style
    updateFormData({ modernStyle: key as 'modern1' | 'modern2' | 'modern3' | 'modern6' })

    try {
      localStorage.setItem("salonid:styleChoice", key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Auto-progress with delay to allow state machine to process the update
    setTimeout(() => {
      onNext()
    }, 100)
  }


  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kies jouw moderne stijl</h2>

        {/* Intro copy */}
        <div className="max-w-[760px] space-y-4 mb-6">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt gekozen voor een frisse en eigentijdse uitstraling met strakke lijnen en een minimalistisch design.
            Dit ontwerp straalt moderniteit en innovatie uit.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Maak nu een keuze uit de onderstaande selectie. Indien een stijl meerdere varianten heeft, kun je na deze
            keuze de specifieke variant selecteren die het beste aansluit bij jouw visie.
          </p>
        </div>

        {/* Responsive Carousel */}
        <ResponsiveCarousel
          items={items}
          selectedItem={selectedStyle}
          onItemClick={handleChoose}
          columns={2}
        />

      </section>
    </SlideContainer>
  )
}
