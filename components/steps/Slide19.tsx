"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"

interface Slide19Props {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
}

export default function Slide19({ formData, updateFormData, onBack, onNext }: Slide19Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(formData.icoonJaNee || null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    updateFormData({ icoonJaNee: option })
    try {
      localStorage.setItem("salonid:icoonJaNee", option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    
    // Auto-continue with queueMicrotask like other slides
    queueMicrotask(() => {
      onNext()
    })
  }

  const iconOptions = [
    {
      key: "met-icoon",
      label: "Met Icoon",
      imageSrc: "/img/slide19/icon-with.png",
      alt: "Met icoon",
    },
    {
      key: "zonder-icoon", 
      label: "Zonder Icoon",
      imageSrc: "/img/slide19/icon-without.png",
      alt: "Zonder icoon",
    },
  ]

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
          onItemClick={handleOptionSelect}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}