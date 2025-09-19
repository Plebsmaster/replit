"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide55({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Met QR-Code - Configuratie
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Geweldige keuze! Een QR-code voegt een moderne, interactieve functie toe aan je verpakking 
            die klanten direct kan verbinden met je digitale aanwezigheid.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Met een QR-code kunnen klanten eenvoudig toegang krijgen tot productinformatie, tutorials, 
            sociale media pagina's of zelfs speciale aanbiedingen. Dit verhoogt de klantbetrokkenheid 
            en biedt extra waarde.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Je bent bijna klaar! In de volgende stap worden je keuzes samengevat en kun je je 
            productlijn met QR-code functionaliteit finaliseren.
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}