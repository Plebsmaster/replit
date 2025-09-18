"use client"

import { Button } from "@/components/ui/button"
import { SlideContainer } from "@/components/ui/slide-container"
import { ArrowRight } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <SlideContainer width="standard">
      <div className="space-y-8 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-black mb-8">A brief moment, to create your legacy.</h1>

        {/* Content Text */}
        <div className="space-y-6 text-left text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold text-blue-600">Gefeliciteerd</span> met deze stap naar de toekomst van{" "}
            <span className="font-semibold text-blue-600">jouw salon!</span> We kijken ernaar uit om samen een{" "}
            <span className="font-semibold">unieke productlijn</span> te creëren die jouw merk perfect weergeeft.
          </p>

          <p>
            In deze vragenlijst maak je keuzes die essentieel zijn voor een samenhangende en aantrekkelijke
            productontwerp. Je geeft je voorkeuren door voor uitstraling, kleuren, iconen, productinformatie, een
            persoonlijke quote en het gebruik van je merknaam of logo.
          </p>

          <p>Samen brengen we jouw visie tot leven!</p>

          <p>
            <span className="font-semibold">Belangrijk:</span> De vragenlijst kan alleen volledig ingevuld worden
            ingediend voor een consistente en professionele uitstraling van je merk.
          </p>
        </div>

        {/* Start Button */}
        <div className="pt-8">
          <Button onClick={onNext} className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg">
            Klik hier om te beginnen
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </SlideContainer>
  )
}
