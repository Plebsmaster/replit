"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type StylingClaimsSelections = {
  haarlak: string
  mousse: string
  droogshampoo: string
}

const haarlakClaims = [
  'Sterk fixerende haarspray voor een natuurlijke uitstraling en langdurige hold',
  'Biedt langdurige, flexibele fixatie zonder het haar hard te maken',
  'Laat geen witte resten achter en is gemakkelijk uit te borstelen',
  'Droogt snel voor een onmiddellijke sterke fixatie',
  'Houdt het haar de hele dag perfect in model'
]

const mousseClaims = [
  'Geeft fijn en futloos haar meer volume en body',
  'Creëer moeiteloos volle en gedefinieerde kapsels met volume en controle',
  'Versterkt en definieert krullen zonder ze te verzwaren',
  'Luchtige, gewichtloze formule die volume geeft zonder het haar te verzwaren',
  'Verbetert de textuur en beheersbaarheid van het haar'
]

const droogshampooClaims = [
  'Zorgt direct voor een fris gevoel en geeft het haar extra volume en textuur',
  'Verfrist het haar onmiddellijk en absorbeert overtollige olie',
  'Frist je haar op en zorgt voor een levendige look',
  'Revitaliseert en geeft het haar een schone, frisse uitstraling',
  'Verrijkt met een frisse en subtiele geur'
]

const productSections = [
  {
    key: "haarlak",
    title: "Haarlak (Hair Spray)",
    claims: haarlakClaims,
    fieldName: "standaardClaimHaarlak" as const
  },
  {
    key: "mousse", 
    title: "Mousse",
    claims: mousseClaims,
    fieldName: "standaardClaimMousse" as const
  },
  {
    key: "droogshampoo", 
    title: "Droogshampoo (Dry Shampoo)",
    claims: droogshampooClaims,
    fieldName: "standaardClaimDroogShampoo" as const
  }
]

export default function Slide45({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): StylingClaimsSelections => {
    return {
      haarlak: formData.stylingClaims?.haarlak || formatClaimWithNumber(haarlakClaims[0], 0),
      mousse: formData.stylingClaims?.mousse || formatClaimWithNumber(mousseClaims[0], 0),
      droogshampoo: formData.stylingClaims?.droogshampoo || formatClaimWithNumber(droogshampooClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<StylingClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.stylingClaims?.haarlak || !formData.stylingClaims?.mousse || !formData.stylingClaims?.droogshampoo) {
      const defaults = {
        haarlak: formatClaimWithNumber(haarlakClaims[0], 0),
        mousse: formatClaimWithNumber(mousseClaims[0], 0),
        droogshampoo: formatClaimWithNumber(droogshampooClaims[0], 0)
      }
      
      const updates = {
        stylingClaims: {
          haarlak: formData.stylingClaims?.haarlak || defaults.haarlak,
          mousse: formData.stylingClaims?.mousse || defaults.mousse,
          droogshampoo: formData.stylingClaims?.droogshampoo || defaults.droogshampoo
        },
        standaardClaimHaarlak: formData.standaardClaimHaarlak || defaults.haarlak,
        standaardClaimMousse: formData.standaardClaimMousse || defaults.mousse,
        standaardClaimDroogShampoo: formData.standaardClaimDroogShampoo || defaults.droogshampoo
      }
      
      updateFormData(updates)
      setSelectedClaims({
        haarlak: updates.stylingClaims.haarlak,
        mousse: updates.stylingClaims.mousse,
        droogshampoo: updates.stylingClaims.droogshampoo
      })
    }
  }, [updateFormData, formData.stylingClaims, formData.standaardClaimHaarlak, formData.standaardClaimMousse, formData.standaardClaimDroogShampoo])

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedClaims.haarlak && selectedClaims.mousse && selectedClaims.droogshampoo
  }, [selectedClaims])

  const handleClaimSelect = (sectionKey: keyof StylingClaimsSelections, claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { ...selectedClaims, [sectionKey]: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      stylingClaims: newSelections,
      standaardClaimHaarlak: newSelections.haarlak,
      standaardClaimMousse: newSelections.mousse,
      standaardClaimDroogShampoo: newSelections.droogshampoo
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:Styling${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}Claim`, formattedClaim)
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
          Styling - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claims voor je styling producten. Deze claims beschrijven de specifieke voordelen en werking van elk product.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor elk product. Klik op "Doorgaan" wanneer je alle claims hebt gekozen.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.claims.map((claim, index) => {
                  const formattedClaim = formatClaimWithNumber(claim, index)
                  const isSelected = selectedClaims[section.key as keyof StylingClaimsSelections] === formattedClaim
                  return (
                    <div
                      key={`${section.key}-${index}`}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleClaimSelect(section.key as keyof StylingClaimsSelections, claim, index)}
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
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isComplete ? "Alle claims geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer claims voor alle producten om door te gaan"}
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