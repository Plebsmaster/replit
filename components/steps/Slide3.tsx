"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
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
      { key: "elegant1", label: "Elegant 1", src: "/img/elegant/e1.jpg" },
      { key: "elegant2", label: "Elegant 2", src: "/img/elegant/e2.jpg" },
      { key: "elegant3", label: "Elegant 3", src: "/img/elegant/e3.jpg" },
      { key: "elegant4", label: "Elegant 4", src: "/img/elegant/e4.jpg" },
      { key: "elegant5", label: "Elegant 5", src: "/img/elegant/e5.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string, label: string) => {
    setLocalSelectedStyle(key)
    onSelectionChange?.(key)

    // Update form data with the selected elegant style
    updateFormData({ elegantStyle: key })

    try {
      localStorage.setItem("salonid:styleChoice", key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Auto-progress using microtask to allow state updates to complete
    queueMicrotask(() => {
      onNext()
    })
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <ChoiceCard
              key={item.key}
              label={item.label}
              imageSrc={item.src}
              alt={`${item.label} mockup`}
              isSelected={selectedStyle === item.key}
              onClick={() => handleChoose(item.key, item.label)}
            />
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}
