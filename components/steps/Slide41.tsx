"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type ColorClaimsSelections = {
  shampoo: string
  conditioner: string
  mask: string
}

const colorShampooClaims = [
  'Milde reiniging, verlengt de levensduur van haarkleuring en behoudt levendigheid',
  'Reinigt zachtjes zonder de kleur te vervagen',
  'Verrijkt met UV-filters om kleurvervaging door de zon te voorkomen',
  'Reinigt en hydrateert het haar, terwijl het de glans van gekleurd haar behoudt',
  'Versterkt en beschermt het haar tegen kleurverlies met milde reiniging',
  'Behoudt de diepte en rijkdom van de haarkleur en reinigt het haar mild',
  'Verzacht en versterkt gekleurd haar voor een gezonde, stralende uitstraling',
  'Verbetert de levendigheid en intensiteit van de haarkleur na elke wasbeurt',
  'Verbetert de algehele gezondheid van gekleurd haar',
  'Laat het haar zacht en beheerbaar aanvoelen met een levendige kleur'
]

const colorConditionerClaims = [
  'Helpt bij het behouden van een levendige en langdurige haarkleur',
  'Geschikt voor dagelijks gebruik zonder de kleur te vervagen',
  'Herstelt en beschermt het haar tegen UV-schade door de zon',
  'Hydrateert het haar en behoudt de glans van gekleurd haar',
  'Versterkt en beschermt het haar tegen kleurverlies',
  'Bevordert glans en elasticiteit in gekleurd haar',
  'Verbetert de zachtheid en geeft gekleurd haar een gezonde uitstraling',
  'Verbetert de levendigheid en intensiteit van de haarkleur',
  'Verbetert de algehele gezondheid van gekleurd haar',
  'Laat het haar zacht en beheerbaar aanvoelen met een levendige kleur'
]

const colorMaskClaims = [
  'Intensief verzorgend masker dat de haarkleur beschermt en verlengt',
  'Kleurintensiverende formule met UV-bescherming',
  'Diepwerkend masker voor optimaal kleurbehoud',
  'Voedt intensief terwijl het de kleurintensiteit versterkt',
  'Beschermt gekleurd haar tegen vervaging en externe invloeden',
  'Verbetert de glans en veerkracht van gekleurd haar',
  'Intensieve verzorging voor een langdurig levendige haarkleur',
  'Versterkt de kleurdiepte en verbetert de haarstructuur',
  'Herstelt de vitaliteit van gekleurd haar zonder kleurverlies',
  'Geeft gekleurd haar een intense verzorging en stralende glans'
]

const productSections = [
  {
    key: "shampoo",
    title: "Color Shampoo",
    claims: colorShampooClaims,
    fieldName: "standaardClaimColorShampoo" as const
  },
  {
    key: "conditioner", 
    title: "Color Conditioner",
    claims: colorConditionerClaims,
    fieldName: "standaardClaimColorConditioner" as const
  },
  {
    key: "mask", 
    title: "Color Mask",
    claims: colorMaskClaims,
    fieldName: "standaardClaimColorMask" as const
  }
]

export default function Slide41({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): ColorClaimsSelections => {
    return {
      shampoo: formData.colorClaims?.shampoo || formatClaimWithNumber(colorShampooClaims[0], 0),
      conditioner: formData.colorClaims?.conditioner || formatClaimWithNumber(colorConditionerClaims[0], 0),
      mask: formData.colorClaims?.mask || formatClaimWithNumber(colorMaskClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<ColorClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.colorClaims?.shampoo || !formData.colorClaims?.conditioner || !formData.colorClaims?.mask) {
      const defaults = {
        shampoo: formatClaimWithNumber(colorShampooClaims[0], 0),
        conditioner: formatClaimWithNumber(colorConditionerClaims[0], 0),
        mask: formatClaimWithNumber(colorMaskClaims[0], 0)
      }
      
      const updates = {
        colorClaims: {
          shampoo: formData.colorClaims?.shampoo || defaults.shampoo,
          conditioner: formData.colorClaims?.conditioner || defaults.conditioner,
          mask: formData.colorClaims?.mask || defaults.mask
        },
        standaardClaimColorShampoo: formData.standaardClaimColorShampoo || defaults.shampoo,
        standaardClaimColorConditioner: formData.standaardClaimColorConditioner || defaults.conditioner,
        standaardClaimColorMask: formData.standaardClaimColorMask || defaults.mask
      }
      
      updateFormData(updates)
      setSelectedClaims({
        shampoo: updates.colorClaims.shampoo,
        conditioner: updates.colorClaims.conditioner,
        mask: updates.colorClaims.mask
      })
    }
  }, [updateFormData, formData.colorClaims, formData.standaardClaimColorShampoo, formData.standaardClaimColorConditioner, formData.standaardClaimColorMask])

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedClaims.shampoo && selectedClaims.conditioner && selectedClaims.mask
  }, [selectedClaims])

  const handleClaimSelect = (sectionKey: keyof ColorClaimsSelections, claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { ...selectedClaims, [sectionKey]: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      colorClaims: newSelections,
      standaardClaimColorShampoo: newSelections.shampoo,
      standaardClaimColorConditioner: newSelections.conditioner,
      standaardClaimColorMask: newSelections.mask
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const storageKey = sectionKey === 'shampoo' ? 'ColorShampoo' : sectionKey === 'conditioner' ? 'ColorConditioner' : 'ColorMask'
      localStorage.setItem(`salonid:${storageKey}Claim`, formattedClaim)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Color - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claims voor je Color producten. Deze producten zijn speciaal ontwikkeld om gekleurde haren te beschermen 
            en de kleurintensiteit te behouden.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor elk product. Je kunt je selectie altijd nog aanpassen.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.claims.map((claim, index) => {
                  const formattedClaim = formatClaimWithNumber(claim, index)
                  const isSelected = selectedClaims[section.key as keyof ColorClaimsSelections] === formattedClaim
                  return (
                    <div
                      key={claim}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleClaimSelect(section.key as keyof ColorClaimsSelections, claim, index)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? "border-black bg-black" : "border-gray-300"
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className="text-gray-900 font-medium">
                            {index + 1}. {claim}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Terug
            </button>
            <button
              onClick={onNext}
              disabled={!isComplete}
              className={`px-6 py-3 rounded-md transition-colors ${
                isComplete
                  ? "bg-black text-white hover:bg-gray-800" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Doorgaan
            </button>
          </div>
          {!isComplete && (
            <p className="text-sm text-gray-500 mt-2 text-right">
              Selecteer een claim voor alle producten om door te gaan
            </p>
          )}
        </div>
      </section>
    </SlideContainer>
  )
}