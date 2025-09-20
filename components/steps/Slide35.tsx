"use client"

import { useState, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { Droplets, Shield, Moon, Square } from "lucide-react"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

const ingredients = [
  { 
    name: "Arganolie", 
    description: "Bevat essentiële vetzuren die zorgen voor diepe hydratie en verhoogde vitaliteit.", 
    icon: Droplets 
  },
  { 
    name: "UV Filter", 
    description: "Beschermt het haar tegen schadelijke UV-straling en voorkomt verkleuring.", 
    icon: Shield 
  },
  { 
    name: "Vitamine B5", 
    description: "Behoudt vocht in het haar en biedt bescherming tegen haarbreuk, voor gezond en sterk haar.", 
    icon: Moon 
  },
  { 
    name: "Vitamine E", 
    description: "Bevordert de haargroei en geeft het haar een natuurlijke, gezonde glans.", 
    icon: Square 
  },
]

export default function Slide35({ updateFormData, formData }: Props) {
  // Smart persistence: use existing formData value or default
  const existingSelection = formData?.haarserumIngredient || "Vitamine B5"
  
  const [selectedChoice, setSelectedChoice] = useState<string>(existingSelection)

  // Persist default selection on mount to ensure it's saved even without user interaction
  useEffect(() => {
    // Only set defaults for missing fields
    if (!formData?.haarserumIngredient) {
      const updates = {
        haarserumIngredient: "Vitamine B5",
        marketingIngredientenHaarserum: "Vitamine B5"
      }
      
      updateFormData(updates)
      
      // Set localStorage for persistence
      try {
        localStorage.setItem('salonid:HaarserumIngredient', "Vitamine B5")
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (error) {
        // localStorage not available, continue silently
      }
    }
  }, []) // Empty dependency array - run only on mount

  const handleOptionSelect = (choice: string) => {
    setSelectedChoice(choice)

    // Update formData with the selected ingredient
    updateFormData({ 
      haarserumIngredient: choice,
      // Also update the marketing ingredient field for database mapping
      marketingIngredientenHaarserum: choice
    })

    // Persist to localStorage
    try {
      localStorage.setItem('salonid:HaarserumIngredient', choice)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Haarserum - Kies de ingrediënten
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Selecteer het gewenste ingrediënt voor jouw Haarserum. Elk ingrediënt biedt unieke voordelen voor de haarverzorging.
          </p>
        </div>

        {/* Single Product Section: Haarserum */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Haarserum</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ingredients.map((ingredient) => {
                const IconComponent = ingredient.icon
                const isSelected = selectedChoice === ingredient.name
                
                return (
                  <div
                    key={ingredient.name}
                    onClick={() => handleOptionSelect(ingredient.name)}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Selection indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected 
                          ? 'bg-black border-black' 
                          : 'border-gray-300 bg-white'
                      }`} />
                    </div>
                    
                    {/* Ingredient content */}
                    <div className="pr-8">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {ingredient.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geselecteerd ingrediënt:</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Haarserum:</span>
            <span className="font-medium text-gray-900">
              {selectedChoice}
            </span>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}