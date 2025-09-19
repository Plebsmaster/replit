"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide35({ updateFormData, formData }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Volgende Stap
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Dit is een placeholder voor Slide35. Deze stap zal later worden geïmplementeerd op basis van toekomstige vereisten.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Je Mannen Shampoo ingrediënt selectie is succesvol opgeslagen.
          </p>
        </div>

        {/* Display selected ingredient for confirmation */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geselecteerd Mannen Shampoo Ingrediënt:</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Mannen Shampoo:</span>
            <span className="font-medium text-gray-900">
              {formData.mannenShampooIngredient || 'Vitamine B5'}
            </span>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}