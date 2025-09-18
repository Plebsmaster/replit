"use client"

import { Leaf, Droplets, Shield, Grape, Wheat, Circle, Moon, Zap, Square } from "lucide-react"
import { getTypographyClasses } from "@/lib/typography"
import type { FormData } from "@/lib/form/schema"

interface Slide12Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Slide12({ formData, updateFormData, onNext, onBack }: Slide12Props) {
  const ingredients = [
    {
      id: "aloe-vera",
      name: "Aloë Vera",
      description: "Kalmeert de hoofdhuid en geeft het haar een natuurlijke, stralende glans.",
      icon: Leaf,
    },
    {
      id: "arganolie",
      name: "Arganolie",
      description: "Bevat essentiële vetzuren die zorgen voor diepe hydratie en verhoogde vitaliteit.",
      icon: Droplets,
    },
    {
      id: "biotine",
      name: "Biotine",
      description: "Versterkt het haar van wortel tot punt, waardoor het krachtiger en elastischer wordt.",
      icon: Shield,
    },
    {
      id: "druivenpit-extract",
      name: "Druivenpit Extract",
      description: "Bevat krachtige antioxidanten die het haar voeden en beschermen.",
      icon: Grape,
    },
    {
      id: "gehydrolyseerd-tarweproteine",
      name: "Gehydrolyseerd Tarweproteïne",
      description: "Versterkt elke haarlok van binnenuit voor sterker en gezonder haar.",
      icon: Wheat,
    },
    {
      id: "jojoba-olie",
      name: "Jojoba-olie",
      description: "Biedt intensieve hydratie zonder het haar zwaar te maken, voor een licht en luchtig gevoel.",
      icon: Circle,
    },
    {
      id: "hyaluronzuur",
      name: "Hyaluronzuur",
      description: "Zorgt voor een intensieve hydratatieboost, waardoor het haar luxueus zacht en soepel aanvoelt.",
      icon: Circle,
    },
    {
      id: "vitamine-b5",
      name: "Vitamine B5",
      description: "Behoudt vocht in het haar en biedt bescherming tegen haarbreuk, voor gezond en sterk haar.",
      icon: Moon,
    },
    {
      id: "vitamine-c",
      name: "Vitamine C",
      description:
        "Stimuleert de collageenproductie en verbetert de natuurlijke elasticiteit, voor veerkrachtiger haar.",
      icon: Zap,
    },
    {
      id: "vitamine-e",
      name: "Vitamine E",
      description: "Bevordert de haargroei en geeft het haar een natuurlijke, gezonde glans.",
      icon: Square,
    },
  ]

  const toggleIngredient = (ingredientId: string) => {
    const currentIngredients = formData.ingredients
    const isSelected = currentIngredients.includes(ingredientId)

    if (isSelected) {
      updateFormData({
        ingredients: currentIngredients.filter((id) => id !== ingredientId),
      })
    } else {
      updateFormData({
        ingredients: [...currentIngredients, ingredientId],
      })
    }
  }


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={getTypographyClasses("title", { alignment: "center" })}>No Yellow - Ingredient</h2>
        <p className={getTypographyClasses("paragraph", { alignment: "center", color: "text-gray-700" })}>
          Er zijn verschillende ingrediënten die worden gebruikt voor de diverse soorten shampoos en conditioners. Maak
          een keuze uit de selectie hieronder
        </p>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className={getTypographyClasses("cardTitle", { alignment: "left" })}>No Yellow Conditioner</h3>

        <div className="space-y-4">
          {ingredients.map((ingredient) => {
            const IconComponent = ingredient.icon
            const isSelected = formData.ingredients.includes(ingredient.id)

            return (
              <div
                key={ingredient.id}
                onClick={() => toggleIngredient(ingredient.id)}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className={getTypographyClasses("cardTitle", { alignment: "left" })}>{ingredient.name}</h4>
                  <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
                    {ingredient.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? "border-black bg-black" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
