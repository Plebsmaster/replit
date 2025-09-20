"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type MannenClaimsSelections = {
  shampoo: string
}

const mannenShampooClaims = [
  'Verfrissende shampoo speciaal ontwikkeld voor mannenhaar',
  'Geeft een energieke boost en fris gevoel',
  'Speciaal geformuleerd voor dagelijks gebruik',
  'Laat het haar gezond, sterk en veerkrachtig aanvoelen',
  'Bevat voedende ingrediënten voor sterker haar vanaf de wortel',
  'Stimuleert een gezonde haargroei door een schone hoofdhuid',
  'Biedt de perfecte balans tussen reiniging en verzorging',
  'Geeft een verkoelend effect voor direct fris resultaat',
  'Makkelijk uit te spoelen formule, snel en praktisch',
  'Krachtige reiniging en verzorging in één stap'
]

export default function Slide43({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): MannenClaimsSelections => {
    return {
      shampoo: formData.mannenClaims?.shampoo || formatClaimWithNumber(mannenShampooClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<MannenClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.mannenClaims?.shampoo) {
      const defaults = {
        shampoo: formatClaimWithNumber(mannenShampooClaims[0], 0)
      }
      
      const updates = {
        mannenClaims: {
          shampoo: formData.mannenClaims?.shampoo || defaults.shampoo
        },
        standaardClaimMannenShampoo: formData.standaardClaimMannenShampoo || defaults.shampoo
      }
      
      updateFormData(updates)
      setSelectedClaims({
        shampoo: updates.mannenClaims.shampoo
      })
    }
  }, [updateFormData, formData.mannenClaims, formData.standaardClaimMannenShampoo])

  // Check if product has selection (always true for single product with default)
  const isComplete = useMemo(() => {
    return selectedClaims.shampoo !== ''
  }, [selectedClaims])

  const handleClaimSelect = (claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { shampoo: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      mannenClaims: newSelections,
      standaardClaimMannenShampoo: formattedClaim
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      localStorage.setItem('salonid:MannenShampooClaim', formattedClaim)
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
          Mannen - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claim voor je Mannen Shampoo. Deze claim beschrijft de specifieke voordelen en werking van het product.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor Mannen Shampoo. Klik op "Doorgaan" wanneer je je claim hebt gekozen.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 text-left mb-4">Mannen Shampoo</h3>
            
            <div className="space-y-3">
              {mannenShampooClaims.map((claim, index) => {
                const formattedClaim = formatClaimWithNumber(claim, index)
                const isSelected = selectedClaims.shampoo === formattedClaim
                return (
                  <div
                    key={`shampoo-${index}`}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                      isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleClaimSelect(claim, index)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="text-gray-800 font-medium">{`${index + 1}. ${claim}`}</div>
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
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isComplete ? "Claim geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer een claim om door te gaan"}
          </p>
        </div>

        {/* Manual navigation buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Terug
          </button>
          <button
            onClick={onNext}
            disabled={!isComplete}
            className={`px-6 py-3 rounded-md transition-colors ${
              isComplete 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Doorgaan
          </button>
        </div>
      </section>
    </SlideContainer>
  )
}