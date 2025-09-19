"use client"

import React from "react"
import { Edit3, Info } from "lucide-react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

export default function Slide22({ updateFormData }: Props) {
  return (
    <SlideContainer width="standard">
      <section>
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Edit3 className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className={getTypographyClasses("title", { alignment: "center" })}>
            Custom Product Namen
          </h2>

          {/* Main message */}
          <div className="max-w-2xl mx-auto space-y-6">
            <p className={getTypographyClasses("subtitle", { alignment: "center" })}>
              Binnenkort kun je hier zelf je productnamen bepalen
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Info className="w-5 h-5" />
                <span className="font-semibold">Functionaliteit in ontwikkeling</span>
              </div>
              
              <p className={getTypographyClasses("paragraph", { alignment: "center", color: "text-blue-700" })}>
                We werken hard aan een functie waarmee je volledig zelf je productnamen kunt bepalen. 
                Deze mogelijkheid wordt binnenkort beschikbaar gesteld.
              </p>
              
              <p className={getTypographyClasses("paragraph", { alignment: "center", color: "text-blue-700" })}>
                Voor nu adviseren we je om de aanbevolen namen van SalonID te gebruiken, 
                gebaseerd op ons uitgebreide onderzoek naar effectieve productbenamingen.
              </p>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Klik op "Doorgaan" om verder te gaan met de volgende stap.
            </p>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}