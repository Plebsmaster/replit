"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  onBack: () => void
  onNext: () => void
}

export default function Slide5({ onBack, onNext }: Props) {
  const { formData, updateFormData } = useWizard()

  const handleChooseVariant = (variantNumber: string) => {
    const finalStyle = `${formData.style}${variantNumber}`
    updateFormData({ styleVariant: finalStyle })
    onNext()
  }

  const variants = [
    {
      id: "1",
      label: "Uitlijning links",
      imageSrc: "/img/elegant2/variant1.jpg",
      alt: "Variant 1 - Left alignment",
    },
    {
      id: "2",
      label: "Uitlijning midden",
      imageSrc: "/img/elegant2/variant2.jpg",
      alt: "Variant 2 - Center alignment",
    },
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {variants.map((variant) => (
            <ChoiceCard
              key={variant.id}
              label={variant.label}
              imageSrc={variant.imageSrc}
              alt={variant.alt}
              isSelected={formData.styleVariant === `${formData.style}${variant.id}`}
              onClick={() => handleChooseVariant(variant.id)}
            />
          ))}
        </div>

      </section>
    </SlideContainer>
  )
}
