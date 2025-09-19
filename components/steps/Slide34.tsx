"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide34({ updateFormData, formData }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Next Step - Placeholder
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            This is a placeholder for Slide34. This step will be implemented based on future requirements.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Your Curly Girl ingredient selections have been saved successfully.
          </p>
        </div>

        {/* Display selected ingredients for confirmation */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Curly Girl Ingredients:</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Curly Girl Shampoo:</span>
              <span className="font-medium text-gray-900">
                {formData.curlyGirlIngredients?.shampoo || 'Hyaluronzuur'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Curly Girl Conditioner:</span>
              <span className="font-medium text-gray-900">
                {formData.curlyGirlIngredients?.conditioner || 'Vitamine E'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Curly Girl Mask:</span>
              <span className="font-medium text-gray-900">
                {formData.curlyGirlIngredients?.mask || 'Vitamine E'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}