"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: () => void
  goToStep?: (stepId: string) => void
}

export default function Slide7({ onBack, onNext, goToStep }: Props) {
  const { formData, updateFormData } = useWizard()

  const answers = [
    { 
      text: "Zwart", 
      nextSlide: "slide9", 
      dbValue: "Zwart",
      key: "Zwart",
      label: "Zwart",
      imageSrc: "/img/slide7/black.jpg",
      alt: "Black color scheme",
    },
    { 
      text: "Kleur", 
      nextSlide: "slide8", 
      dbValue: "Kleur",
      key: "Kleur",
      label: "Kleur",
      imageSrc: "/img/slide7/color.jpg",
      alt: "Color scheme",
    },
    { 
      text: "Wit", 
      nextSlide: "slide9", 
      dbValue: "Wit",
      key: "Wit", 
      label: "Wit",
      imageSrc: "/img/slide7/white.jpg",
      alt: "White color scheme",
    }
  ]

  const handleAnswer = (answer: any) => {
    // Store database value in 'Kleur/Zwart/Wit' column
    updateFormData({ finalColorChoice: answer.dbValue })

    // Navigate to the specified slide
    if (goToStep) {
      queueMicrotask(() => {
        goToStep(answer.nextSlide)
      })
    }
  }

  const colorOptions = answers.map(answer => ({
    key: answer.key,
    label: answer.label,
    imageSrc: answer.imageSrc,
    alt: answer.alt
  }))

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
          onItemClick={(key) => {
            const answer = answers.find(a => a.key === key)
            if (answer) handleAnswer(answer)
          }}
          columns={3}
        />

      </section>
    </SlideContainer>
  )
}
