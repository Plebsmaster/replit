"use client"
import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { FormData } from "@/lib/form/schema"

type Props = {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
  goToStep: (stepId: string) => void
}

export default function StyleSelectionStep({ formData, updateFormData, onNext, onBack, goToStep }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<"elegant" | "modern" | null>(formData.style || null)

  const handleStyleChoice = (style: "elegant" | "modern") => {
    setSelectedStyle(style)
    
    // ATOMIC NAVIGATION: Update form data first, then navigate directly to correct step
    updateFormData({ style })
    
    // Navigate directly to the appropriate step based on choice
    const targetStep = style === "elegant" ? "elegant-styles" : "modern-styles"
    goToStep(targetStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>Bepaal je stijl: elegant of modern</h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Nu is het tijd om de uitstraling van je productlijn te bepalen. Om je te inspireren, bieden we twee
              stijlen met ieder hun eigen unieke charme:
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Elegant:</strong> Klassieke, verfijnde uitstraling met sierlijke letters en een stijlvol design.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <strong>Modern:</strong> Strakke, eigentijdse look met rechte letters en een clean design.
            </p>
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              Klik op <strong>Elegant</strong> of <strong>Modern</strong> om je keuze te maken.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={[
            { key: "elegant", label: "Elegant", imageSrc: "/elegant-cosmetic-product-mockup.jpg" },
            { key: "modern", label: "Modern", imageSrc: "/modern-cosmetic-product-mockup.jpg" }
          ]}
          selectedItem={selectedStyle}
          onItemClick={(style) => handleStyleChoice(style as "elegant" | "modern")}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}
