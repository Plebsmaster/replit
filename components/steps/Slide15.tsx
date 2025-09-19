"use client"

import { useEffect, useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

type Props = {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
  selectedVariant?: string | null
  onSelectionChange?: (variant: string | null) => void
}

export default function Slide15({ formData, updateFormData, onBack, onNext, selectedVariant: globalSelectedVariant, onSelectionChange }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [localSelectedVariant, setLocalSelectedVariant] = useState<string | null>(formData.styleVariant || globalSelectedVariant || null)
  
  const selectedVariant = globalSelectedVariant !== undefined ? globalSelectedVariant : localSelectedVariant

  useEffect(() => {
    try {
      const style = localStorage.getItem("salonid:styleChoice") || ""
      setSelectedStyle(style)
      
    } catch (error) {
      // Could not load from localStorage, continue silently
    }
  }, [selectedVariant])

  const variants = [
    {
      key: "1",
      label: "Uitlijning links",
      imageSrc: "/img/variants/variant1.jpg",
      alt: "Modern 6 Variant 1 - Left alignment",
    },
    {
      key: "2",
      label: "Uitlijning midden",
      imageSrc: "/img/variants/variant2.jpg",
      alt: "Modern 6 Variant 2 - Center alignment",
    },
  ]

  const handleChooseVariant = (variantNumber: string) => {
    setLocalSelectedVariant(variantNumber)
    onSelectionChange?.(variantNumber)
    updateFormData({ styleVariant: `${selectedStyle}${variantNumber}` })

    try {
      const finalStyle = `${selectedStyle}${variantNumber}`
      localStorage.setItem("salonid:styleVariant", finalStyle)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // Could not save variant to localStorage, continue silently
    }
    
    queueMicrotask(() => {
      onNext()
    })
  }


  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Selecteer jouw specifieke variant</h2>

        {/* Intro copy */}
        <div className="max-w-[760px] space-y-4 mb-10">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt gekozen voor een ontwerp met meerdere varianten. Selecteer nu de optie die het beste aansluit bij
            jouw visie. Elke variant heeft zijn eigen unieke kenmerken, waardoor jij de stijl kunt kiezen die perfect
            past bij jouw merk.
          </p>
        </div>

        {/* Responsive Carousel met 2 varianten */}
        <ResponsiveCarousel
          items={variants}
          selectedItem={selectedVariant}
          onItemClick={handleChooseVariant}
          columns={2}
        />


      </section>
    </SlideContainer>
  )
}
