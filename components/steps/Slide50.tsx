"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide50({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Zonder Slogan - Volgende Stappen
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt ervoor gekozen om geen slogan toe te voegen aan je productlijn. Dit is een 
            uitstekende keuze voor een clean en minimalistische uitstraling.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Zonder slogan ligt de focus volledig op de kwaliteit en naam van je producten. 
            Dit kan een krachtige benadering zijn die elegantie en eenvoud uitstraalt.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Dit is een placeholder voor Slide 50. Hier komen de configuraties voor producten zonder slogan.
          </p>
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Terug
          </button>
          <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Doorgaan
          </button>
        </div>
      </section>
    </SlideContainer>
  )
}