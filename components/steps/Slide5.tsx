"use client"

import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
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
      key: "1",
      label: "Uitlijning links",
      imageSrc: "/img/elegant2/variant1.jpg",
    },
    {
      key: "2",
      label: "Uitlijning midden",
      imageSrc: "/img/elegant2/variant2.jpg",
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

        <ResponsiveCarousel
          items={variants}
          selectedItem={formData.styleVariant?.endsWith('1') ? '1' : formData.styleVariant?.endsWith('2') ? '2' : null}
          onItemClick={handleChooseVariant}
          columns={2}
        />

      </section>
    </SlideContainer>
  )
}
