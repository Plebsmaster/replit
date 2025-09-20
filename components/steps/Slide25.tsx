"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type CurlyGirlSelections = {
  shampoo: string
  conditioner: string
  mask: string
}

const curlyGirlShampooOptions = [
  "1. Curly Girl Shampoo",
  "2. Curly Care Shampoo",
  "3. Curly Balance Shampoo",
  "4. Curl Control Shampoo",
  "5. Curl Hydrate Shampoo"
]

const curlyGirlConditionerOptions = [
  "1. Curly Girl Conditioner",
  "2. Curly Care Conditioner",
  "3. Curly Balance Conditioner",
  "4. Curl Control Conditioner",
  "5. Curl Hydrate Conditioner"
]

const curlyGirlMaskOptions = [
  "1. Curly Girl Mask",
  "2. Curly Care Mask",
  "3. Curly Balance Mask",
  "4. Curl Control Mask",
  "5. Curl Hydrate Mask"
]

const productSections = [
  {
    key: "shampoo",
    title: "Curly Girl Shampoo",
    options: curlyGirlShampooOptions,
    fieldName: "naamCurlyGirlShampoo" as const
  },
  {
    key: "conditioner",
    title: "Curly Girl Conditioner",
    options: curlyGirlConditionerOptions,
    fieldName: "naamCurlyGirlConditioner" as const
  },
  {
    key: "mask",
    title: "Curly Girl Mask",
    options: curlyGirlMaskOptions,
    fieldName: "naamCurlyGirlMask" as const
  }
]

export default function Slide25({ updateFormData, formData, onNext }: Props) {
  // Initialize with defaults from formData or default to option 1
  const initialSelections: CurlyGirlSelections = {
    shampoo: formData.naamCurlyGirlShampoo || curlyGirlShampooOptions[0],
    conditioner: formData.naamCurlyGirlConditioner || curlyGirlConditionerOptions[0],
    mask: formData.naamCurlyGirlMask || curlyGirlMaskOptions[0]
  }

  const [selectedChoices, setSelectedChoices] = useState<CurlyGirlSelections>(initialSelections)

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData.naamCurlyGirlShampoo) {
      updates.naamCurlyGirlShampoo = curlyGirlShampooOptions[0]
      localStorageUpdates.push({key: 'salonid:CurlyGirlShampoo', value: curlyGirlShampooOptions[0]})
    }
    
    if (!formData.naamCurlyGirlConditioner) {
      updates.naamCurlyGirlConditioner = curlyGirlConditionerOptions[0]
      localStorageUpdates.push({key: 'salonid:CurlyGirlConditioner', value: curlyGirlConditionerOptions[0]})
    }
    
    if (!formData.naamCurlyGirlMask) {
      updates.naamCurlyGirlMask = curlyGirlMaskOptions[0]
      localStorageUpdates.push({key: 'salonid:CurlyGirlMask', value: curlyGirlMaskOptions[0]})
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
        shampoo: formData.naamCurlyGirlShampoo || curlyGirlShampooOptions[0],
        conditioner: formData.naamCurlyGirlConditioner || curlyGirlConditionerOptions[0],
        mask: formData.naamCurlyGirlMask || curlyGirlMaskOptions[0]
      }
      setSelectedChoices(finalSelections)
    }
  }, []) // Empty dependency array - run only on mount

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedChoices.shampoo && selectedChoices.conditioner && selectedChoices.mask
  }, [selectedChoices])

  const handleOptionSelect = (sectionKey: keyof CurlyGirlSelections, option: string) => {
    const newSelections = { ...selectedChoices, [sectionKey]: option }
    setSelectedChoices(newSelections)

    // Update formData with the selections
    const updates = {
      naamCurlyGirlShampoo: newSelections.shampoo,
      naamCurlyGirlConditioner: newSelections.conditioner,
      naamCurlyGirlMask: newSelections.mask
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const storageKey = sectionKey === 'shampoo' ? 'CurlyGirlShampoo' : sectionKey === 'conditioner' ? 'CurlyGirlConditioner' : 'CurlyGirlMask'
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
          Curly Girl - Kies de benaming
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de namen voor je Curly Girl producten. Deze producten zijn speciaal ontwikkeld voor krullend haar en helpen bij het definiëren en verzorgen van je krullen.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één optie voor elk product. Alle drie de producten moeten geselecteerd zijn om door te gaan.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.options.map((option, index) => {
                  const isSelected = selectedChoices[section.key as keyof CurlyGirlSelections] === option
                  return (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(section.key as keyof CurlyGirlSelections, option)}
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
            {isComplete ? "Alle drie producten geselecteerd - gebruik 'Doorgaan' om verder te gaan" : "Selecteer alle drie producten om door te gaan"}
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}