"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { Leaf, Droplets, Shield, Square } from "lucide-react"
import type { StepProps } from "@/lib/form/steps"

type StylingProductsIngredients = {
  haarlak: string
  mousse: string
  droogshampoo: string
  gel: string
  clayPaste: string
  fiberPaste: string
}

type Props = StepProps

const ingredients = [
  { 
    name: "Arganolie", 
    description: "Bevat essentiële vetzuren die zorgen voor diepe hydratie en verhoogde vitaliteit.", 
    icon: Droplets 
  },
  { 
    name: "UV Filter", 
    description: "Biedt bescherming tegen schadelijke UV-stralen en behoudt de kleurintensiteit.", 
    icon: Shield 
  },
  { 
    name: "Vitamine B5", 
    description: "Behoudt vocht in het haar en biedt bescherming tegen haarbreuk, voor gezond en sterk haar.", 
    icon: Leaf 
  },
  { 
    name: "Vitamine E", 
    description: "Bevordert de haargroei en geeft het haar een natuurlijke, gezonde glans.", 
    icon: Square 
  },
]

const productOptions: Record<string, typeof ingredients> = {
  "Haarlak": ingredients,
  "Mousse": ingredients,
  "Droogshampoo": ingredients,
  "Gel": ingredients,
  "Clay Paste": ingredients,
  "Fiber Paste": ingredients,
}

export default function Slide36({ updateFormData, formData }: Props) {
  // Smart persistence: use existing formData values or defaults
  const existingSelections = (formData?.stylingProductsIngredients as StylingProductsIngredients) || {}
  
  const initialSelections: StylingProductsIngredients = {
    haarlak: existingSelections.haarlak || "UV Filter",
    mousse: existingSelections.mousse || "Vitamine B5",
    droogshampoo: existingSelections.droogshampoo || "Arganolie",
    gel: existingSelections.gel || "Vitamine B5",
    clayPaste: existingSelections.clayPaste || "Vitamine E",
    fiberPaste: existingSelections.fiberPaste || "Vitamine E",
  }

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({
    "Haarlak": initialSelections.haarlak,
    "Mousse": initialSelections.mousse,
    "Droogshampoo": initialSelections.droogshampoo,
    "Gel": initialSelections.gel,
    "Clay Paste": initialSelections.clayPaste,
    "Fiber Paste": initialSelections.fiberPaste,
  })

  const productTypes = useMemo(() => Object.keys(productOptions), [])

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData?.stylingProductsIngredients?.haarlak) {
      updates.stylingProductsIngredients = {
        ...formData?.stylingProductsIngredients,
        haarlak: "UV Filter"
      }
      updates.marketingIngredientenHaarlak = "UV Filter"
      localStorageUpdates.push({key: 'salonid:HaarlakIngredient', value: "UV Filter"})
    }
    
    if (!formData?.stylingProductsIngredients?.mousse) {
      updates.stylingProductsIngredients = {
        ...updates.stylingProductsIngredients,
        ...formData?.stylingProductsIngredients,
        mousse: "Vitamine B5"
      }
      updates.marketingIngredientenMousse = "Vitamine B5"
      localStorageUpdates.push({key: 'salonid:MousseIngredient', value: "Vitamine B5"})
    }
    
    if (!formData?.stylingProductsIngredients?.droogshampoo) {
      updates.stylingProductsIngredients = {
        ...updates.stylingProductsIngredients,
        ...formData?.stylingProductsIngredients,
        droogshampoo: "Arganolie"
      }
      updates.marketingIngredientenDroogshampoo = "Arganolie"
      localStorageUpdates.push({key: 'salonid:DroogshampooIngredient', value: "Arganolie"})
    }
    
    if (!formData?.stylingProductsIngredients?.gel) {
      updates.stylingProductsIngredients = {
        ...updates.stylingProductsIngredients,
        ...formData?.stylingProductsIngredients,
        gel: "Vitamine B5"
      }
      updates.marketingIngredientenGel = "Vitamine B5"
      localStorageUpdates.push({key: 'salonid:GelIngredient', value: "Vitamine B5"})
    }
    
    if (!formData?.stylingProductsIngredients?.clayPaste) {
      updates.stylingProductsIngredients = {
        ...updates.stylingProductsIngredients,
        ...formData?.stylingProductsIngredients,
        clayPaste: "Vitamine E"
      }
      updates.marketingIngredientenClayPaste = "Vitamine E"
      localStorageUpdates.push({key: 'salonid:Clay PasteIngredient', value: "Vitamine E"})
    }
    
    if (!formData?.stylingProductsIngredients?.fiberPaste) {
      updates.stylingProductsIngredients = {
        ...updates.stylingProductsIngredients,
        ...formData?.stylingProductsIngredients,
        fiberPaste: "Vitamine E"
      }
      updates.marketingIngredientenFiberPaste = "Vitamine E"
      localStorageUpdates.push({key: 'salonid:Fiber PasteIngredient', value: "Vitamine E"})
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
    }
  }, []) // Empty dependency array - run only on mount

  const handleOptionSelect = (productType: string, choice: string) => {
    setSelectedChoices(prev => ({ ...prev, [productType]: choice }))

    // Map display names to form field names
    const fieldMapping: Record<string, string> = {
      "Haarlak": "haarlak",
      "Mousse": "mousse", 
      "Droogshampoo": "droogshampoo",
      "Gel": "gel",
      "Clay Paste": "clayPaste",
      "Fiber Paste": "fiberPaste",
    }

    // Map display names to marketing field names
    const marketingFieldMapping: Record<string, string> = {
      "Haarlak": "marketingIngredientenHaarlak",
      "Mousse": "marketingIngredientenMousse",
      "Droogshampoo": "marketingIngredientenDroogshampoo", 
      "Gel": "marketingIngredientenGel",
      "Clay Paste": "marketingIngredientenClayPaste",
      "Fiber Paste": "marketingIngredientenFiberPaste",
    }

    const fieldName = fieldMapping[productType]
    const marketingFieldName = marketingFieldMapping[productType]
    
    if (fieldName && marketingFieldName) {
      // Update form data with new selection
      const updates = {
        stylingProductsIngredients: {
          ...formData?.stylingProductsIngredients,
          [fieldName]: choice
        },
        [marketingFieldName]: choice
      }
      
      updateFormData(updates)

      // Update localStorage
      try {
        localStorage.setItem(`salonid:${productType}Ingredient`, choice)
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (error) {
        // localStorage not available, continue silently
      }
    }
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Styling Products - Kies de ingrediënten
        </h2>

        <div className="max-w-[760px] space-y-8 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Selecteer voor elk styling product het gewenste ingrediënt dat de unieke eigenschappen van jouw productlijn benadrukt.
          </p>

          {productTypes.map((productType) => {
            const options = productOptions[productType] || []
            const selectedChoice = selectedChoices[productType]

            return (
              <div key={productType} className="space-y-4">
                <h3 className={getTypographyClasses("cardTitle", { alignment: "left" })}>
                  {productType}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map(({ name, description, icon: Icon }) => {
                    const isSelected = selectedChoice === name
                    
                    return (
                      <div
                        key={`${productType}-${name}`}
                        onClick={() => handleOptionSelect(productType, name)}
                        className={`
                          relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                          ${isSelected 
                            ? 'border-blue-500 bg-blue-50 shadow-lg' 
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          }
                        `}
                      >
                        {/* Selection indicator */}
                        <div className="absolute top-4 right-4">
                          <div className={`
                            w-6 h-6 rounded-full border-2 transition-all duration-200
                            ${isSelected 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'bg-white border-gray-300'
                            }
                          `}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-start space-x-4 pr-8">
                          <div className={`
                            p-3 rounded-lg transition-all duration-200
                            ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}
                          `}>
                            <Icon className={`
                              h-6 w-6 transition-all duration-200
                              ${isSelected ? 'text-blue-600' : 'text-gray-600'}
                            `} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`
                              text-lg font-semibold mb-2 transition-all duration-200
                              ${isSelected ? 'text-blue-900' : 'text-gray-900'}
                            `}>
                              {name}
                            </h4>
                            <p className={`
                              text-sm leading-relaxed transition-all duration-200
                              ${isSelected ? 'text-blue-700' : 'text-gray-600'}
                            `}>
                              {description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </SlideContainer>
  )
}