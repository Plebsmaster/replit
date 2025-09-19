"use client"

import { useState, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { ingredientsContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function IngredientsSelector({ formData, updateFormData, stepKey }: StepProps & { stepKey?: string }) {
  const config = ingredientsContent[stepKey as keyof typeof ingredientsContent]
  if (!config) {
    console.error(`No config found for ingredients step: ${stepKey}`)
    return null
  }

  // Initialize selections from formData
  const initialSelections = config.products.reduce((acc: Record<string, string>, product: any) => {
    const existingValue = (formData as any)[product.fieldName]
    acc[product.key] = existingValue || product.defaultIngredient
    return acc
  }, {} as Record<string, string>)

  const [selectedChoices, setSelectedChoices] = useState(initialSelections)

  // Persist default selections on mount
  useEffect(() => {
    const updates: any = {}
    const localStorageUpdates: Array<{key: string, value: string}> = []
    
    config.products.forEach((product: any) => {
      if (!(formData as any)[product.fieldName]) {
        updates[product.fieldName] = product.defaultIngredient
        localStorageUpdates.push({
          key: `salonid:${product.key}Ingredient`,
          value: product.defaultIngredient
        })
      }
    })
    
    if (Object.keys(updates).length > 0) {
      updateFormData(updates)
      
      try {
        localStorageUpdates.forEach(({key, value}) => {
          localStorage.setItem(key, value)
        })
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (error) {
        // localStorage not available
      }
    }
  }, [])

  const handleIngredientSelect = (productKey: string, ingredient: string) => {
    const newSelections = { ...selectedChoices, [productKey]: ingredient }
    setSelectedChoices(newSelections)

    // Find product config
    const product = config.products.find((p: any) => p.key === productKey)
    if (!product) return

    // Update formData
    updateFormData({ [product.fieldName]: ingredient })

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:${productKey}Ingredient`, ingredient)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available
    }
  }

  const renderIngredientIcon = (iconName: string) => {
    // Simple icon representation - in real app, would use actual icons
    return <div className="w-6 h-6 rounded-full bg-gray-300" />
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          {config.title}
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            {config.description}
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            {config.instructions}
          </p>
        </div>

        <div className="space-y-8">
          {config.products.map((product: any) => (
            <div key={product.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{product.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.ingredients.map((ingredient: any) => {
                  const isSelected = selectedChoices[product.key] === ingredient.name
                  return (
                    <div
                      key={`${product.key}-${ingredient.name}`}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                        isSelected ? "border-black bg-gray-50 shadow-md" : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => handleIngredientSelect(product.key, ingredient.name)}
                    >
                      <div className="flex items-start space-x-3">
                        {renderIngredientIcon(ingredient.icon)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{ingredient.description}</p>
                        </div>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-black flex-shrink-0 mt-1" />
                        )}
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