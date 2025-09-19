"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type StylingProductSelections = {
  haarspray: string
  mousse: string
  droogshampoo: string
  gel: string
  clayPaste: string
  fiberPaste: string
  creamPaste: string
}

const haarsprayOptions = [
  "1. Strong Hairspray",
  "2. Strong Fix Hairspray", 
  "3. Extreme Hold Hairspray",
  "4. Fix It Spray",
  "5. Flexible Hold Hairspray"
]

const mousseOptions = [
  "1. Volume Mousse",
  "2. Full Body Mousse",
  "3. Natural Volume Mousse", 
  "4. Styling Mousse",
  "5. Extreme Hold Mousse"
]

const droogshampooOptions = [
  "1. Dry Shampoo",
  "2. Refreshing Dry Shampoo",
  "3. Bodifying Dry Shampoo",
  "4. Detox Dry Shampoo", 
  "5. Fresh Volume Dry Shampoo"
]

const gelOptions = [
  "1. Volume Gel",
  "2. Volume Boost Gel",
  "3. Strong Grip Gel",
  "4. Power Hold Gel",
  "5. Ultra Hold Gel"
]

const clayPasteOptions = [
  "1. Matte Texture Paste",
  "2. Texture Boost Paste",
  "3. Urban Control Paste",
  "4. Flex Control Paste",
  "5. Ultra Flex Paste"
]

const fiberPasteOptions = [
  "1. Shaping Fiber",
  "2. Texture Control Fiber",
  "3. Matte Finish Fiber",
  "4. Ultimate Hold Fiber",
  "5. Flex Style Fiber"
]

const creamPasteOptions = [
  "1. Styling Cream",
  "2. Smooth Control Cream",
  "3. Creative Styling Cream",
  "4. Flexible Style Cream",
  "5. Prestige Styling Cream"
]

const productSections = [
  {
    key: "haarspray",
    title: "Haarspray",
    options: haarsprayOptions,
    fieldName: "naamHaarlak" as const,
    storageKey: "Haarspray"
  },
  {
    key: "mousse",
    title: "Mousse",
    options: mousseOptions,
    fieldName: "naamMousse" as const,
    storageKey: "Mousse"
  },
  {
    key: "droogshampoo",
    title: "Droogshampoo", 
    options: droogshampooOptions,
    fieldName: "naamDroogshampoo" as const,
    storageKey: "Droogshampoo"
  },
  {
    key: "gel",
    title: "Gel",
    options: gelOptions,
    fieldName: "naamGel" as const,
    storageKey: "Gel"
  },
  {
    key: "clayPaste",
    title: "Clay Paste",
    options: clayPasteOptions,
    fieldName: "naamClayPaste" as const,
    storageKey: "ClayPaste"
  },
  {
    key: "fiberPaste",
    title: "Fiber Paste",
    options: fiberPasteOptions,
    fieldName: "naamFiberPaste" as const,
    storageKey: "FiberPaste"
  },
  {
    key: "creamPaste",
    title: "Cream Paste",
    options: creamPasteOptions,
    fieldName: "naamCreamPaste" as const,
    storageKey: "CreamPaste"
  }
]

export default function Slide28({ updateFormData, formData, onNext }: Props) {
  // Initialize with defaults from formData or default to option 1
  const initialSelections: StylingProductSelections = {
    haarspray: formData.naamHaarlak || haarsprayOptions[0],
    mousse: formData.naamMousse || mousseOptions[0],
    droogshampoo: formData.naamDroogshampoo || droogshampooOptions[0],
    gel: formData.naamGel || gelOptions[0],
    clayPaste: formData.naamClayPaste || clayPasteOptions[0],
    fiberPaste: formData.naamFiberPaste || fiberPasteOptions[0],
    creamPaste: formData.naamCreamPaste || creamPasteOptions[0]
  }

  const [selectedChoices, setSelectedChoices] = useState<StylingProductSelections>(initialSelections)

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData.naamHaarlak) {
      updates.naamHaarlak = haarsprayOptions[0]
      localStorageUpdates.push({key: 'salonid:Haarspray', value: haarsprayOptions[0]})
    }
    
    if (!formData.naamMousse) {
      updates.naamMousse = mousseOptions[0]
      localStorageUpdates.push({key: 'salonid:Mousse', value: mousseOptions[0]})
    }
    
    if (!formData.naamDroogshampoo) {
      updates.naamDroogshampoo = droogshampooOptions[0]
      localStorageUpdates.push({key: 'salonid:Droogshampoo', value: droogshampooOptions[0]})
    }
    
    if (!formData.naamGel) {
      updates.naamGel = gelOptions[0]
      localStorageUpdates.push({key: 'salonid:Gel', value: gelOptions[0]})
    }
    
    if (!formData.naamClayPaste) {
      updates.naamClayPaste = clayPasteOptions[0]
      localStorageUpdates.push({key: 'salonid:ClayPaste', value: clayPasteOptions[0]})
    }
    
    if (!formData.naamFiberPaste) {
      updates.naamFiberPaste = fiberPasteOptions[0]
      localStorageUpdates.push({key: 'salonid:FiberPaste', value: fiberPasteOptions[0]})
    }
    
    if (!formData.naamCreamPaste) {
      updates.naamCreamPaste = creamPasteOptions[0]
      localStorageUpdates.push({key: 'salonid:CreamPaste', value: creamPasteOptions[0]})
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
        haarspray: formData.naamHaarlak || haarsprayOptions[0],
        mousse: formData.naamMousse || mousseOptions[0],
        droogshampoo: formData.naamDroogshampoo || droogshampooOptions[0],
        gel: formData.naamGel || gelOptions[0],
        clayPaste: formData.naamClayPaste || clayPasteOptions[0],
        fiberPaste: formData.naamFiberPaste || fiberPasteOptions[0],
        creamPaste: formData.naamCreamPaste || creamPasteOptions[0]
      }
      setSelectedChoices(finalSelections)
    }
  }, []) // Empty dependency array - run only on mount

  // Check if all seven products have selections
  const isComplete = useMemo(() => {
    return selectedChoices.haarspray && selectedChoices.mousse && selectedChoices.droogshampoo && 
           selectedChoices.gel && selectedChoices.clayPaste && selectedChoices.fiberPaste && selectedChoices.creamPaste
  }, [selectedChoices])

  const handleOptionSelect = (sectionKey: keyof StylingProductSelections, option: string) => {
    const newSelections = { ...selectedChoices, [sectionKey]: option }
    setSelectedChoices(newSelections)

    // Update formData with the selections
    const updates = {
      naamHaarlak: newSelections.haarspray,
      naamMousse: newSelections.mousse,
      naamDroogshampoo: newSelections.droogshampoo,
      naamGel: newSelections.gel,
      naamClayPaste: newSelections.clayPaste,
      naamFiberPaste: newSelections.fiberPaste,
      naamCreamPaste: newSelections.creamPaste
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const section = productSections.find(s => s.key === sectionKey)
      if (section) {
        localStorage.setItem(`salonid:${section.storageKey}`, option)
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      }
    } catch (error) {
      // localStorage not available, continue silently
    }

    // Don't auto-advance - use manual continue as specified in requirements
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Styling Producten - Kies de benaming
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de namen voor je styling producten. Deze producten zijn speciaal ontwikkeld om je haar te stylen, vorm te geven en de perfecte look te creëren.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één optie voor elk van de zeven producten. Alle producten moeten geselecteerd zijn om door te gaan.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.options.map((option, index) => {
                  const isSelected = selectedChoices[section.key as keyof StylingProductSelections] === option
                  return (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(section.key as keyof StylingProductSelections, option)}
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
            {isComplete ? "Alle zeven producten geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer alle zeven producten om door te gaan"}
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}