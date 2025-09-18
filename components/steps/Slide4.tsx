"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: (selectedVariant?: string) => void
  selectedVariant?: string | null
  onSelectionChange?: (variant: string | null) => void
}

export default function Slide4({ onBack, onNext, selectedVariant: globalSelectedVariant, onSelectionChange }: Props) {
  const [localSelectedVariant, setLocalSelectedVariant] = useState<string | null>(globalSelectedVariant || null)
  const selectedVariant = globalSelectedVariant !== undefined ? globalSelectedVariant : localSelectedVariant

  const items = useMemo(
    () => [
      { key: "Variant 1", label: "Uitlijning links", src: "/img/elegant1/variant1.jpg" },
      { key: "Variant 2", label: "Uitlijning midden", src: "/img/elegant1/variant2.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string, label: string) => {
    setLocalSelectedVariant(key)
    onSelectionChange?.(key)

    queueMicrotask(() => {
      onNext(key)
    })
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item) => (
            <ChoiceCard
              key={item.key}
              label={item.label}
              imageSrc={item.src}
              alt={`${item.label} mockup`}
              isSelected={selectedVariant === item.key}
              onClick={() => handleChoose(item.key, item.label)}
            />
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}
