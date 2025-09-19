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

export default function Slide3({ onBack, onNext, updateFormData, formData, selectedStyle: globalSelectedStyle, onSelectionChange }: Props) {
  const [localSelectedStyle, setLocalSelectedStyle] = useState<string | null>(globalSelectedStyle || null)
  const selectedStyle = globalSelectedStyle !== undefined ? globalSelectedStyle : localSelectedStyle

  const items = useMemo(
    () => [
      { key: "elegant1", label: "Elegant 1", imageSrc: "/img/elegant/e1.jpg" },
      { key: "elegant2", label: "Elegant 2", imageSrc: "/img/elegant/e2.jpg" },
      { key: "elegant3", label: "Elegant 3", imageSrc: "/img/elegant/e3.jpg" },
      { key: "elegant4", label: "Elegant 4", imageSrc: "/img/elegant/e4.jpg" },
      { key: "elegant5", label: "Elegant 5", imageSrc: "/img/elegant/e5.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string) => {
    const item = items.find(i => i.key === key)
    if (!item) return
    setLocalSelectedStyle(key)
    onSelectionChange?.(key)

    // Update form data with the selected elegant style
    updateFormData({ elegantStyle: key })

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
          onItemClick={handleChoose}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}
