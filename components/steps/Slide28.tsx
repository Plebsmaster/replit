"use client"

import React from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

export default function Slide28({ formData }: Props) {
  return (
    <SlideContainer width="standard">
      <section>
        <div className="text-center space-y-8">
          {/* Title */}
          <h2 className={getTypographyClasses("title", { alignment: "center" })}>
            Slide 28 Placeholder
          </h2>

          {/* Content */}
          <div className="max-w-2xl mx-auto space-y-6">
            <p className={getTypographyClasses("subtitle", { alignment: "center" })}>
              Dit is een tijdelijke placeholder voor Slide 28
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-700">
                Deze slide kan later worden aangepast met de gewenste functionaliteit.
              </p>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Klik op "Doorgaan" om verder te gaan naar de volgende stap.
            </p>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}