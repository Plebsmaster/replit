"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"

interface Slide9Props {
  onBack: () => void
  onNext: () => void
}

export default function Slide9({ onBack, onNext }: Slide9Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    try {
      localStorage.setItem("salonid:iconChoice", option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    // Direct doorgaan naar volgende stap zoals in Slide2
    onNext()
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
          <ChoiceCard
            label="Met Icoon"
            imageSrc="/icon-with.png"
            alt="Met icoon"
            isSelected={selectedOption === "with-icon"}
            onClick={() => handleOptionSelect("with-icon")}
          />
          <ChoiceCard
            label="Zonder Icoon"
            imageSrc="/icon-without.png"
            alt="Zonder icoon"
            isSelected={selectedOption === "without-icon"}
            onClick={() => handleOptionSelect("without-icon")}
          />
        </div>
      </section>
    </SlideContainer>
  )
}
