"use client"
import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { getTypographyClasses } from "@/lib/typography"
import type { FormData } from "@/lib/form/schema"

type Props = {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function StyleSelectionStep({ formData, updateFormData, onNext, onBack }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<"elegant" | "modern" | null>(null)

  const handleStyleChoice = (style: "elegant" | "modern") => {
    console.log("[v0] Style selected:", style)
    setSelectedStyle(style)
    // First update the form data with the selected style
    updateFormData({ style })
    
    // Auto-progress using microtask to allow state updates to complete
    queueMicrotask(() => {
      onNext()
    })
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChoiceCard
            label="Elegant"
            imageSrc="/elegant-cosmetic-product-mockup.jpg"
            alt="Elegant mockup"
            isSelected={selectedStyle === "elegant"}
            onClick={() => handleStyleChoice("elegant")}
          />
          <ChoiceCard
            label="Modern"
            imageSrc="/modern-cosmetic-product-mockup.jpg"
            alt="Modern mockup"
            isSelected={selectedStyle === "modern"}
            onClick={() => handleStyleChoice("modern")}
          />
        </div>
      </section>
    </SlideContainer>
  )
}
