"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide42({ updateFormData, formData, onNext, onBack }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Volgende Stap
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je Color claims zijn succesvol geselecteerd! Deze slide kan verder worden uitgebreid 
            met aanvullende stappen voor de productconfiguratie.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Dit is momenteel een placeholder voor Slide 42. Hier kunnen verdere configuratiestappen 
            worden toegevoegd voor het Color productassortiment.
          </p>
        </div>

        {/* Display selected claims for confirmation */}
        {formData.colorClaims && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Geselecteerde Color Claims:</h3>
            <div className="space-y-3">
              <div>
                <strong>Color Shampoo:</strong>
                <p className="text-gray-700 ml-4">{formData.colorClaims.shampoo}</p>
              </div>
              <div>
                <strong>Color Conditioner:</strong>
                <p className="text-gray-700 ml-4">{formData.colorClaims.conditioner}</p>
              </div>
              <div>
                <strong>Color Mask:</strong>
                <p className="text-gray-700 ml-4">{formData.colorClaims.mask}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Terug
          </button>
          <button
            onClick={onNext}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Doorgaan
          </button>
        </div>
      </section>
    </SlideContainer>
  )
}