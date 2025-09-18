"use client"

import { Button } from "@/components/ui/button"
import { SlideContainer } from "@/components/ui/slide-container"
import { ArrowRight } from "lucide-react"
import { getTypographyClasses } from "@/lib/typography"

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

        <h1 className={getTypographyClasses("title", { alignment: "center" })}>
          A brief moment, to create your legacy.
        </h1>

        <div className="space-y-6 text-left leading-relaxed">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            <span className="font-semibold text-blue-600">Gefeliciteerd</span> met deze stap naar de toekomst van{" "}
            <span className="font-semibold text-blue-600">jouw salon!</span> We kijken ernaar uit om samen een{" "}
            <span className="font-semibold">unieke productlijn</span> te creëren die jouw merk perfect weergeeft.
          </p>

          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            In deze vragenlijst maak je keuzes die essentieel zijn voor een samenhangende en aantrekkelijke
            productontwerp. Je geeft je voorkeuren door voor uitstraling, kleuren, iconen, productinformatie, een
            persoonlijke quote en het gebruik van je merknaam of logo.
          </p>

          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Samen brengen we jouw visie tot leven!
          </p>

          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            <span className="font-semibold">Belangrijk:</span> De vragenlijst kan alleen volledig ingevuld worden
            ingediend voor een consistente en professionele uitstraling van je merk.
          </p>
        </div>

        <div className="pt-8">
          <Button
            onClick={onNext}
            variant="default"
            size="lg"
            className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-base font-medium"
          >
            Klik hier om te beginnen
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </SlideContainer>
  )
}
