"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide54({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Merknaam Voltooid
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Perfect! Je merknaam is vastgelegd en zal zichtbaar worden op al je 
            productverpakkingen. Dit zorgt voor consistente merkherkenning en 
            professionele uitstraling.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je bent nu bijna klaar met het samenstellen van je unieke productlijn. 
            In de volgende stap kun je een overzicht bekijken van al je keuzes 
            en je design finaliseren.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Klik op 'Doorgaan' om naar de finale stap te gaan waar je je complete 
            design en productspecificaties kunt reviewen.
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}