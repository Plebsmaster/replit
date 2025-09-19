"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: (selectedVariant?: string) => void
  selectedVariant?: string | null
  onSelectionChange?: (variant: string | null) => void
  goToStep?: (stepId: string) => void
  updateFormData?: (data: any) => void
}

export default function Slide4({ onBack, onNext, selectedVariant: globalSelectedVariant, onSelectionChange, goToStep, updateFormData }: Props) {
  const [localSelectedVariant, setLocalSelectedVariant] = useState<string | null>(globalSelectedVariant || null)
  const selectedVariant = globalSelectedVariant !== undefined ? globalSelectedVariant : localSelectedVariant

  const answers = useMemo(
    () => [
      { 
        text: "Uitlijning links", 
        nextSlide: "slide6", 
        dbValue: "Elegant 1.1",
        key: "Variant 1",
        imageSrc: "/img/slide4/variant1.jpg"
      },
      { 
        text: "Uitlijning midden", 
        nextSlide: "slide6", 
        dbValue: "Elegant 1.2",
        key: "Variant 2",
        imageSrc: "/img/slide4/variant2.jpg"
      }
    ],
    [],
  )

  const handleAnswer = (answer: any) => {
    setLocalSelectedVariant(answer.key)
    onSelectionChange?.(answer.key)

    // Store database value in Template column
    if (updateFormData && answer.dbValue) {
      updateFormData({ elegantStyle: answer.dbValue })
    }

    // Navigate to the specified slide
    if (goToStep) {
      goToStep(answer.nextSlide)
    }
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
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>Selecteer jouw specifieke variant</h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Je hebt gekozen voor een ontwerp met meerdere varianten. Selecteer nu de optie die het beste aansluit bij
              jouw visie. Elke variant heeft zijn eigen unieke kenmerken, waardoor jij de stijl kunt kiezen die perfect
              past bij jouw merk.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={items}
          selectedItem={selectedVariant}
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
