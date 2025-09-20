"use client"
import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide37({ formData, updateFormData, onNext, onBack, goToStep }: StepProps) {
  const [selectedClaim, setSelectedClaim] = useState<"met-claim" | "zonder-claim" | null>(
    formData.metZonderClaim || null
  )

  const handleClaimChoice = (choice: "met-claim" | "zonder-claim") => {
    setSelectedClaim(choice)
    
    // ATOMIC NAVIGATION: Update form data first, then navigate directly to correct step
    updateFormData({ metZonderClaim: choice })
    
    // Navigate directly to the appropriate step based on choice
    const targetStep = choice === "met-claim" ? "slide38" : "slide46"
    goToStep(targetStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>
            Kies jouw claim voorkeur
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Nu is het tijd om te bepalen hoe je jouw productlijn wilt positioneren. Je kunt kiezen voor 
              producten met specifieke claims of juist voor producten zonder uitgesproken claims.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Met claim:</strong> Producten met duidelijke beloftes en specifieke voordelen die 
              worden gecommuniceerd naar je klanten.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Zonder claim:</strong> Neutrale producten zonder specifieke beloftes, gericht op 
              basis haarverzorging en styling.
            </p>
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              Klik op <strong>Met claim</strong> of <strong>Zonder claim</strong> om je keuze te maken.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={[
            { 
              key: "met-claim", 
              label: "Met claim", 
              imageSrc: "/icon-with.png" 
            },
            { 
              key: "zonder-claim", 
              label: "Zonder claim", 
              imageSrc: "/icon-without.png" 
            }
          ]}
          selectedItem={selectedClaim}
          onItemClick={(choice) => handleClaimChoice(choice as "met-claim" | "zonder-claim")}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}