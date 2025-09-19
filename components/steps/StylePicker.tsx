"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function StylePicker({ formData, updateFormData, goToStep }: StepProps) {
  const [selectedStyle, setSelectedStyle] = useState<"elegant" | "modern" | null>(
    formData.elegantStyle ? "elegant" : formData.modernStyle ? "modern" : null
  )

  const handleStyleChoice = (style: "elegant" | "modern") => {
    setSelectedStyle(style)
    updateFormData({ 
      style
    })
    
    // Navigate directly to the appropriate variant selection step
    const targetStep = style === "elegant" ? "slide4" : "slide12"
    goToStep(targetStep)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>
            Kies je template: Elegant of Modern
          </h2>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies het template dat het beste past bij jouw salonvisie.
          </p>
        </div>

        <ResponsiveCarousel
          items={[
            { key: "elegant", label: "Elegant", imageSrc: "/img/slide3/elegant-template.jpg" },
            { key: "modern", label: "Modern", imageSrc: "/img/slide11/modern-template.jpg" }
          ]}
          selectedItem={selectedStyle}
          onItemClick={(style) => handleStyleChoice(style as "elegant" | "modern")}
          columns={2}
        />
      </section>
    </SlideContainer>
  )
}