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
  goToStep?: (stepId: string) => void
}

export default function Slide14({ formData, updateFormData, onBack, onNext, selectedVariant: globalSelectedVariant, onSelectionChange, goToStep }: Props) {
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

  const answers = [
    { text: 'Vlak ronding', nextSlide: 'slide17', dbValue: 'Modern 3.1', key: "1", label: "Vlak ronding", imageSrc: "/img/slide14/black.jpg", alt: "Modern 3 Variant 1 - Vlak ronding" },
    { text: 'Vlak vierkant', nextSlide: 'slide17', dbValue: 'Modern 3.2', key: "2", label: "Vlak vierkant", imageSrc: "/img/slide14/color.jpg", alt: "Modern 3 Variant 2 - Vlak vierkant" }
  ]

  const variants = answers.map(answer => ({
    key: answer.key,
    label: answer.label,
    imageSrc: answer.imageSrc,
    alt: answer.alt
  }))

  const handleAnswer = (answer: any) => {
    setLocalSelectedVariant(answer.key)
    onSelectionChange?.(answer.key)
    // Store database value in Template column
    updateFormData({ elegantStyle: answer.dbValue, styleVariant: answer.dbValue })

    try {
      localStorage.setItem("salonid:styleVariant", answer.dbValue)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // Could not save variant to localStorage, continue silently
    }
    
    // Navigate to specified slide
    if (goToStep) {
      queueMicrotask(() => {
        goToStep(answer.nextSlide)
      })
    }
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
