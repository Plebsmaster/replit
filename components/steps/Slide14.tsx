"use client"

import { useEffect, useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"

type Props = {
  onBack: () => void
  onNext: () => void
}

export default function Slide14({ onBack, onNext }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<string>("")

  useEffect(() => {
    try {
      const style = localStorage.getItem("salonid:styleChoice") || ""
      setSelectedStyle(style)
    } catch (error) {
      console.log("Could not load style from localStorage")
    }
  }, [])

  const handleChooseVariant = (variantNumber: string) => {
    try {
      const finalStyle = `${selectedStyle}${variantNumber}`
      localStorage.setItem("salonid:styleVariant", finalStyle)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      console.log("Could not save variant to localStorage")
    }
    onNext()
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h2 className="text-[28px] font-black my-2 text-center">Selecteer jouw specifieke variant</h2>

        {/* Intro copy */}
        <div className="max-w-[760px] mx-auto mb-10 text-center opacity-90">
          <p className="mb-2">
            Je hebt gekozen voor een ontwerp met meerdere varianten. Selecteer nu de optie die het beste aansluit bij
            jouw visie. Elke variant heeft zijn eigen unieke kenmerken, waardoor jij de stijl kunt kiezen die perfect
            past bij jouw merk.
          </p>
        </div>

        {/* Grid met 2 varianten */}
        <div className="grid grid-cols-2 gap-10 max-w-[800px] mx-auto">
          <div onClick={() => handleChooseVariant("1")} className="cursor-pointer">
            <div className="bg-[#F5F2EF] border border-[#E3DED9] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">Uitlijning links</div>
              <div className="aspect-[3/4] bg-white p-5 flex items-center justify-center">
                <img
                  src="/img/modern3/variant1.jpg"
                  alt="Modern 3 Variant 1"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div onClick={() => handleChooseVariant("2")} className="cursor-pointer">
            <div className="bg-[#F5F2EF] border border-[#E3DED9] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-black text-white text-center font-extrabold py-3 px-4 text-base">
                Uitlijning midden
              </div>
              <div className="aspect-[3/4] bg-white p-5 flex items-center justify-center">
                <img
                  src="/img/modern3/variant2.jpg"
                  alt="Modern 3 Variant 2"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Debug info */}
        {selectedStyle && <div className="mt-10 text-center text-xs opacity-60">Gekozen style: {selectedStyle}</div>}
      </section>
    </SlideContainer>
  )
}
