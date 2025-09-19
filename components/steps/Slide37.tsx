"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide37({ updateFormData, formData }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Styling Products Succesvol Geconfigureerd
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Uitstekend! Je hebt succesvol ingrediënten geselecteerd voor alle styling producten. 
            Deze selecties zijn opgeslagen en worden gebruikt voor de personalisering van jouw productlijn.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Je styling product ingrediënt selecties zijn compleet opgeslagen.
          </p>
        </div>

        {/* Display selected ingredients for confirmation */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geselecteerde Styling Product Ingrediënten:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Haarlak:</span>
              <span className="font-medium text-gray-900">
                {formData.stylingProductsIngredients?.haarlak || 'UV Filter'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mousse:</span>
              <span className="font-medium text-gray-900">
                {formData.stylingProductsIngredients?.mousse || 'Vitamine B5'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Droogshampoo:</span>
              <span className="font-medium text-gray-900">
                {formData.stylingProductsIngredients?.droogshampoo || 'Arganolie'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Gel:</span>
              <span className="font-medium text-gray-900">
                {formData.stylingProductsIngredients?.gel || 'Vitamine B5'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Clay Paste:</span>
              <span className="font-medium text-gray-900">
                {formData.stylingProductsIngredients?.clayPaste || 'Vitamine E'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Fiber Paste:</span>
              <span className="font-medium text-gray-900">
                {formData.stylingProductsIngredients?.fiberPaste || 'Vitamine E'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}