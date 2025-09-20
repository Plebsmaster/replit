"use client"

import { useState, useMemo, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { Leaf, Droplets, Shield, Grape, Wheat, Circle, Moon, Zap, Square } from "lucide-react"
import type { StepProps } from "@/lib/form/steps"

type RepairIngredients = {
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
  "Repair Shampoo": ingredients,
  "Repair Conditioner": ingredients,
  "Repair Mask": ingredients,
}

export default function Slide31({ updateFormData, formData }: Props) {
  // Smart persistence: use existing formData values or defaults
  const existingSelections = (formData?.repairIngredients as RepairIngredients) || {}
  
  const initialSelections: RepairIngredients = {
    shampoo: existingSelections.shampoo || "Gehydrolyseerd Tarweproteïne",
    conditioner: existingSelections.conditioner || "Vitamine E",
    mask: existingSelections.mask || "Vitamine B5",
  }

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({
    "Repair Shampoo": initialSelections.shampoo,
    "Repair Conditioner": initialSelections.conditioner,
    "Repair Mask": initialSelections.mask,
  })

  const productTypes = useMemo(() => Object.keys(productOptions), [])

  // Persist default selections on mount to ensure they're saved even without user interaction
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    // Check each field individually and only set defaults for missing ones
    if (!formData?.repairIngredients?.shampoo) {
      updates.repairIngredients = {
        ...formData?.repairIngredients,
        shampoo: "Gehydrolyseerd Tarweproteïne"
      }
      updates.marketingIngredientenRepairShampoo = "Gehydrolyseerd Tarweproteïne"
      localStorageUpdates.push({key: 'salonid:Repair ShampooIngredient', value: "Gehydrolyseerd Tarweproteïne"})
    }
    
    if (!formData?.repairIngredients?.conditioner) {
      updates.repairIngredients = {
        ...updates.repairIngredients,
        ...formData?.repairIngredients,
        conditioner: "Vitamine E"
      }
      updates.marketingIngredientenRepairConditioner = "Vitamine E"
      localStorageUpdates.push({key: 'salonid:Repair ConditionerIngredient', value: "Vitamine E"})
    }
    
    if (!formData?.repairIngredients?.mask) {
      updates.repairIngredients = {
        ...updates.repairIngredients,
        ...formData?.repairIngredients,
        mask: "Vitamine B5"
      }
      updates.marketingIngredientenRepairMask = "Vitamine B5"
      localStorageUpdates.push({key: 'salonid:Repair MaskIngredient', value: "Vitamine B5"})
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
    const updatedSelections: RepairIngredients = {
      shampoo: productType === "Repair Shampoo" ? choice : selectedChoices["Repair Shampoo"],
      conditioner: productType === "Repair Conditioner" ? choice : selectedChoices["Repair Conditioner"],
      mask: productType === "Repair Mask" ? choice : selectedChoices["Repair Mask"],
    }

    updateFormData({ 
      repairIngredients: updatedSelections,
      // Also update the marketing ingredient fields for database mapping
      marketingIngredientenRepairShampoo: productType === "Repair Shampoo" ? choice : formData.marketingIngredientenRepairShampoo,
      marketingIngredientenRepairConditioner: productType === "Repair Conditioner" ? choice : formData.marketingIngredientenRepairConditioner,
      marketingIngredientenRepairMask: productType === "Repair Mask" ? choice : formData.marketingIngredientenRepairMask,
    })

    // Persist to localStorage with correct keys
    try {
      localStorage.setItem(`salonid:${productType}Ingredient`, choice)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }

    // Don't auto-advance - use manual continue pattern
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Repair - Kies de ingrediënten
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Er zijn verschillende ingrediënten die worden gebruikt voor de diverse soorten shampoos, conditioners en maskers.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer het ingrediënt dat het beste past bij jouw haarverzorgingsbehoeften voor elk product.
          </p>
        </div>

        <div className="space-y-8">
          {productTypes.map((productType) => (
            <div key={productType}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{productType}</h3>
              
              <div className="space-y-3 mt-4">
                {productOptions[productType].map((ingredient) => {
                  const selected = selectedChoices[productType] === ingredient.name
                  const IconComponent = ingredient.icon
                  
                  return (
                    <div
                      key={ingredient.name}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        selected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleOptionSelect(productType, ingredient.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-left">{ingredient.name}</h4>
                            <p className="text-sm text-gray-600 text-left mt-1">
                              {ingredient.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 ml-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selected 
                                ? "border-black bg-black" 
                                : "border-gray-300"
                            }`}
                          >
                            {selected && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}