"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: () => void
}

export default function Slide7({ onBack, onNext }: Props) {
  const { formData, updateFormData } = useWizard()

  const handleChooseColor = (colorChoice: string) => {
    updateFormData({ finalColorChoice: colorChoice })
    queueMicrotask(() => {
      onNext()
    })
  }

  const colorOptions = [
    {
      id: "black",
      label: "Zwart",
      imageSrc: "/img/elegant3/black.jpg",
      alt: "Black color scheme",
    },
    {
      id: "white",
      label: "Wit",
      imageSrc: "/img/elegant3/white.jpg",
      alt: "White color scheme",
    },
    {
      id: "color",
      label: "Kleur",
      imageSrc: "/img/elegant3/color.jpg",
      alt: "Color scheme",
    },
  ]

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kleurselectie</h2>

        <div className="max-w-[760px] space-y-6">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Maak je ontwerp persoonlijk door te kiezen tussen een zwart schema, wit schema of levendige kleuren.
          </p>

          <div className="space-y-2">
            <div className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Zwart:</strong> Kies voor een krachtige en stijlvolle uitstraling met diepzwarte accenten. Perfect
              voor een moderne en strakke look.
            </div>
            <div className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Wit:</strong> Kies voor een frisse en verfijnde uitstraling met zuivere witte tinten. Deze optie
              straalt eenvoud en rust uit.
            </div>
            <div className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Kleur:</strong> Voeg dynamiek toe met een volledig kleurenpallet dat je ontwerp levendiger en
              opvallender maakt.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {colorOptions.map((option) => (
            <ChoiceCard
              key={option.id}
              label={option.label}
              imageSrc={option.imageSrc}
              alt={option.alt}
              isSelected={formData.finalColorChoice === option.label}
              onClick={() => handleChooseColor(option.label)}
            />
          ))}
        </div>

      </section>
    </SlideContainer>
  )
}
