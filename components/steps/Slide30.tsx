"use client"

import { useState, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ChoiceCard } from "@/components/ui/choice-card"
import { Leaf, Droplets, Shield, Grape, Wheat, Circle, Moon, Zap, Square } from "lucide-react"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps & {
  selectedIngredient?: string | null
  onSelectionChange?: (ingredient: string | null) => void
}

export default function Slide12({ onBack, onNext, updateFormData, formData, selectedIngredient: globalSelectedIngredient, onSelectionChange }: Props) {
  const [localSelectedIngredient, setLocalSelectedIngredient] = useState<string | null>(globalSelectedIngredient || null)
  const selectedIngredient = globalSelectedIngredient !== undefined ? globalSelectedIngredient : localSelectedIngredient
  const ingredients = useMemo(
    () => [
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
    ],
    [],
  )

  const handleChoose = (ingredientId: string, name: string) => {
    setLocalSelectedIngredient(ingredientId)
    onSelectionChange?.(ingredientId)

    // Update form data with the selected ingredient (single selection)
    updateFormData({ 
      ingredients: [ingredientId]
    })

    try {
      localStorage.setItem("salonid:ingredientChoice", ingredientId)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Auto-progress using microtask to allow state updates to complete
    queueMicrotask(() => {
      onNext()
    })
  }


  return (
    <SlideContainer width="extraWide">
      <section>
        <div className="mb-8">
          <h2 className={getTypographyClasses("title", { alignment: "left" })}>Kies jouw ingredient</h2>
          <div className="max-w-2xl space-y-4">
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Er zijn verschillende ingrediënten die worden gebruikt voor de diverse soorten shampoos en conditioners.
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
              Selecteer het ingredient dat het beste past bij jouw haarverzorgingsbehoeften.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient) => {
            const IconComponent = ingredient.icon
            return (
              <IngredientCard
                key={ingredient.id}
                id={ingredient.id}
                name={ingredient.name}
                description={ingredient.description}
                icon={IconComponent}
                isSelected={selectedIngredient === ingredient.id}
                onClick={() => handleChoose(ingredient.id, ingredient.name)}
              />
            )
          })}
        </div>
      </section>
    </SlideContainer>
  )
}

interface IngredientCardProps {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isSelected: boolean
  onClick: () => void
}

function IngredientCard({ name, description, icon: IconComponent, isSelected, onClick }: IngredientCardProps) {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className={`relative rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 bg-white border-2 p-6 h-full ${
          isSelected ? "ring-4 ring-gray-900 ring-offset-2 border-gray-900" : "border-gray-200 hover:border-gray-300"
        }`}
      >
        {isSelected && (
          <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg">
            <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 mt-1">
              <IconComponent className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className={getTypographyClasses("cardTitle", { alignment: "left" })}>{name}</h4>
            </div>
          </div>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
