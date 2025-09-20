"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: () => void
}

export default function Slide17({ onBack, onNext }: Props) {
  const { formData, updateFormData } = useWizard()

  const handleChooseColor = (colorChoice: string) => {
    // Database column: 'Kleur/Zwart/Wit' - same as Slide16
    updateFormData({ kleurZwartWit: colorChoice })
    
    // Auto-continue with delay - let step registry handle conditional navigation
    queueMicrotask(() => {
      onNext()
    })
  }

  // Color options array with three options: Zwart, Kleur, and Wit
  const colorOptions = [
    {
      key: "Zwart",
      label: "Zwart",
      imageSrc: "/img/slide17/black.jpg",
      alt: "Black color scheme",
    },
    {
      key: "Kleur",
      label: "Kleur",
      imageSrc: "/img/slide17/color.jpg",
      alt: "Color scheme",
    },
    {
      key: "Wit", 
      label: "Wit",
      imageSrc: "/img/slide17/white.jpg",
      alt: "White color scheme",
    },
  ]

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kleurselectie</h2>

        <div className="max-w-[760px] space-y-6">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Maak je ontwerp persoonlijk door te kiezen tussen een zwart schema, levendige kleuren, of wit schema.
          </p>

          <div className="space-y-2">
            <div className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Zwart:</strong> Kies voor een krachtige en stijlvolle uitstraling met diepzwarte accenten. Perfect
              voor een moderne en strakke look.
            </div>
            <div className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Kleur:</strong> Voeg dynamiek toe met een volledig kleurenpalnet dat je ontwerp levendiger en 
              opvallender maakt.
            </div>
            <div className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Wit:</strong> Kies voor een frisse en verfijnde uitstraling met zuivere witte tinten. Deze optie
              straalt eenvoud en rust uit.
            </div>
          </div>
        </div>

        <ResponsiveCarousel
          items={colorOptions}
          selectedItem={formData.kleurZwartWit}
          onItemClick={handleChooseColor}
          columns={3}
        />

      </section>
    </SlideContainer>
  )
}