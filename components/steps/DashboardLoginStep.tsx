"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface DashboardLoginStepProps {
  onNext: () => void
}

export function DashboardLoginStep({ onNext }: DashboardLoginStepProps) {
  return (
    <div className="space-y-8 text-center">
      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-gray-700 rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-black mb-8">Bedankt voor je inzending!</h1>

      {/* Content Text */}
      <div className="max-w-2xl mx-auto space-y-6 text-left text-gray-700 leading-relaxed">
        <p>
          <span className="font-semibold text-green-600">Geweldig!</span> Je hebt succesvol je{" "}
          <span className="font-semibold">design voorkeuren</span> ingediend. We gaan nu aan de slag met het creëren van
          jouw unieke productlijn.
        </p>

        <p>
          Om je <span className="font-semibold">persoonlijke dashboard</span> te bezoeken waar je je inzending kunt
          bekijken en de voortgang kunt volgen, moet je eerst inloggen met je e-mailadres.
        </p>

        <p>
          Je ontvangt een <span className="font-semibold text-black">verificatiecode</span> via e-mail die je kunt
          gebruiken om veilig toegang te krijgen tot je dashboard.
        </p>

        <p>
          <span className="font-semibold">Let op:</span> Bewaar je e-mailadres goed - dit heb je nodig om in de toekomst
          toegang te krijgen tot je dashboard en design updates.
        </p>
      </div>

      {/* Login Button */}
      <div className="pt-8">
        <Button onClick={onNext} className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg">
          Ga naar mijn dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default DashboardLoginStep
