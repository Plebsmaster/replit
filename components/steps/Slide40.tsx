"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide40({ updateFormData, formData, onNext, onBack, goToStep }: StepProps) {
  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Slide 40 - Volgende Stap
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je No Yellow claims zijn succesvol geselecteerd! Deze slide kan verder worden uitgebreid 
            met aanvullende stappen voor de productconfiguratie.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Dit is momenteel een placeholder voor Slide 40. Hier kunnen verdere configuratiestappen 
            worden toegevoegd voor het No Yellow productassortiment.
          </p>
        </div>

        {/* Display selected claims for confirmation */}
        {formData.noYellowClaims && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Geselecteerde Claims:</h3>
            <div className="space-y-3">
              <div>
                <strong>No Yellow Shampoo:</strong>
                <p className="text-gray-700 ml-4">{formData.noYellowClaims.shampoo}</p>
              </div>
              <div>
                <strong>No Yellow Conditioner:</strong>
                <p className="text-gray-700 ml-4">{formData.noYellowClaims.conditioner}</p>
              </div>
            </div>
          </div>
        )}

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