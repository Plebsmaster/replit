"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { Leaf, Droplets, Shield, Grape, Wheat, Circle, Moon, Zap, Square } from "lucide-react"
import type { StepProps } from "@/lib/form/steps"

type CurlyGirlIngredients = {
  shampoo: string
  conditioner: string
  mask: string
}

type Props = StepProps

const ingredients = [
  { 
    name: "Aloë Vera", 
    description: "Kalmeert de hoofdhuid en geeft het haar een natuurlijke, stralende glans.", 
    icon: Leaf 
  },
  { 
    name: "Arganolie", 
    description: "Bevat essentiële vetzuren die zorgen voor diepe hydratie en verhoogde vitaliteit.", 
    icon: Droplets 
  },
  { 
    name: "Biotine", 
    description: "Versterkt het haar van wortel tot punt, waardoor het krachtiger en elastischer wordt.", 
    icon: Shield 
  },
  { 
    name: "Druivenpit Extract", 
    description: "Bevat krachtige antioxidanten die het haar voeden en beschermen.", 
    icon: Grape 
  },
  { 
    name: "Gehydrolyseerd Tarweproteïne", 
    description: "Versterkt elke haarlok van binnenuit voor sterker en gezonder haar.", 
    icon: Wheat 
  },
  { 
    name: "Jojoba-olie", 
    description: "Biedt intensieve hydratie zonder het haar zwaar te maken, voor een licht en luchtig gevoel.", 
    icon: Circle 
  },
  { 
    name: "Hyaluronzuur", 
    description: "Zorgt voor een intensieve hydratatieboost, waardoor het haar luxueus zacht en soepel aanvoelt.", 
    icon: Circle 
  },
  { 
    name: "Vitamine B5", 
    description: "Behoudt vocht in het haar en biedt bescherming tegen haarbreuk, voor gezond en sterk haar.", 
    icon: Moon 
  },
  { 
    name: "Vitamine C", 
    description: "Stimuleert de collageenproductie en verbetert de natuurlijke elasticiteit, voor veerkrachtiger haar.", 
    icon: Zap 
  },
  { 
    name: "Vitamine E", 
    description: "Bevordert de haargroei en geeft het haar een natuurlijke, gezonde glans.", 
    icon: Square 
  },
]

const productOptions: Record<string, typeof ingredients> = {
  "Curly Girl Shampoo": ingredients,
  "Curly Girl Conditioner": ingredients,
  "Curly Girl Mask": ingredients,
}

export default function Slide33({ updateFormData, formData }: Props) {
  // Smart persistence: use existing formData values or defaults
  const existingSelections = (formData?.curlyGirlIngredients as CurlyGirlIngredients) || {}
  
  const initialSelections: CurlyGirlIngredients = {
    shampoo: existingSelections.shampoo || "Hyaluronzuur",
    conditioner: existingSelections.conditioner || "Vitamine E",
    mask: existingSelections.mask || "Vitamine E",
  }

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({
    "Curly Girl Shampoo": initialSelections.shampoo,
    "Curly Girl Conditioner": initialSelections.conditioner,
    "Curly Girl Mask": initialSelections.mask,
  })

  const productTypes = useMemo(() => Object.keys(productOptions), [])

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData?.curlyGirlIngredients?.shampoo) {
      updates.curlyGirlIngredients = {
        ...formData?.curlyGirlIngredients,
        shampoo: "Hyaluronzuur"
      }
      updates.marketingIngredientenCurlyGirlShampoo = "Hyaluronzuur"
      localStorageUpdates.push({key: 'salonid:Curly Girl ShampooIngredient', value: "Hyaluronzuur"})
    }
    
    if (!formData?.curlyGirlIngredients?.conditioner) {
      updates.curlyGirlIngredients = {
        ...updates.curlyGirlIngredients,
        ...formData?.curlyGirlIngredients,
        conditioner: "Vitamine E"
      }
      updates.marketingIngredientenCurlyGirlConditioner = "Vitamine E"
      localStorageUpdates.push({key: 'salonid:Curly Girl ConditionerIngredient', value: "Vitamine E"})
    }
    
    if (!formData?.curlyGirlIngredients?.mask) {
      updates.curlyGirlIngredients = {
        ...updates.curlyGirlIngredients,
        ...formData?.curlyGirlIngredients,
        mask: "Vitamine E"
      }
      updates.marketingIngredientenCurlyGirlMask = "Vitamine E"
      localStorageUpdates.push({key: 'salonid:Curly Girl MaskIngredient', value: "Vitamine E"})
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

    // Update formData with normalized structure
    const updatedSelections: CurlyGirlIngredients = {
      shampoo: productType === "Curly Girl Shampoo" ? choice : selectedChoices["Curly Girl Shampoo"],
      conditioner: productType === "Curly Girl Conditioner" ? choice : selectedChoices["Curly Girl Conditioner"],
      mask: productType === "Curly Girl Mask" ? choice : selectedChoices["Curly Girl Mask"],
    }

    updateFormData({ 
      curlyGirlIngredients: updatedSelections,
      // Also update the marketing ingredient fields for database mapping
      marketingIngredientenCurlyGirlShampoo: updatedSelections.shampoo,
      marketingIngredientenCurlyGirlConditioner: updatedSelections.conditioner,
      marketingIngredientenCurlyGirlMask: updatedSelections.mask,
    })

    // Update localStorage
    try {
      localStorage.setItem(`salonid:${productType}Ingredient`, choice)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Curly Girl - Kies de ingrediënten
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Selecteer voor elk van de drie Curly Girl producten het gewenste ingrediënt dat wordt uitgelicht in de marketing.
          </p>
        </div>

        <div className="space-y-12">
          {productTypes.map((productType) => (
            <div key={productType} className="space-y-6">
              <h3 className={getTypographyClasses("subtitle", { alignment: "left" })}>
                {productType}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productOptions[productType].map((ingredient) => {
                  const Icon = ingredient.icon
                  const isSelected = selectedChoices[productType] === ingredient.name
                  
                  return (
                    <div
                      key={ingredient.name}
                      onClick={() => handleOptionSelect(productType, ingredient.name)}
                      className={`
                        relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 min-h-[160px] flex flex-col
                        ${isSelected 
                          ? 'border-black bg-black text-white shadow-lg' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}

                      {/* Icon and title */}
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-700'}`} />
                        <h4 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {ingredient.name}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className={`text-sm flex-1 ${isSelected ? 'text-gray-200' : 'text-gray-600'}`}>
                        {ingredient.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Current selections summary */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Huidige selecties:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productTypes.map((productType) => (
              <div key={productType} className="text-center">
                <p className="text-sm text-gray-600 mb-1">{productType}</p>
                <p className="font-medium text-gray-900">{selectedChoices[productType]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}