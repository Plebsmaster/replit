"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"

type Props = {
  formData: any
  updateFormData: (updates: any) => void
  onNext: () => void
  onBack: () => void
  onSelectionMade: () => void
}

export default function Slide6({ formData, updateFormData, onNext, onBack, onSelectionMade }: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleChooseColor = (colorChoice: string) => {
    console.log("[v0] Slide6 color selected:", colorChoice)
    setSelectedColor(colorChoice)
    updateFormData({ colorChoice })
    onSelectionMade()
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className="text-[28px] font-black my-2 text-center">Let op!</h2>

        <div className="max-w-[760px] mx-auto mb-10 text-center opacity-90">
          <p className="mb-4">
            Vanaf dit punt gebruiken we een representatieve afbeelding die kan afwijken van je uiteindelijke ontwerp. Om
            alle ontwerpen te bekijken bezoek je deze pagina{" "}
            <a href="#" className="text-black underline">
              [Ontwerpen Bekijken]
            </a>
            .
          </p>

          <div className="mb-4">
            <h3 className="text-base font-bold mb-2">Wat is een representatieve afbeelding?</h3>
            <p className="text-sm">
              Dit is een visual die een indruk geeft van hoe het eindproduct eruit zou kunnen zien, maar het is niet het
              definitieve ontwerp. De afbeelding ondersteunt je bij het visualiseren van je designkeuzes en maakt het
              selectieproces eenvoudiger.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-extrabold mb-2">Kleurselectie</h3>
            <p className="text-sm mb-4">
              Maak je ontwerp persoonlijk door te kiezen tussen een zwart schema of levendige kleuren.
            </p>

            <div className="text-left space-y-2">
              <div>
                <strong className="text-sm">Zwart:</strong>
                <span className="text-sm ml-1">
                  Kies voor een krachtige en stijlvolle uitstraling met diepzwarte accenten. Perfect voor een moderne en
                  strakke look.
                </span>
              </div>
              <div>
                <strong className="text-sm">Kleur:</strong>
                <span className="text-sm ml-1">
                  Voeg dynamiek toe met een volledig kleurenpalnet dat je ontwerp levendiger en opvallender maakt.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 max-w-[800px] mx-auto">
          <div onClick={() => handleChooseColor("Zwart")} className="cursor-pointer">
            <div className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {selectedColor === "Zwart" && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">Zwart</div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/colors/black.jpg" alt="Zwart color option" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div onClick={() => handleChooseColor("Kleur")} className="cursor-pointer">
            <div className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {selectedColor === "Kleur" && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">Kleur</div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/colors/color.jpg" alt="Kleur color option" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}
