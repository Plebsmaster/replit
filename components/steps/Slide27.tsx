"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

const haarserumOptions = [
  "1. Keratin Haarserum",
  "2. Argan Haarserum",
  "3. Elixir Haarserum",
  "4. Silk & Shine Haarserum",
  "5. Crystal Care Haarserum"
]

export default function Slide27({ updateFormData, formData, onNext }: Props) {
  // Initialize with default from formData or default to option 1
  const [selectedChoice, setSelectedChoice] = useState<string>(
    formData.naamHaarserum || haarserumOptions[0]
  )

  // Persist default selection on mount to ensure it's saved even without user interaction
  useEffect(() => {
    // Check if field is truly missing and only set default for missing ones
    if (!formData.naamHaarserum) {
      const defaultOption = haarserumOptions[0]
      
      updateFormData({ naamHaarserum: defaultOption })
      
      // Set localStorage for persistence
      try {
        localStorage.setItem('salonid:Haarserum', defaultOption)
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (error) {
        // localStorage not available, continue silently
      }
      
      // Sync selectedChoice state with the default value
      setSelectedChoice(defaultOption)
    }
  }, []) // Empty dependency array - run only on mount

  // Check if selection is made
  const isComplete = useMemo(() => {
    return selectedChoice !== ""
  }, [selectedChoice])

  const handleOptionSelect = (option: string) => {
    setSelectedChoice(option)

    // Update formData with the selection
    updateFormData({ naamHaarserum: option })

    // Persist to localStorage
    try {
      localStorage.setItem('salonid:Haarserum', option)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }

    // Use manual continue - don't auto-advance
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Haarserum - Kies de benaming
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de naam voor je Haarserum product. Deze haarserum is speciaal ontwikkeld om je haar te voeden, te beschermen en een prachtige glans te geven.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één optie voor de productnaam. Klik vervolgens op "Doorgaan" om verder te gaan.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 text-left mb-4">Haarserum</h3>
            
            <div className="space-y-3">
              {haarserumOptions.map((option, index) => {
                const isSelected = selectedChoice === option
                return (
                  <div
                    key={option}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                      isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleOptionSelect(option)}
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
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isComplete ? "Productnaam geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer een productnaam om door te gaan"}
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}