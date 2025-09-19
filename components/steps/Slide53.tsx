"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide53({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Logo Gekozen
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt ervoor gekozen om een logo op je productverpakking te gebruiken. 
            Dit geeft je merk een moderne en visueel aantrekkelijke uitstraling.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Een logo kan krachtige emoties oproepen en is gemakkelijk herkenbaar, zelfs op afstand. 
            Het maakt je verpakking uniek en onderscheidend in de markt. Perfect voor het creëren 
            van een sterke visuele merkidentiteit.
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