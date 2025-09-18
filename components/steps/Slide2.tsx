"use client"
import { useState } from "react"
import Image from "next/image"
import { SlideContainer } from "@/components/ui/slide-container"

type FormData = {
  style: "elegant" | "modern" | null
}

type Props = {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: (style: string) => void
  onBack: () => void
}

export default function StyleSelectionStep({ formData, updateFormData, onNext, onBack }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<"elegant" | "modern" | null>(null)

  const handleStyleChoice = (style: "elegant" | "modern") => {
    console.log("[v0] Style selected:", style)
    setSelectedStyle(style)
    onNext(style)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">Bepaal je stijl: elegant of modern</h2>
          <div className="max-w-2xl mx-auto text-gray-700 space-y-4">
            <p>
              Nu is het tijd om de uitstraling van je productlijn te bepalen. Om je te inspireren, bieden we twee
              stijlen met ieder hun eigen unieke charme:
            </p>
            <p>
              <strong>Elegant:</strong> Klassieke, verfijnde uitstraling met sierlijke letters en een stijlvol design.
            </p>
            <p>
              <strong>Modern:</strong> Strakke, eigentijdse look met rechte letters en een clean design.
            </p>
            <p className="text-sm text-gray-600">
              Klik op <strong>Elegant</strong> of <strong>Modern</strong> om je keuze te maken.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChoiceCard
            label="Elegant"
            imgSrc="/elegant-cosmetic-product-mockup.jpg"
            isSelected={selectedStyle === "elegant"}
            onChoose={() => handleStyleChoice("elegant")}
          />
          <ChoiceCard
            label="Modern"
            imgSrc="/modern-cosmetic-product-mockup.jpg"
            isSelected={selectedStyle === "modern"}
            onChoose={() => handleStyleChoice("modern")}
          />
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
  label: "Elegant" | "Modern"
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
