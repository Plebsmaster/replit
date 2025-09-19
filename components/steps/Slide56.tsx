"use client"

import { useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide56({ updateFormData }: StepProps) {
  useEffect(() => {
    const ts = new Date().toISOString()

    // Persist completion in global form state
    updateFormData({
      processCompleted: true,
      processCompletedAt: ts,
    })

    // Keep your localStorage behavior
    try {
      localStorage.setItem("salonid:processCompleted", "true")
      localStorage.setItem("salonid:dateISO", ts)
    } catch {}
  }, [updateFormData])

  return (
    <SlideContainer width="wide">
      <section>
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">🎉</div>
          </div>

          <h1 className={getTypographyClasses("title", { alignment: "center" })}>
            Wij gaan voor je aan de slag!
          </h1>
        </div>

        <div className="max-w-[700px] mx-auto space-y-6 text-left">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Bedankt voor het invullen van de questionnaire!
            </h3>
          </div>

          <div className="space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              We gaan zo snel mogelijk met deze gegevens aan de slag. Wat kun je in de tussentijd van ons
              verwachten?
            </p>

            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Zodra de ontwerper de gegevens heeft ontvangen zal hij hiermee aan de slag gaan. Het kan zijn dat
              er nog vragen zijn, er wordt dan contact met je opgenomen.
            </p>

            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Wanneer de ontwerper klaar is met het designen van jouw eigen productlijn wordt er ook contact
              opgenomen voor akkoord.
            </p>

            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              <span className="font-semibold">Als alles klaar is zal de bestelling zo snel mogelijk worden verzonden!</span>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Wat gebeurt er nu?</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Je ontwerp wordt binnen 2-3 werkdagen klaargemaakt</li>
                  <li>• We nemen contact op voor eventuele vragen of goedkeuring</li>
                  <li>• Na goedkeuring starten we met de productie</li>
                  <li>• Je bestelling wordt zo snel mogelijk verzonden</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <p className="text-amber-800 text-sm">
              <span className="font-semibold">Heb je nog vragen?</span> Neem gerust contact met ons op via info@salonid.com of bel ons op +31 (0)20 123 4567.
            </p>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}