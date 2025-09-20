"use client"

import React, { useState } from "react"
import { Plus, Minus, AlertTriangle } from "lucide-react"
import { SlideContainer } from "@/components/ui/slide-container"
import type { StepProps } from "@/lib/form/steps"

type Choice = "salonid" | "self"

type ExpandableSectionProps = {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        type="button"
        className="w-full px-0 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-lg">{title}</span>
        {isOpen ? <Minus className="w-5 h-5 text-gray-600" /> : <Plus className="w-5 h-5 text-gray-600" />}
      </button>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  )
}

type Props = StepProps & {
  // optional: prefilled choice from outside
  selectedOption?: Choice | null
}

const productsData: Record<string, Record<string, string>> = {
  "No Yellow lijn": {
    Shampoo: "1. No Yellow Shampoo",
    Conditioner: "1. No Yellow Conditioner",
  },
  "Repair lijn": {
    Shampoo: "1. Repair Shampoo",
    Conditioner: "1. Repair Conditioner",
    Mask: "1. Repair Mask",
  },
  "Color lijn": {
    Shampoo: "1. Color Shampoo",
    Conditioner: "1. Color Conditioner",
    Mask: "1. Color Mask",
  },
  "Curly Girl lijn": {
    Shampoo: "1. Curly Girl Shampoo",
    Conditioner: "1. Curly Girl Conditioner",
    Mask: "1. Curly Girl Mask",
  },
  "Mannen lijn": {
    "Mannen Shampoo": "1. Strong Men Shampoo",
  },
  Treatment: {
    Haarserum: "1. Keratin Haarserum",
  },
  Styling: {
    Haarlak: "1. Strong Hairspray",
    Mousse: "1. Volume Mousse",
    Droogshampoo: "1. Dry Shampoo",
    Gel: "1. Volume Gel",
    "Clay Paste": "1. Matte Texture Paste",
    "Fiber Paste": "1. Shaping Fiber",
    "Cream Paste": "1. Styling Cream",
  },
}

export default function Slide21({
  onBack,
  onNext,
  updateFormData,
  formData,
  selectedOption: externalSelected,
}: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [localSelected, setLocalSelected] = useState<Choice | null>(externalSelected ?? null)
  const selected = (externalSelected ?? localSelected) as Choice | null

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleOptionSelect = (option: Choice) => {
    setLocalSelected(option)

    // Base form data update
    const updates: any = {
      productNamingChoice: option,
    }

    // Auto-fill product names when SalonID is chosen
    if (option === "salonid") {
      updates.naamNoYellowShampoo = "1. No Yellow Shampoo"
      updates.naamNoYellowConditioner = "1. No Yellow Conditioner"
      updates.naamRepairShampoo = "1. Repair Shampoo"
      updates.naamRepairConditioner = "1. Repair Conditioner"
      updates.naamColorShampoo = "1. Color Shampoo"
      updates.naamColorConditioner = "1. Color Conditioner"
      updates.naamHaarlak = "1. Strong Hairspray"
      updates.naamMousse = "1. Volume Mousse"
      updates.naamDroogshampoo = "1. Dry Shampoo"
      updates.naamRepairMask = "1. Repair Mask"
      updates.naamColorMask = "1. Color Mask"
      updates.naamCurlyGirlShampoo = "1. Curly Girl Shampoo"
      updates.naamCurlyGirlConditioner = "1. Curly Girl Conditioner"
      updates.naamCurlyGirlMask = "1. Curly Girl Mask"
      updates.naamGel = "1. Volume Gel"
      updates.naamClayPaste = "1. Matte Texture Paste"
      updates.naamFiberPaste = "1. Shaping Fiber"
      updates.naamCreamPaste = "1. Styling Cream"
      updates.naamMannenShampoo = "1. Strong Men Shampoo"
      updates.naamHaarserum = "1. Keratin Haarserum"
    }

    // persist in global form state
    updateFormData(updates)

    // optional localStorage (kept from template)
    try {
      localStorage.setItem("salonid:namingChoice", option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // microtask/next tick ensures state is flushed
    queueMicrotask(() => onNext())
  }

  const productLines = Object.keys(productsData)

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-6">Selecteer de namen voor jouw producten</h2>

          <div className="max-w-[760px] space-y-4">
            <p className="text-gray-700 text-left leading-relaxed">
              Nu gaan we beginnen met het kiezen van de namen voor jouw producten! Op basis van grondig onderzoek hebben
              wij de beste selecties voor jou samengesteld. <span className="underline font-semibold">We adviseren je onze keuze te volgen.</span>
            </p>
            <p className="text-gray-700 text-left leading-relaxed">
              Hieronder kun je zien welke benamingen worden aanbevolen door SalonID.
            </p>
            <p className="text-gray-700 text-left leading-relaxed">Wil je liever zelf kiezen? Dat kan natuurlijk ook!</p>
          </div>
        </div>

        {/* choice cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-12">
          {/* SalonID Choice */}
          <button
            type="button"
            className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 ${
              selected === "salonid" ? "border-black shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleOptionSelect("salonid")}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center relative">
                <span className="text-2xl font-bold text-gray-600">Q&</span>
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
              </div>
            </div>
            <div className="bg-black text-white text-center py-3 rounded-lg">
              <span className="font-semibold">Keuze door SalonID</span>
            </div>
          </button>

          {/* Self Choice */}
          <button
            type="button"
            className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 ${
              selected === "self" ? "border-black shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleOptionSelect("self")}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-gray-800 text-white text-center py-3 rounded-lg">
              <span className="font-semibold">Ik bepaal zelf</span>
            </div>
          </button>
        </div>

        {/* read-only recommended naming (accordion) */}
        <div className="p-4">
          {productLines.map((line) => (
            <ExpandableSection key={line} title={line} isOpen={openSection === line} onToggle={() => toggleSection(line)}>
              <div className="space-y-3">
                {Object.entries(productsData[line]).map(([productType, productName]) => (
                  <div key={productType} className="space-y-1">
                    <p className="font-bold text-gray-900">{productType}</p>
                    <ul className="list-disc pl-5">
                      <li className="text-gray-700">
                        <span className="underline">{productName}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}