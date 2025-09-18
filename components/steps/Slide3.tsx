"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { SlideContainer } from "@/components/ui/slide-container"

type Props = {
  onBack: () => void
  onNext: (selectedStyle?: string) => void
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
}

export default function Slide3({ onBack, onNext, selectedStyle: globalSelectedStyle, onSelectionChange }: Props) {
  const [localSelectedStyle, setLocalSelectedStyle] = useState<string | null>(globalSelectedStyle || null)
  const selectedStyle = globalSelectedStyle !== undefined ? globalSelectedStyle : localSelectedStyle

  const items = useMemo(
    () => [
      { key: "Elegant 1.", label: "Elegant 1", src: "/img/elegant/e1.jpg" },
      { key: "Elegant 2.", label: "Elegant 2", src: "/img/elegant/e2.jpg" },
      { key: "Elegant 3.", label: "Elegant 3", src: "/img/elegant/e3.jpg" },
      { key: "Elegant 4.", label: "Elegant 4", src: "/img/elegant/e4.jpg" },
      { key: "Elegant 5.", label: "Elegant 5", src: "/img/elegant/e5.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string, label: string) => {
    setLocalSelectedStyle(key)
    onSelectionChange?.(key)

    try {
      localStorage.setItem("salonid:styleChoice", key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    setTimeout(() => {
      onNext(key)
    }, 500)
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">Kies jouw elegante stijl</h2>
          <div className="max-w-2xl mx-auto text-gray-700 space-y-4">
            <p>
              Je hebt gekozen voor een klassieke en verfijnde uitstraling met sierlijke letters en een stijlvol design.
              Dit ontwerp straalt tijdloze klasse en finesse uit.
            </p>
            <p>
              Maak nu een keuze uit de onderstaande selectie. Indien een stijl meerdere varianten heeft, kun je na deze
              keuze de specifieke variant selecteren die het beste aansluit bij jouw visie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item) => (
            <ChoiceCard
              key={item.key}
              label={item.label}
              imgSrc={item.src}
              isSelected={selectedStyle === item.key}
              onChoose={() => handleChoose(item.key, item.label)}
            />
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}

function ChoiceCard({
  label,
  imgSrc,
  isSelected,
  onChoose,
}: {
  label: string
  imgSrc: string
  isSelected: boolean
  onChoose: () => void
}) {
  return (
    <div className="relative">
      <div
        onClick={onChoose}
        className={`relative rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
          isSelected ? "ring-4 ring-gray-900 ring-offset-2" : ""
        }`}
      >
        {isSelected && (
          <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg">
            <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black text-white text-sm font-bold px-4 py-2 rounded-lg">{label}</div>
        </div>

        <div className="aspect-[3/4] w-full">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={`${label} mockup`}
            width={900}
            height={1200}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
