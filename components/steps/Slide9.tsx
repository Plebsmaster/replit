"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import ChoiceCard from "./ChoiceCard" // Assuming ChoiceCard is in the same directory

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
      console.log("localStorage not available")
    }
    // Direct doorgaan naar volgende stap zoals in Slide2
    onNext()
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "10px 0 10px" }}>Wil je een icoon op de verpakking?</h2>

        <div style={{ maxWidth: 760 }}>
          <p>
            We bieden de mogelijkheid om een icoon toe te voegen aan je verpakkingsontwerp. Een icoon kan je merk
            visueel versterken en een extra dimensie toevoegen aan het design.
          </p>
          <p>Het kan helpen om specifieke productkenmerken te benadrukken of gewoon een stijlvolle aanvulling zijn.</p>
          <p>
            <strong>Voordeel:</strong> Versterkt de visuele identiteit van je merk.
          </p>
          <p>
            <strong>Nadeel:</strong> Een minimalistische uitstraling gaat mogelijk verloren.
          </p>
          <p style={{ opacity: 0.85 }}>
            Klik op <strong>Met Icoon</strong> of <strong>Zonder Icoon</strong> om direct door te gaan.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
            marginTop: 18,
            alignItems: "start",
          }}
        >
          <ChoiceCard label="Met Icoon" imgSrc="/icon-with.png" onChoose={() => handleOptionSelect("with-icon")} />
          <ChoiceCard
            label="Zonder Icoon"
            imgSrc="/icon-without.png"
            onChoose={() => handleOptionSelect("without-icon")}
          />
        </div>
      </section>
    </SlideContainer>
  )
}
