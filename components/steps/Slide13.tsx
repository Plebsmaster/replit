"use client"

import { useEffect, useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: () => void
  selectedVariant?: string | null
  onSelectionChange?: (variant: string | null) => void
}

export default function Slide13({ onBack, onNext, selectedVariant: globalSelectedVariant, onSelectionChange }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [localSelectedVariant, setLocalSelectedVariant] = useState<string | null>(globalSelectedVariant || null)
  
  const selectedVariant = globalSelectedVariant !== undefined ? globalSelectedVariant : localSelectedVariant

  useEffect(() => {
    try {
      const style = localStorage.getItem("salonid:styleChoice") || ""
      setSelectedStyle(style)
      
    } catch (error) {
      // Could not load from localStorage, continue silently
    }
  }, [selectedVariant])

  const variants = [
    {
      id: "1",
      label: "Uitlijning links",
      imageSrc: "/img/elegant2/variant1.jpg",
      alt: "Modern 2 Variant 1 - Left alignment",
    },
    {
      id: "2",
      label: "Uitlijning midden",
      imageSrc: "/img/elegant2/variant2.jpg",
      alt: "Modern 2 Variant 2 - Center alignment",
    },
  ]

  const handleChooseVariant = (variantNumber: string) => {
    setLocalSelectedVariant(variantNumber)
    onSelectionChange?.(variantNumber)

    try {
      const finalStyle = `${selectedStyle}${variantNumber}`
      localStorage.setItem("salonid:styleVariant", finalStyle)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // Could not save variant to localStorage, continue silently
    }
    
    queueMicrotask(() => {
      onNext()
    })
  }


  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Selecteer jouw specifieke variant</h2>

        {/* Intro copy */}
        <div className="max-w-[760px] space-y-4 mb-10">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt gekozen voor een ontwerp met meerdere varianten. Selecteer nu de optie die het beste aansluit bij
            jouw visie. Elke variant heeft zijn eigen unieke kenmerken, waardoor jij de stijl kunt kiezen die perfect
            past bij jouw merk.
          </p>
        </div>

        {/* Grid met 2 varianten */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {variants.map((variant) => (
            <ChoiceCard
              key={variant.id}
              label={variant.label}
              imageSrc={variant.imageSrc}
              alt={variant.alt}
              isSelected={selectedVariant === variant.id}
              onClick={() => handleChooseVariant(variant.id)}
            />
          ))}
        </div>


      </section>
    </SlideContainer>
  )
}
