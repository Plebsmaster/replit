"use client"

import { useState, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"

type Props = {
  formData: any
  updateFormData: (updates: any) => void
  onNext: () => void
  onBack: () => void
  onSelectionMade: () => void
}

export default function Slide4({ formData, updateFormData, onNext, onBack, onSelectionMade }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<string>("")

  useEffect(() => {
    // Only set if there's already a selection in form data (when navigating back)
    if (formData.styleVariant) {
      setSelectedVariant(formData.styleVariant)
    }
  }, [formData.styleVariant])

  const handleChooseVariant = (variantNumber: string) => {
    console.log("[v0] Slide4 variant selected:", variantNumber)
    const finalStyle = `${formData.style}${variantNumber}`
    setSelectedVariant(finalStyle)
    updateFormData({ styleVariant: finalStyle })

    // Trigger auto-progress through parent component
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
          <div onClick={() => handleChooseVariant("1")} className="cursor-pointer group">
            <div className="rounded-xl overflow-hidden hover:scale-105 transition-all duration-200 relative">
              {selectedVariant === `${formData.style}1` && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}

              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">Uitlijning links</div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/elegant1/variant1.jpg" alt="Variant 1" className="w-full h-full object-cover" />
              </div>

              {selectedVariant === `${formData.style}1` && (
                <div className="absolute inset-0 ring-4 ring-gray-900 ring-offset-2 rounded-xl pointer-events-none"></div>
              )}
            </div>
          </div>

          <div onClick={() => handleChooseVariant("2")} className="cursor-pointer group">
            <div className="rounded-xl overflow-hidden hover:scale-105 transition-all duration-200 relative">
              {selectedVariant === `${formData.style}2` && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              )}

              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">
                Uitlijning midden
              </div>
              <div className="aspect-[3/4] bg-white">
                <img src="/img/elegant1/variant2.jpg" alt="Variant 2" className="w-full h-full object-cover" />
              </div>

              {selectedVariant === `${formData.style}2` && (
                <div className="absolute inset-0 ring-4 ring-gray-900 ring-offset-2 rounded-xl pointer-events-none"></div>
              )}
            </div>
          </div>
        </div>

        {formData.style && <div className="mt-10 text-center text-xs opacity-60">Gekozen style: {formData.style}</div>}
      </section>
    </SlideContainer>
  )
}
