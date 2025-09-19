"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type NoYellowClaimsSelections = {
  shampoo: string
  conditioner: string
}

const noYellowShampooClaims = [
  'Reinigt, hydrateert en verheldert geblondeerd, blond en grijs haar',
  'Verhelderende en neutraliserende shampoo speciaal voor blond en grijs haar',
  'Toningshampoo voor grijs, blond en geblondeerd haar',
  'Milde reiniging en verheldering van blonde en grijze tinten',
  'Reinigt en hydrateert het haar, terwijl het warme tinten in blond en grijs haar elimineert',
  'Reinigt het haar en verwijdert onmiddellijk gele tinten uit blond en grijs haar',
  'Vermindert de warme, gele tinten in blond haar en biedt milde reiniging',
  'Reinigt, verbetert de elasticiteit en behoudt de koele tint en glans van blond en grijs haar',
  'Reinigt het haar, beschermt tegen externe schade en behoudt de koele tint',
  'Biedt een langdurige, stralende kleur zonder gele ondertonen'
]

const noYellowConditionerClaims = [
  'Hydrateert, herstelt en verheldert blond, grijs en geblondeerd haar',
  'Neutraliserende en verhelderende conditioner voor blond en grijs haar',
  'Toningsconditioner voor grijs, blond en geblondeerd haar',
  'Verzacht het haar en verheldert blonde en grijze tinten',
  'Hydrateert het haar en elimineert gele tinten in blond en grijs haar',
  'Biedt zachte verzorging en vermindert warme gele tonen in blond haar',
  'Zorgt voor een langdurige, stralende kleur zonder gele ondertonen',
  'Conditioneert en verbetert de elasticiteit, terwijl het de koele tint en glans behoudt',
  'Verzorgt het haar, beschermt tegen externe schade en behoudt de koele tint',
  'Behoudt de kleurdiepte en voorkomt verkleuring voor langdurig mooie resultaten'
]

const productSections = [
  {
    key: "shampoo",
    title: "No Yellow Shampoo",
    claims: noYellowShampooClaims,
    fieldName: "standaardClaimNoYellowShampoo" as const
  },
  {
    key: "conditioner", 
    title: "No Yellow Conditioner",
    claims: noYellowConditionerClaims,
    fieldName: "standaardClaimNoYellowConditioner" as const
  }
]

export default function Slide39({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): NoYellowClaimsSelections => {
    return {
      shampoo: formData.noYellowClaims?.shampoo || formatClaimWithNumber(noYellowShampooClaims[0], 0),
      conditioner: formData.noYellowClaims?.conditioner || formatClaimWithNumber(noYellowConditionerClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<NoYellowClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.noYellowClaims?.shampoo || !formData.noYellowClaims?.conditioner) {
      const defaults = {
        shampoo: formatClaimWithNumber(noYellowShampooClaims[0], 0),
        conditioner: formatClaimWithNumber(noYellowConditionerClaims[0], 0)
      }
      
      const updates = {
        noYellowClaims: {
          shampoo: formData.noYellowClaims?.shampoo || defaults.shampoo,
          conditioner: formData.noYellowClaims?.conditioner || defaults.conditioner
        },
        standaardClaimNoYellowShampoo: formData.standaardClaimNoYellowShampoo || defaults.shampoo,
        standaardClaimNoYellowConditioner: formData.standaardClaimNoYellowConditioner || defaults.conditioner
      }
      
      updateFormData(updates)
      setSelectedClaims({
        shampoo: updates.noYellowClaims.shampoo,
        conditioner: updates.noYellowClaims.conditioner
      })
    }
  }, [updateFormData, formData.noYellowClaims, formData.standaardClaimNoYellowShampoo, formData.standaardClaimNoYellowConditioner])

  // Check if both products have selections
  const isComplete = useMemo(() => {
    return selectedClaims.shampoo && selectedClaims.conditioner
  }, [selectedClaims])

  const handleClaimSelect = (sectionKey: keyof NoYellowClaimsSelections, claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { ...selectedClaims, [sectionKey]: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      noYellowClaims: newSelections,
      standaardClaimNoYellowShampoo: newSelections.shampoo,
      standaardClaimNoYellowConditioner: newSelections.conditioner
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:NoYellow${sectionKey === 'shampoo' ? 'Shampoo' : 'Conditioner'}Claim`, formattedClaim)
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
          No Yellow - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claims voor je No Yellow producten. Deze claims beschrijven de specifieke voordelen en werking van elk product.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor elk product. Klik op "Doorgaan" wanneer je beide claims hebt gekozen.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.claims.map((claim, index) => {
                  const formattedClaim = formatClaimWithNumber(claim, index)
                  const isSelected = selectedClaims[section.key as keyof NoYellowClaimsSelections] === formattedClaim
                  return (
                    <div
                      key={`${section.key}-${index}`}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleClaimSelect(section.key as keyof NoYellowClaimsSelections, claim, index)}
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
            {isComplete ? "Beide claims geselecteerd - klik op 'Doorgaan' om verder te gaan" : "Selecteer claims voor beide producten om door te gaan"}
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