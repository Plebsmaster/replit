"use client"

import React, { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Choice = "SalonID" | "self"

export default function Slide38({
  onBack,
  updateFormData,
  formData,
  goToStep,
}: StepProps) {
  const [localSelected, setLocalSelected] = useState<Choice | null>(null)

  const handleOptionSelect = (option: Choice) => {
    setLocalSelected(option)

    // Base form data update
    const updates: any = {
      claimChoice: option,
    }

    // Complex auto-fill for SalonID choice - 16 claim fields
    if (option === "SalonID") {
      updates.standaardClaimNoYellowShampoo = "1. Reinigt, hydrateert en verheldert geblondeerd, blond en grijs haar"
      updates.standaardClaimNoYellowConditioner = "1. Hydrateert, herstelt en verheldert blond, grijs en geblondeerd haar"
      updates.standaardClaimRepairShampoo = "1. Diepe reiniging die het haar tegelijkertijd herstelt en voedt"
      updates.standaardClaimRepairConditioner = "1. Intensieve hydratatie en diepgaand herstel van beschadigd haar"
      updates.standaardClaimRepairMask = "1. Intensief herstellend masker voor beschadigd en verzwakt haar"
      updates.standaardClaimColorShampoo = "1. Milde reiniging, verlengt de levensduur van haarkleuring en behoudt levendigheid"
      updates.standaardClaimColorConditioner = "1. Helpt bij het behouden van een levendige en langdurige haarkleur"
      updates.standaardClaimColorMask = "1. Intensief verzorgend masker dat de haarkleur beschermt en verlengt"
      updates.standaardClaimCurlyGirlShampoo = "1. Milde reiniging speciaal ontwikkeld voor krullend en golvend haar"
      updates.standaardClaimCurlyGirlConditioner = "1. Intensief voedende conditioner die krullen ontwart en hydrateert"
      updates.standaardClaimCurlyGirlMask = "1. Intensief herstellend masker dat krullen diep van binnenuit voedt"
      updates.standaardClaimMannenShampoo = "1. Verfrissende shampoo speciaal ontwikkeld voor mannenhaar"
      updates.standaardClaimHaarserum = "1. Geeft directe glans en zachtheid"
      updates.standaardClaimHaarlak = "1. Sterk fixerende haarspray voor een natuurlijke uitstraling en langdurige hold"
      updates.standaardClaimMousse = "1. Geeft fijn futloos haar meer volume en body"
      updates.standaardClaimDroogShampoo = "1. Zorgt direct voor een fris gevoel en geeft het haar extra volume en textuur"
    } else if (option === "self") {
      // Clear all claim fields when "Ik bepaal zelf" is selected
      updates.claimChoice = null
      updates.standaardClaimNoYellowShampoo = ''
      updates.standaardClaimNoYellowConditioner = ''
      updates.standaardClaimRepairShampoo = ''
      updates.standaardClaimRepairConditioner = ''
      updates.standaardClaimRepairMask = ''
      updates.standaardClaimColorShampoo = ''
      updates.standaardClaimColorConditioner = ''
      updates.standaardClaimColorMask = ''
      updates.standaardClaimCurlyGirlShampoo = ''
      updates.standaardClaimCurlyGirlConditioner = ''
      updates.standaardClaimCurlyGirlMask = ''
      updates.standaardClaimMannenShampoo = ''
      updates.standaardClaimHaarserum = ''
      updates.standaardClaimHaarlak = ''
      updates.standaardClaimMousse = ''
      updates.standaardClaimDroogShampoo = ''
    }

    // persist in global form state
    updateFormData(updates)

    // optional localStorage persistence (following Slide21.tsx pattern)
    try {
      localStorage.setItem("salonid:claimChoice", option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Auto-advance navigation based on choice
    queueMicrotask(() => {
      if (option === "SalonID") {
        goToStep('slide46')
      } else {
        goToStep('slide39')
      }
    })
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-6">
            Selecteer de claims voor jouw producten
          </h2>

          <div className="max-w-[760px] space-y-4">
            <p className="text-gray-700 text-left leading-relaxed">
              Nu gaan we de claims voor jouw producten bepalen! Op basis van grondig onderzoek hebben
              wij de beste claims voor jou samengesteld. <span className="underline font-semibold">We adviseren je onze keuze te volgen.</span>
            </p>
            <p className="text-gray-700 text-left leading-relaxed">
              SalonID heeft bewezen, effectieve claims ontwikkeld die perfect aansluiten bij de behoeften van jouw klanten.
            </p>
            <p className="text-gray-700 text-left leading-relaxed">
              Wil je liever zelf de claims bepalen? Dat kan natuurlijk ook!
            </p>
          </div>
        </div>

        {/* Choice cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-12">
          {/* SalonID Choice - Auto-fill 16 claims */}
          <button
            type="button"
            className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 ${
              localSelected === "SalonID" ? "border-black shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleOptionSelect("SalonID")}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center relative">
                <span className="text-2xl font-bold text-gray-600">Q&</span>
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
              </div>
            </div>
            <div className="bg-black text-white text-center py-3 rounded-lg">
              <span className="font-semibold">Keuze door SalonID</span>
            </div>
          </button>

          {/* Self Choice - Manual claim selection */}
          <button
            type="button"
            className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 ${
              localSelected === "self" ? "border-black shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleOptionSelect("self")}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-gray-800 text-white text-center py-3 rounded-lg">
              <span className="font-semibold">Ik bepaal zelf</span>
            </div>
          </button>
        </div>

        {/* Information section about SalonID claims */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className={getTypographyClasses("subtitle", { alignment: "left" })}>
            SalonID Standaard Claims
          </h3>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 text-sm leading-relaxed">
              Onze standaard claims zijn ontwikkeld door experts en gebaseerd op uitgebreid marktonderzoek.
              Ze zijn bewezen effectief voor het aantrekken en overtuigen van klanten.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Voordelen van SalonID claims:</strong> Wetenschappelijk onderbouwd, klantgericht geformuleerd, 
              en geoptimaliseerd voor conversie. Perfect afgestemd op de moderne haarmodeconsument.
            </p>
          </div>
        </div>

        {/* Back button only - no manual continue since auto-advance */}
        <div className="flex justify-start pt-6">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Terug
          </button>
        </div>
      </section>
    </SlideContainer>
  )
}