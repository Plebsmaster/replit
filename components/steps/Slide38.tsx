"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide38({ updateFormData, formData, onNext, onBack, goToStep }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Placeholder - Slide 38
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Dit is een placeholder voor Slide 38 - Met claim pad.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Deze slide wordt nog verder ontwikkeld.
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