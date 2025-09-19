"use client"
import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide48({ formData, onBack, goToStep }: StepProps) {
  const [selectedSlogan, setSelectedSlogan] = useState<"met-slogan" | "zonder-slogan" | null>(null)

  const handleSloganChoice = (choice: "met-slogan" | "zonder-slogan") => {
    setSelectedSlogan(choice)
    
    // Direct navigation based on choice - no database storage needed
    const targetStep = choice === "met-slogan" ? "slide49" : "slide50"
    goToStep(targetStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>
            Kies je aanpak: met of zonder slogan
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Een slogan kan een krachtig hulpmiddel zijn voor je productlijn. Het helpt klanten om je merk
              te onthouden en kan je producten onderscheiden van de concurrentie.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Met slogan:</strong> Voeg een herkenbare tagline toe die je merkidentiteit versterkt en
              klanten helpt je producten te herinneren.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Zonder slogan:</strong> Houd het simpel en focus volledig op de productnaam en
              kwaliteit zonder extra tekst.
            </p>
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              Klik op <strong>Met slogan</strong> of <strong>Zonder slogan</strong> om je keuze te maken.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={[
            { 
              key: "met-slogan", 
              label: "Met slogan", 
              imageSrc: "/img/slide19/icon-with.png"
            },
            { 
              key: "zonder-slogan", 
              label: "Zonder slogan", 
              imageSrc: "/img/slide19/icon-without.png"
            }
          ]}
          selectedItem={selectedSlogan}
          onItemClick={(choice) => handleSloganChoice(choice as "met-slogan" | "zonder-slogan")}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}