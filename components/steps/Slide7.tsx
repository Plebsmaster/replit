"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
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

  // Convert to ResponsiveCarousel format - only showing 2 main options
  const colorOptions = [
    {
      key: "Zwart",
      label: "Zwart",
      imageSrc: "/img/elegant3/black.jpg",
      alt: "Black color scheme",
    },
    {
      key: "Wit", 
      label: "Wit",
      imageSrc: "/img/elegant3/white.jpg",
      alt: "White color scheme",
    },
  ]

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kleurselectie</h2>

        <div className="max-w-[760px] space-y-6">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Maak je ontwerp persoonlijk door te kiezen tussen een zwart schema of wit schema.
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
          </div>
        </div>

        <ResponsiveCarousel
          items={colorOptions}
          selectedItem={formData.finalColorChoice}
          onItemClick={handleChooseColor}
          columns={2}
        />

      </section>
    </SlideContainer>
  )
}
