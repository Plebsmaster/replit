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

export default function Slide7({ formData, updateFormData, onNext, onBack, onSelectionMade }: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleChooseColor = (colorChoice: string) => {
    console.log("[v0] Slide7 color selected:", colorChoice)
    setSelectedColor(colorChoice)
    updateFormData({ colorChoice: colorChoice })
    onSelectionMade()
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className="text-[28px] font-black my-2 text-center">Kleurselectie</h2>

        <div className="max-w-[760px] mx-auto mb-10 text-center opacity-90">
          <p className="mb-4">
            Maak je ontwerp persoonlijk door te kiezen tussen een zwart schema, wit schema of levendige kleuren.
          </p>

          <div className="text-left space-y-2">
            <div>
              <strong>Zwart:</strong> Kies voor een krachtige en stijlvolle uitstraling met diepzwarte accenten. Perfect
              voor een moderne en strakke look.
            </div>
            <div>
              <strong>Wit:</strong> Kies voor een frisse en verfijnde uitstraling met zuivere witte tinten. Deze optie
              straalt eenvoud en rust uit.
            </div>
            <div>
              <strong>Kleur:</strong> Voeg dynamiek toe met een volledig kleurenpallet dat je ontwerp levendiger en
              opvallender maakt.
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
                <img src="/img/elegant3/black.jpg" alt="Zwart color option" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div onClick={() => handleChooseColor("Wit")} className="cursor-pointer">
            <div className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {selectedColor === "Wit" && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">Wit</div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/elegant3/white.jpg" alt="Wit color option" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 max-w-[400px] mx-auto mt-10">
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
                <img src="/img/elegant3/color.jpg" alt="Kleur color option" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}
