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

export default function Slide6({ onBack, onNext, goToStep }: Props) {
  const { formData, updateFormData } = useWizard()

  const answers = [
    { 
      text: "Zwart", 
      nextSlide: "icon-choice", 
      dbValue: "Zwart",
      key: "Zwart",
      label: "Zwart",
      imageSrc: "/img/slide6/black.jpg",
    },
    { 
      text: "Kleur", 
      nextSlide: "color-palette", 
      dbValue: "Kleur",
      key: "Kleur",
      label: "Kleur",
      imageSrc: "/img/slide6/color.jpg",
    }
  ]

  const handleAnswer = (answer: any) => {
    // Store database value in 'Kleur/Zwart/Wit' column
    updateFormData({ colorScheme: answer.dbValue })

    // Navigate to the specified slide
    if (goToStep) {
      goToStep(answer.nextSlide)
    }
  }

  const colorOptions = answers.map(answer => ({
    key: answer.key,
    label: answer.label,
    imageSrc: answer.imageSrc
  }))

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Let op!</h2>

        <div className="max-w-[760px] space-y-4">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Vanaf dit punt gebruiken we een representatieve afbeelding die kan afwijken van je uiteindelijke ontwerp. Om
            alle ontwerpen te bekijken bezoek je deze pagina{" "}
            <a href="#" className="text-black underline">
              [Ontwerpen Bekijken]
            </a>
            .
          </p>

          <div className="mb-4">
            <h3 className={getTypographyClasses("subtitle", { alignment: "left" })}>
              Wat is een representatieve afbeelding?
            </h3>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Dit is een visual die een indruk geeft van hoe het eindproduct eruit zou kunnen zien, maar het is niet het
              definitieve ontwerp. De afbeelding ondersteunt je bij het visualiseren van je designkeuzes en maakt het
              selectieproces eenvoudiger.
            </p>
          </div>

          <div className="mb-6">
            <h3 className={getTypographyClasses("subtitle", { alignment: "left" })}>Kleurselectie</h3>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Maak je ontwerp persoonlijk door te kiezen tussen een zwart schema of levendige kleuren.
            </p>

            <div className="space-y-2">
              <div>
                <strong className={`${getTypographyClasses("paragraph", { alignment: "left" })} font-semibold`}>
                  Zwart:
                </strong>
                <span className={`${getTypographyClasses("paragraph", { alignment: "left" })} ml-1`}>
                  Kies voor een krachtige en stijlvolle uitstraling met diepzwarte accenten. Perfect voor een moderne en
                  strakke look.
                </span>
              </div>

              <div>
                <strong className={`${getTypographyClasses("paragraph", { alignment: "left" })} font-semibold`}>
                  Kleur:
                </strong>
                <span className={`${getTypographyClasses("paragraph", { alignment: "left" })} ml-1`}>
                  Voeg dynamiek toe met een volledig kleurenpalnet dat je ontwerp levendiger en opvallender maakt.
                </span>
              </div>
            </div>
          </div>
        </div>

        <ResponsiveCarousel
          items={colorOptions}
          selectedItem={formData.colorScheme}
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
