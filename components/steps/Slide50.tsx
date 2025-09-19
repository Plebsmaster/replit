"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide50({ formData, updateFormData, onNext, onBack, goToStep }: StepProps) {
  const [selectedChoice, setSelectedChoice] = useState<"met-qr" | "zonder-qr" | null>(null)

  const handleQRChoice = (choice: "met-qr" | "zonder-qr") => {
    setSelectedChoice(choice)
    
    // ATOMIC NAVIGATION: Navigate directly to correct step based on choice
    // No database storage needed for this slide
    const targetStep = choice === "met-qr" ? "slide55" : "slide51"
    goToStep(targetStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>QR-Code keuze</h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Wil je een QR-code op je verpakking? Een QR-code kan klanten direct naar je website, 
              sociale media of productinformatie leiden.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Met QR-Code:</strong> Voeg een moderne, interactieve functie toe aan je verpakking 
              voor extra klantbetrokkenheid.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Zonder QR-Code:</strong> Houd een clean, minimalistische uitstraling met focus 
              op het design en de productnaam.
            </p>
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              Klik op <strong>Met QR-Code</strong> of <strong>Zonder QR-Code</strong> om je keuze te maken.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={[
            { key: "met-qr", label: "Met QR-Code", imageSrc: "/img/slide19/icon-with.png" },
            { key: "zonder-qr", label: "Zonder QR-Code", imageSrc: "/img/slide19/icon-without.png" }
          ]}
          selectedItem={selectedChoice}
          onItemClick={(choice) => handleQRChoice(choice as "met-qr" | "zonder-qr")}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}