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

const ingredientsData: Record<string, Record<string, string>> = {
  "No Yellow lijn": {
    Shampoo: "Hyaluronzuur",
    Conditioner: "Jojoba-olie",
  },
  "Repair lijn": {
    Shampoo: "Gehydrolyseerd Tarweproteïne",
    Conditioner: "Vitamine E",
    Mask: "Vitamine B5",
  },
  "Color lijn": {
    Shampoo: "Vitamine C",
    Conditioner: "Arganolie",
    Mask: "Vitamine E",
  },
  "Curly Girl lijn": {
    Shampoo: "Hyaluronzuur",
    Conditioner: "Hyaluronzuur",
    Mask: "Hyaluronzuur",
  },
  "Mannen lijn": {
    "Mannen Shampoo": "Vitamine B5",
  },
  Treatment: {
    Haarserum: "Vitamine B5",
  },
  Styling: {
    Haarlak: "UV Filter",
    Mousse: "Vitamine B5",
    Droogshampoo: "Arganolie",
    Gel: "Vitamine B5",
    "Clay Paste": "Vitamine E",
    "Fiber Paste": "Vitamine E",
    "Cream Paste": "Vitamine E",
  },
}

export default function Slide29({
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
      ingredientChoice: option,
    }

    // Auto-fill ingredient marketing fields when SalonID is chosen
    if (option === "salonid") {
      // Marketing ingredient fields auto-fill based on provided mapping
      updates.marketingIngredientenNoYellowShampoo = "Hyaluronzuur"
      updates.marketingIngredientenNoYellowConditioner = "Jojoba-olie"
      updates.marketingIngredientenRepairShampoo = "Gehydrolyseerd Tarweproteïne"
      updates.marketingIngredientenRepairConditioner = "Vitamine E"
      updates.marketingIngredientenRepairMask = "Vitamine B5"
      updates.marketingIngredientenColorShampoo = "Vitamine C"
      updates.marketingIngredientenColorConditioner = "Arganolie"
      updates.marketingIngredientenColorMask = "Vitamine E"
      updates.marketingIngredientenCurlyGirlShampoo = "Hyaluronzuur"
      updates.marketingIngredientenCurlyGirlConditioner = "Hyaluronzuur"
      updates.marketingIngredientenCurlyGirlMask = "Hyaluronzuur"
      updates.marketingIngredientenMannenShampoo = "Vitamine B5"
      updates.marketingIngredientenHaarserum = "Vitamine B5"
      updates.marketingIngredientenHaarlak = "UV Filter"
      updates.marketingIngredientenMousse = "Vitamine B5"
      updates.marketingIngredientenDroogshampoo = "Arganolie"
      updates.marketingIngredientenGel = "Vitamine B5"
      updates.marketingIngredientenClayPaste = "Vitamine E"
      updates.marketingIngredientenFiberPaste = "Vitamine E"
    }

    // persist in global form state
    updateFormData(updates)

    // optional localStorage (kept from template)
    try {
      localStorage.setItem("salonid:ingredientChoice", option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Navigate based on choice - will be handled by step navigation logic
    queueMicrotask(() => onNext())
  }

  const productLines = Object.keys(ingredientsData)

  return (
    <SlideContainer width="wide">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-6">Selecteer de ingrediënten voor jouw producten</h2>

          <div className="max-w-[760px] space-y-4">
            <p className="text-gray-700 text-left leading-relaxed">
              Nu gaan we beginnen met het kiezen van de ingrediënten voor jouw producten! Op basis van grondig onderzoek hebben
              wij de beste selecties voor jou samengesteld. <span className="underline font-semibold">We adviseren je onze keuze te volgen.</span>
            </p>
            <p className="text-gray-700 text-left leading-relaxed">
              Hieronder kun je zien welke ingrediënten worden aanbevolen door SalonID.
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
                <span className="text-2xl font-bold text-gray-600">🧪</span>
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

        {/* read-only recommended ingredients (accordion) */}
        <div className="p-4">
          {productLines.map((line) => (
            <ExpandableSection key={line} title={line} isOpen={openSection === line} onToggle={() => toggleSection(line)}>
              <div className="space-y-3">
                {Object.entries(ingredientsData[line]).map(([productType, ingredient]) => (
                  <div key={productType} className="space-y-1">
                    <p className="font-bold text-gray-900">{productType}</p>
                    <ul className="list-disc pl-5">
                      <li className="text-gray-700">
                        <span className="underline">{ingredient}</span>
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