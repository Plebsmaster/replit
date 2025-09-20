"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type NoYellowSelections = {
  shampoo: string
  conditioner: string
}

const noYellowShampooOptions = [
  "1. No Yellow Shampoo",
  "2. Anti-Yellow Shampoo", 
  "3. Goodbye Yellow Shampoo",
  "4. Silver Shampoo",
  "5. Cool Blonde Shampoo"
]

const noYellowConditionerOptions = [
  "1. No Yellow Conditioner",
  "2. Anti-Yellow Conditioner",
  "3. Goodbye Yellow Conditioner", 
  "4. Silver Conditioner",
  "5. Cool Blonde Conditioner"
]

const productSections = [
  {
    key: "shampoo",
    title: "No Yellow Shampoo",
    options: noYellowShampooOptions,
    fieldName: "naamNoYellowShampoo" as const
  },
  {
    key: "conditioner", 
    title: "No Yellow Conditioner",
    options: noYellowConditionerOptions,
    fieldName: "naamNoYellowConditioner" as const
  }
]

export default function Slide22({ updateFormData, formData, onNext }: Props) {
  // Initialize with defaults from formData or default to option 1
  const initialSelections: NoYellowSelections = {
    shampoo: formData.naamNoYellowShampoo || noYellowShampooOptions[0],
    conditioner: formData.naamNoYellowConditioner || noYellowConditionerOptions[0]
  }

  const [selectedChoices, setSelectedChoices] = useState<NoYellowSelections>(initialSelections)

  // Check if both products have selections
  const isComplete = useMemo(() => {
    return selectedChoices.shampoo && selectedChoices.conditioner
  }, [selectedChoices])

  const handleOptionSelect = (sectionKey: keyof NoYellowSelections, option: string) => {
    const newSelections = { ...selectedChoices, [sectionKey]: option }
    setSelectedChoices(newSelections)

    // Update formData with the selections
    const updates = {
      naamNoYellowShampoo: newSelections.shampoo,
      naamNoYellowConditioner: newSelections.conditioner
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:${sectionKey === 'shampoo' ? 'NoYellowShampoo' : 'NoYellowConditioner'}`, option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }

    // Don't auto-advance - use manual continue as specified in requirements
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          No Yellow - Kies je productnamen
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de namen voor je No Yellow producten. Deze producten zijn speciaal ontwikkeld om gele tinten te neutraliseren en je haar een stralende uitstraling te geven.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één optie voor elk product. De selectie gaat automatisch door naar de volgende stap.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.options.map((option, index) => {
                  const isSelected = selectedChoices[section.key as keyof NoYellowSelections] === option
                  return (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(section.key as keyof NoYellowSelections, option)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-800 font-medium">{option}</div>
                        </div>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-black flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isComplete ? "Beide producten geselecteerd - ga automatisch door naar de volgende stap" : "Selecteer beide producten om door te gaan"}
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}