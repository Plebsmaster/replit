"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type RepairSelections = {
  shampoo: string
  conditioner: string
  mask: string
}

const repairShampooOptions = [
  "1. Repair Shampoo",
  "2. Deep Care Shampoo", 
  "3. Reconstruct Shampoo",
  "4. Moisturizing Shampoo",
  "5. Intense Hydrate Shampoo"
]

const repairConditionerOptions = [
  "1. Repair Conditioner",
  "2. Deep Care Conditioner",
  "3. Reconstruct Conditioner", 
  "4. Moisturizing Conditioner",
  "5. Intense Hydrate Conditioner"
]

const repairMaskOptions = [
  "1. Repair Mask",
  "2. Deep Care Mask",
  "3. Reconstruct Mask",
  "4. Moisturizing Mask",
  "5. Intense Hydrate Mask"
]

const productSections = [
  {
    key: "shampoo",
    title: "Repair Shampoo",
    options: repairShampooOptions,
    fieldName: "naamRepairShampoo" as const
  },
  {
    key: "conditioner", 
    title: "Repair Conditioner",
    options: repairConditionerOptions,
    fieldName: "naamRepairConditioner" as const
  },
  {
    key: "mask",
    title: "Repair Mask",
    options: repairMaskOptions,
    fieldName: "naamRepairMask" as const
  }
]

export default function Slide23({ updateFormData, formData, onNext }: Props) {
  // Initialize with defaults from formData or default to option 1
  const initialSelections: RepairSelections = {
    shampoo: formData.naamRepairShampoo || repairShampooOptions[0],
    conditioner: formData.naamRepairConditioner || repairConditionerOptions[0],
    mask: formData.naamRepairMask || repairMaskOptions[0]
  }

  const [selectedChoices, setSelectedChoices] = useState<RepairSelections>(initialSelections)

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData.naamRepairShampoo) {
      updates.naamRepairShampoo = repairShampooOptions[0]
      localStorageUpdates.push({key: 'salonid:RepairShampoo', value: repairShampooOptions[0]})
    }
    
    if (!formData.naamRepairConditioner) {
      updates.naamRepairConditioner = repairConditionerOptions[0]
      localStorageUpdates.push({key: 'salonid:RepairConditioner', value: repairConditionerOptions[0]})
    }
    
    if (!formData.naamRepairMask) {
      updates.naamRepairMask = repairMaskOptions[0]
      localStorageUpdates.push({key: 'salonid:RepairMask', value: repairMaskOptions[0]})
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
        shampoo: formData.naamRepairShampoo || repairShampooOptions[0],
        conditioner: formData.naamRepairConditioner || repairConditionerOptions[0],
        mask: formData.naamRepairMask || repairMaskOptions[0]
      }
      setSelectedChoices(finalSelections)
    }
  }, []) // Empty dependency array - run only on mount

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedChoices.shampoo && selectedChoices.conditioner && selectedChoices.mask
  }, [selectedChoices])

  const handleOptionSelect = (sectionKey: keyof RepairSelections, option: string) => {
    const newSelections = { ...selectedChoices, [sectionKey]: option }
    setSelectedChoices(newSelections)

    // Update formData with the selections
    const updates = {
      naamRepairShampoo: newSelections.shampoo,
      naamRepairConditioner: newSelections.conditioner,
      naamRepairMask: newSelections.mask
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const storageKey = sectionKey === 'shampoo' ? 'RepairShampoo' : sectionKey === 'conditioner' ? 'RepairConditioner' : 'RepairMask'
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
          Repair - Kies de benaming
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de namen voor je Repair producten. Deze producten zijn speciaal ontwikkeld om beschadigd haar te herstellen en te versterken.
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
                  const isSelected = selectedChoices[section.key as keyof RepairSelections] === option
                  return (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(section.key as keyof RepairSelections, option)}
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
            {isComplete ? "Alle drie producten geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer alle drie producten om door te gaan"}
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}