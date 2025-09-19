"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide49({ formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Met Slogan - Volgende Stappen
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt ervoor gekozen om een slogan toe te voegen aan je productlijn. Dit is een uitstekende 
            keuze voor merkherkenning en klantbinding.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Een effectieve slogan kan je merk versterken en klanten helpen je producten te onthouden. 
            In de volgende stappen zullen we samen de perfecte slogan ontwikkelen.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Dit is een placeholder voor Slide 49. Hier komen de slogan-gerelateerde configuraties.
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