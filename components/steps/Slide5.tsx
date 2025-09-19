"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: () => void
  goToStep?: (stepId: string) => void
  updateFormData?: (data: any) => void
}

export default function Slide5({ onBack, onNext, goToStep, updateFormData: propUpdateFormData }: Props) {
  const { formData, updateFormData } = useWizard()

  const answers = [
    { 
      text: "Uitlijning links", 
      nextSlide: "color-scheme", 
      dbValue: "Elegant 2.1",
      key: "1",
      label: "Uitlijning links",
      imageSrc: "/img/slide5/variant1.jpg",
    },
    { 
      text: "Uitlijning midden", 
      nextSlide: "color-scheme", 
      dbValue: "Elegant 2.2",
      key: "2", 
      label: "Uitlijning midden",
      imageSrc: "/img/slide5/variant2.jpg",
    }
  ]

  const handleAnswer = (answer: any) => {
    // Store database value in Template column
    updateFormData({ elegantStyle: answer.dbValue })

    // Navigate to the specified slide
    if (goToStep) {
      goToStep(answer.nextSlide)
    }
  }

  const variants = answers.map(answer => ({
    key: answer.key,
    label: answer.label,
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
          items={variants}
          selectedItem={formData.styleVariant?.endsWith('1') ? '1' : formData.styleVariant?.endsWith('2') ? '2' : null}
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
