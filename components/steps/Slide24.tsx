"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type ColorSelections = {
  shampoo: string
  conditioner: string
  mask: string
}

const colorShampooOptions = [
  "1. Color Shampoo",
  "2. Color Protect Shampoo", 
  "3. Color Brilliance Shampoo",
  "4. Vibrant Color Shampoo",
  "5. Color Shine Shampoo"
]

const colorConditionerOptions = [
  "1. Color Conditioner",
  "2. Color Protect Conditioner",
  "3. Color Brilliance Conditioner", 
  "4. Vibrant Color Conditioner",
  "5. Color Shine Conditioner"
]

const colorMaskOptions = [
  "1. Color Mask",
  "2. Color Protect Mask",
  "3. Color Brilliance Mask",
  "4. Vibrant Color Mask",
  "5. Color Shine Mask"
]

const productSections = [
  {
    key: "shampoo",
    title: "Color Shampoo",
    options: colorShampooOptions,
    fieldName: "naamColorShampoo" as const
  },
  {
    key: "conditioner", 
    title: "Color Conditioner",
    options: colorConditionerOptions,
    fieldName: "naamColorConditioner" as const
  },
  {
    key: "mask",
    title: "Color Mask",
    options: colorMaskOptions,
    fieldName: "naamColorMask" as const
  }
]

export default function Slide24({ updateFormData, formData, onNext }: Props) {
  // Initialize with defaults from formData or default to option 1
  const initialSelections: ColorSelections = {
    shampoo: formData.naamColorShampoo || colorShampooOptions[0],
    conditioner: formData.naamColorConditioner || colorConditionerOptions[0],
    mask: formData.naamColorMask || colorMaskOptions[0]
  }

  const [selectedChoices, setSelectedChoices] = useState<ColorSelections>(initialSelections)

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData.naamColorShampoo) {
      updates.naamColorShampoo = colorShampooOptions[0]
      localStorageUpdates.push({key: 'salonid:ColorShampoo', value: colorShampooOptions[0]})
    }
    
    if (!formData.naamColorConditioner) {
      updates.naamColorConditioner = colorConditionerOptions[0]
      localStorageUpdates.push({key: 'salonid:ColorConditioner', value: colorConditionerOptions[0]})
    }
    
    if (!formData.naamColorMask) {
      updates.naamColorMask = colorMaskOptions[0]
      localStorageUpdates.push({key: 'salonid:ColorMask', value: colorMaskOptions[0]})
    }
    
    // Only update if there are actual changes needed
    if (Object.keys(updates).length > 0) {
      updateFormData(updates)
      
      // Only set localStorage keys for fields that were updated
      try {
        localStorageUpdates.forEach(({key, value}) => {
          localStorage.setItem(key, value)
        })
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (error) {
        // localStorage not available, continue silently
      }
      
      // Sync selectedChoices state with final values (existing + applied defaults)
      const finalSelections = {
        shampoo: formData.naamColorShampoo || colorShampooOptions[0],
        conditioner: formData.naamColorConditioner || colorConditionerOptions[0],
        mask: formData.naamColorMask || colorMaskOptions[0]
      }
      setSelectedChoices(finalSelections)
    }
  }, []) // Empty dependency array - run only on mount

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedChoices.shampoo && selectedChoices.conditioner && selectedChoices.mask
  }, [selectedChoices])

  const handleOptionSelect = (sectionKey: keyof ColorSelections, option: string) => {
    const newSelections = { ...selectedChoices, [sectionKey]: option }
    setSelectedChoices(newSelections)

    // Update formData with the selections
    const updates = {
      naamColorShampoo: newSelections.shampoo,
      naamColorConditioner: newSelections.conditioner,
      naamColorMask: newSelections.mask
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const storageKey = sectionKey === 'shampoo' ? 'ColorShampoo' : sectionKey === 'conditioner' ? 'ColorConditioner' : 'ColorMask'
      localStorage.setItem(`salonid:${storageKey}`, option)
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
          Color - Kies de benaming
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de namen voor je Color producten. Deze producten zijn speciaal ontwikkeld om de kleur van je haar te beschermen en te versterken.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één optie voor elk product. Nadat alle drie de producten zijn geselecteerd, kun je doorgaan naar de volgende stap.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.options.map((option, index) => {
                  const isSelected = selectedChoices[section.key as keyof ColorSelections] === option
                  return (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(section.key as keyof ColorSelections, option)}
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
            {isComplete ? "Alle drie de producten zijn geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer alle drie de producten om door te gaan"}
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}