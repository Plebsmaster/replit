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
    setTimeout(() => {
      onNext()
    }, 500) // Small delay to show selection feedback
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

        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <ChoiceCard
              key={colorOptions[0].id}
              label={colorOptions[0].label}
              imageSrc={colorOptions[0].imageSrc}
              alt={colorOptions[0].alt}
              isSelected={formData.finalColorChoice === colorOptions[0].label}
              onClick={() => handleChooseColor(colorOptions[0].label)}
            />
            <ChoiceCard
              key={colorOptions[1].id}
              label={colorOptions[1].label}
              imageSrc={colorOptions[1].imageSrc}
              alt={colorOptions[1].alt}
              isSelected={formData.finalColorChoice === colorOptions[1].label}
              onClick={() => handleChooseColor(colorOptions[1].label)}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <ChoiceCard
              key={colorOptions[2].id}
              label={colorOptions[2].label}
              imageSrc={colorOptions[2].imageSrc}
              alt={colorOptions[2].alt}
              isSelected={formData.finalColorChoice === colorOptions[2].label}
              onClick={() => handleChooseColor(colorOptions[2].label)}
            />
            <div></div> {/* Empty space to maintain L-shape */}
          </div>
        </div>

        {/* Debug info */}
        {formData.styleVariant && (
          <div className="mt-10 text-center text-xs opacity-60">Gekozen style: {formData.styleVariant}</div>
        )}
      </section>
    </SlideContainer>
  )
}
