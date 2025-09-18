"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"
import { Button } from "@/components/ui/button"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps & {
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
}

export default function Slide11({ onBack, onNext, updateFormData, formData, selectedStyle: globalSelectedStyle, onSelectionChange }: Props) {
  const [localSelectedStyle, setLocalSelectedStyle] = useState<string | null>(globalSelectedStyle || null)
  const [hasExistingSelection, setHasExistingSelection] = useState(false)
  
  const selectedStyle = globalSelectedStyle !== undefined ? globalSelectedStyle : localSelectedStyle

  // Check for existing selection on mount
  useEffect(() => {
    try {
      const existing = localStorage.getItem("salonid:styleChoice")
      if (existing) {
        setHasExistingSelection(true)
        if (!selectedStyle) {
          setLocalSelectedStyle(existing)
        }
      }
    } catch {}
  }, [selectedStyle])

  const items = useMemo(
    () => [
      { key: "modern1", label: "Modern 1", src: "/img/elegant/e1.jpg" },
      { key: "modern2", label: "Modern 2", src: "/img/elegant/e2.jpg" },
      { key: "modern3", label: "Modern 3", src: "/img/elegant/e3.jpg" },
      { key: "modern6", label: "Modern 6", src: "/img/variants/variant1.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string, label: string) => {
    setLocalSelectedStyle(key)
    onSelectionChange?.(key)

    // Update form data with the selected modern style
    updateFormData({ modernStyle: key as 'modern1' | 'modern2' | 'modern3' | 'modern6' })

    try {
      localStorage.setItem("salonid:styleChoice", key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Auto-progress using microtask to allow state updates to complete
    queueMicrotask(() => {
      onNext()
    })
  }

  const handleContinue = () => {
    if (selectedStyle) {
      onNext()
    }
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

        {/* Grid */}
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

        {/* Conditional Continue Button */}
        {hasExistingSelection && selectedStyle && (
          <div className="mt-8 text-center">
            <Button
              onClick={handleContinue}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-base font-medium"
            >
              Doorgaan met {items.find(item => item.key === selectedStyle)?.label}
            </Button>
          </div>
        )}
      </section>
    </SlideContainer>
  )
}
