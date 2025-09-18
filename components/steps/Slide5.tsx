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

export default function Slide5({ formData, updateFormData, onNext, onBack, onSelectionMade }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

  const handleChooseVariant = (variantNumber: string) => {
    console.log("[v0] Slide5 variant selected:", variantNumber)
    const finalStyle = `${formData.style}${variantNumber}`
    setSelectedVariant(finalStyle)
    updateFormData({ styleVariant: finalStyle })
    onSelectionMade()
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className="text-[28px] font-black my-2 text-center">Selecteer jouw specifieke variant</h2>

        <div className="max-w-[760px] mx-auto mb-10 text-center opacity-90">
          <p className="mb-2">
            Je hebt gekozen voor een ontwerp met meerdere varianten. Selecteer nu de optie die het beste aansluit bij
            jouw visie. Elke variant heeft zijn eigen unieke kenmerken, waardoor jij de stijl kunt kiezen die perfect
            past bij jouw merk.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 max-w-[800px] mx-auto">
          <div onClick={() => handleChooseVariant("1")} className="cursor-pointer">
            <div className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {selectedVariant === `${formData.style}1` && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">Uitlijning links</div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/elegant2/variant1.jpg" alt="Variant 1" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div onClick={() => handleChooseVariant("2")} className="cursor-pointer">
            <div className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {selectedVariant === `${formData.style}2` && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">
                Uitlijning midden
              </div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/elegant2/variant2.jpg" alt="Variant 2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}
