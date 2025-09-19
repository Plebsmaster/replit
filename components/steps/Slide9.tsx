"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

interface Slide9Props {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
  goToStep?: (stepId: string) => void
}

export default function Slide9({ formData, updateFormData, onBack, onNext, goToStep }: Slide9Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(formData.iconChoice || null)

  const answers = [
    { 
      text: 'Met icoon', 
      nextSlide: 'slide10', 
      dbValue: 'Met icoon',
      key: "with-icon",
      label: "Met Icoon",
      imageSrc: "/img/slide9/icon-with.png",
      alt: "Met icoon",
    },
    { 
      text: 'Zonder icoon', 
      nextSlide: 'slide21', 
      dbValue: 'Zonder icoon',
      key: "without-icon", 
      label: "Zonder Icoon",
      imageSrc: "/img/slide9/icon-without.png",
      alt: "Zonder icoon",
    }
  ]

  const handleAnswer = (answer: any) => {
    setSelectedOption(answer.key)
    // Store database value in 'Icoon ja/nee' column
    updateFormData({ iconChoice: answer.dbValue, selectedIcon: answer.key === 'with-icon' })
    
    try {
      localStorage.setItem("salonid:iconChoice", answer.key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    
    // Navigate to specified slide
    if (goToStep) {
      goToStep(answer.nextSlide)
    }
  }

  const iconOptions = answers.map(answer => ({
    key: answer.key,
    label: answer.label,
    imageSrc: answer.imageSrc,
    alt: answer.alt
  }))

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Wil je een icoon op de verpakking?</h2>

        <div className="max-w-[760px] space-y-4">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            We bieden de mogelijkheid om een icoon toe te voegen aan je verpakkingsontwerp. Een icoon kan je merk
            visueel versterken en een extra dimensie toevoegen aan het design.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Het kan helpen om specifieke productkenmerken te benadrukken of gewoon een stijlvolle aanvulling zijn.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            <strong>Voordeel:</strong> Versterkt de visuele identiteit van je merk.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            <strong>Nadeel:</strong> Een minimalistische uitstraling gaat mogelijk verloren.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Klik op <strong>Met Icoon</strong> of <strong>Zonder Icoon</strong> om direct door te gaan.
          </p>
        </div>

        <ResponsiveCarousel
          items={iconOptions}
          selectedItem={selectedOption}
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
