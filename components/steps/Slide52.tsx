"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide52({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Merknaam Gekozen
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt ervoor gekozen om je volledige merknaam op je productverpakking te plaatsen. 
            Dit zorgt voor maximale herkenning en duidelijkheid voor je klanten.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Door je merknaam volledig uit te schrijven, creëer je een professionele en betrouwbare 
            uitstraling die direct communiceert wat je merk inhoudt. Dit is perfect voor het opbouwen 
            van merkbekendheid en vertrouwen bij je klanten.
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