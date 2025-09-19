"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps & {
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
  goToStep?: (stepId: string) => void
}

export default function Slide11({ onBack, onNext, updateFormData, formData, selectedStyle: globalSelectedStyle, onSelectionChange, goToStep }: Props) {
  const [localSelectedStyle, setLocalSelectedStyle] = useState<string | null>(formData.modernStyle || globalSelectedStyle || null)
  
  const selectedStyle = globalSelectedStyle !== undefined ? globalSelectedStyle : localSelectedStyle

  const answers = useMemo(
    () => [
      { text: 'Modern 1', nextSlide: 'slide12', dbValue: null, key: "modern1", label: "Modern 1", imageSrc: "/img/slide11/e1.jpg" },
      { text: 'Modern 2', nextSlide: 'slide13', dbValue: null, key: "modern2", label: "Modern 2", imageSrc: "/img/slide11/e2.jpg" },
      { text: 'Modern 3', nextSlide: 'slide14', dbValue: null, key: "modern3", label: "Modern 3", imageSrc: "/img/slide11/e3.jpg" },
      { text: 'Modern 4', nextSlide: 'slide16', dbValue: 'Modern 4.', key: "modern4", label: "Modern 4", imageSrc: "/img/slide11/e4.jpg" },
      { text: 'Modern 5', nextSlide: 'slide16', dbValue: 'Modern 5.', key: "modern5", label: "Modern 5", imageSrc: "/img/slide11/e5.jpg" },
      { text: 'Modern 6', nextSlide: 'slide15', dbValue: null, key: "modern6", label: "Modern 6", imageSrc: "/img/slide11/variant1.jpg" },
    ],
    [],
  )

  const handleAnswer = (answer: any) => {
    setLocalSelectedStyle(answer.key)
    onSelectionChange?.(answer.key)

    // Update form data with the selected modern style
    updateFormData({ modernStyle: answer.key })

    // Store database value if not null (Template column)
    if (answer.dbValue) {
      updateFormData({ elegantStyle: answer.dbValue })
    }

    try {
      localStorage.setItem("salonid:styleChoice", answer.key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Navigate to the specified slide
    if (goToStep) {
      goToStep(answer.nextSlide)
    }
  }

  const items = answers.map(answer => ({
    key: answer.key,
    label: answer.label,
    imageSrc: answer.imageSrc
  }))


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
          onItemClick={(key) => {
            const answer = answers.find(a => a.key === key)
            if (answer) handleAnswer(answer)
          }}
          columns={2}
        />

      </section>
    </SlideContainer>
  )
}
