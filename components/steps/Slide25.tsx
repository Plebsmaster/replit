"use client"

import React from "react"
import { CheckCircle } from "lucide-react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

export default function Slide25({ formData }: Props) {
  return (
    <SlideContainer width="standard">
      <section>
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className={getTypographyClasses("title", { alignment: "center" })}>
            Color Productnamen Geselecteerd
          </h2>

          {/* Confirmation message */}
          <div className="max-w-2xl mx-auto space-y-6">
            <p className={getTypographyClasses("subtitle", { alignment: "center" })}>
              Je hebt je Color productnamen succesvol gekozen
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-green-800">Color Shampoo:</span>
                  <p className="text-green-700">{formData.naamColorShampoo || "Geen selectie"}</p>
                </div>
                <div>
                  <span className="font-semibold text-green-800">Color Conditioner:</span>
                  <p className="text-green-700">{formData.naamColorConditioner || "Geen selectie"}</p>
                </div>
                <div>
                  <span className="font-semibold text-green-800">Color Mask:</span>
                  <p className="text-green-700">{formData.naamColorMask || "Geen selectie"}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Klik op "Doorgaan" om verder te gaan naar de ingrediënten selectie.
            </p>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}