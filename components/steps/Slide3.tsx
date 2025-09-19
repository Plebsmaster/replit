"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps & {
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
}

export default function Slide3({ onBack, onNext, updateFormData, formData, selectedStyle: globalSelectedStyle, onSelectionChange, goToStep }: Props) {
  const [localSelectedStyle, setLocalSelectedStyle] = useState<string | null>(formData.elegantStyle || globalSelectedStyle || null)
  const selectedStyle = globalSelectedStyle !== undefined ? globalSelectedStyle : localSelectedStyle

  const answers = useMemo(
    () => [
      { text: "Elegant 1", nextSlide: "slide4", dbValue: null, key: "elegant1", imageSrc: "/img/slide3/e1.jpg" },
      { text: "Elegant 2", nextSlide: "slide5", dbValue: null, key: "elegant2", imageSrc: "/img/slide3/e2.jpg" },
      { text: "Elegant 3", nextSlide: "slide7", dbValue: "Elegant 3.", key: "elegant3", imageSrc: "/img/slide3/e3.jpg" },
      { text: "Elegant 4", nextSlide: "slide6", dbValue: "Elegant 4.", key: "elegant4", imageSrc: "/img/slide3/e4.jpg" },
      { text: "Elegant 5", nextSlide: "slide6", dbValue: "Elegant 5.", key: "elegant5", imageSrc: "/img/slide3/e5.jpg" },
    ],
    [],
  )

  const handleAnswer = (answer: any) => {
    setLocalSelectedStyle(answer.key)
    onSelectionChange?.(answer.key)

    // Update form data with the selected elegant style
    updateFormData({ elegantStyle: answer.key })

    // Store database value if not null (Template column)
    if (answer.dbValue) {
      // Store template value - using elegantStyle field for Template column
      updateFormData({ elegantStyle: answer.dbValue })
    }

    try {
      localStorage.setItem("salonid:styleChoice", answer.key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Navigate to the specified slide
    goToStep(answer.nextSlide)
  }

  const items = answers.map(answer => ({
    key: answer.key,
    label: answer.text,
    imageSrc: answer.imageSrc
  }))

  return (
    <SlideContainer width="extraWide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kies jouw elegante stijl</h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Je hebt gekozen voor een klassieke en verfijnde uitstraling met sierlijke letters en een stijlvol design.
              Dit ontwerp straalt tijdloze klasse en finesse uit.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Maak nu een keuze uit de onderstaande selectie. Indien een stijl meerdere varianten heeft, kun je na deze
              keuze de specifieke variant selecteren die het beste aansluit bij jouw visie.
            </p>
          </div>
        </div>

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
