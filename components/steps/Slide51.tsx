"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide51({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Zonder QR-Code - Finalisatie
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt ervoor gekozen om geen QR-code toe te voegen aan je verpakking. Dit zorgt voor 
            een clean en minimalistische uitstraling waar de focus volledig ligt op je productdesign.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Zonder QR-code behoud je een tijdloze uitstraling die niet afhankelijk is van digitale trends. 
            Je verpakking spreekt voor zichzelf door de kwaliteit van het design en de productnaam.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Je bent bijna klaar! In de volgende stap worden je keuzes samengevat en kun je je 
            productlijn finaliseren.
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}