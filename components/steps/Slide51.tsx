"use client"
import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide51({ formData, updateFormData, goToStep }: StepProps) {
  const [selectedChoice, setSelectedChoice] = useState<"logo" | "merknaam" | null>(formData.logoOfMerknaam || null)

  const handleChoice = (choice: "logo" | "merknaam") => {
    setSelectedChoice(choice)
    
    // ATOMIC NAVIGATION: Update form data first, then navigate directly to correct step
    updateFormData({ logoOfMerknaam: choice })
    
    // Navigate directly to the appropriate step based on choice
    const targetStep = choice === "merknaam" ? "slide52" : "slide53"
    goToStep(targetStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kies je merkidentiteit</h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Nu is het tijd om te bepalen hoe je merk zich presenteert op je productverpakking. Je kunt 
              kiezen tussen het uitschrijven van je merknaam of het gebruik van een logo.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Merknaam:</strong> Volledige uitgeschreven merknaam voor duidelijke herkenning en professionaliteit.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Logo:</strong> Grafisch symbool of icoon dat je merk vertegenwoordigt voor een moderne uitstraling.
            </p>
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              Klik op <strong>Merknaam</strong> of <strong>Logo</strong> om je keuze te maken.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={[
            { key: "merknaam", label: "Merknaam", imageSrc: "/img/slide2/elegant-cosmetic-product-mockup.jpg" },
            { key: "logo", label: "Logo", imageSrc: "/img/slide2/modern-cosmetic-product-mockup.jpg" }
          ]}
          selectedItem={selectedChoice}
          onItemClick={(choice) => handleChoice(choice as "logo" | "merknaam")}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}