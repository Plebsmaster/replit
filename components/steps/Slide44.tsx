"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type HaarseurumClaimsSelections = {
  serum: string
}

const haarserumClaims = [
  'Geeft directe glans en zachtheid',
  'Verrijkt met natuurlijke oliën voor diepe voeding',
  'Herstelt beschadigd en droog haar van binnenuit',
  'Creëert een tijdloze, elegante glans die de hele dag houdt',
  'Creëert een langdurige, gezonde glans',
  'Verrijkt met actieve ingrediënten voor een diepe verzorging',
  'Maakt het haar direct doorkambaar en zijdezacht',
  'Geeft het haar een professionele salon-finish',
  'Versterkt de haarvezel en voorkomt breuk en gespleten punten',
  'Zorgt voor een fluweelzachte finish zonder te verzwaren'
]

export default function Slide44({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): HaarseurumClaimsSelections => {
    return {
      serum: formData.haarseurumClaims?.serum || formatClaimWithNumber(haarserumClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<HaarseurumClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.haarseurumClaims?.serum) {
      const defaults = {
        serum: formatClaimWithNumber(haarserumClaims[0], 0)
      }
      
      const updates = {
        haarseurumClaims: {
          serum: formData.haarseurumClaims?.serum || defaults.serum
        },
        standaardClaimHaarserum: formData.standaardClaimHaarserum || defaults.serum
      }
      
      updateFormData(updates)
      setSelectedClaims({
        serum: updates.haarseurumClaims.serum
      })
    }
  }, [updateFormData, formData.haarseurumClaims, formData.standaardClaimHaarserum])

  // Check if product has selection (always true for single product with default)
  const isComplete = useMemo(() => {
    return selectedClaims.serum !== ''
  }, [selectedClaims])

  const handleClaimSelect = (claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { serum: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      haarseurumClaims: newSelections,
      standaardClaimHaarserum: formattedClaim
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      localStorage.setItem('salonid:HaarserumClaim', formattedClaim)
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
          Haarserum - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claim voor je Haarserum. Deze claim beschrijft de specifieke voordelen en werking van het product.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor Haarserum. Klik op "Doorgaan" wanneer je je claim hebt gekozen.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 text-left mb-4">Haarserum</h3>
            
            <div className="space-y-3">
              {haarserumClaims.map((claim, index) => {
                const formattedClaim = formatClaimWithNumber(claim, index)
                const isSelected = selectedClaims.serum === formattedClaim
                return (
                  <div
                    key={`serum-${index}`}
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