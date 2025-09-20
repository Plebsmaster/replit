"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type CurlyGirlClaimsSelections = {
  shampoo: string
  conditioner: string
  mask: string
}

const curlyGirlShampooClaims = [
  'Milde reiniging speciaal ontwikkeld voor krullend en golvend haar',
  'Rijk aan natuurlijke extracten die krullen voeden en beschermen',
  'Verrijkt met voedende ingrediënten voor zachte en pluisvrije krullen',
  'Helpt het natuurlijke krulpatroon te versterken en definiëren',
  'Beschermt tegen uitdroging en vermindert pluisvorming',
  'Geeft krullen glans, veerkracht en souplesse',
  'Verbetert de elasticiteit en vitaliteit van je krullen',
  'Biedt dagelijkse verzorging voor zichtbaar gezonde en gedefinieerde krullen',
  'Speciaal ontwikkelde shampoo volgens de Curly Girl Methode',
  'Geeft krullen energie, souplesse en een frisse uitstraling'
]

const curlyGirlConditionerClaims = [
  'Intensief voedende conditioner die krullen ontwart en hydrateert',
  'Verzacht en maakt krullen direct makkelijk doorkambaar',
  'Herstelt de natuurlijke elasticiteit en veerkracht van krullen',
  'Geeft krullen souplesse, glans en definitie',
  'Voorkomt pluis en houdt krullen luchtig en soepel',
  'Ondersteunt gezond, sterk en veerkrachtig krullend haar',
  'Intensieve verzorging speciaal ontwikkeld voor alle krultypes',
  'Laat krullen zijdezacht aanvoelen met een natuurlijke glans',
  'Biedt dagelijkse verzorging voor alle krultypes met natuurlijke glans',
  'Geeft krullen een zijdezachte touch zonder te verzwaren'
]

const curlyGirlMaskClaims = [
  'Intensief herstellend masker dat krullen diep van binnenuit voedt',
  'Herstelt de kracht en elasticiteit van vermoeide en droge krullen',
  'Geeft krullen een intensieve vochtboost voor langdurige hydratatie',
  'Geeft krullen nieuwe energie, souplesse en veerkracht',
  'Herstelt de natuurlijke glans en zachtheid van krullen',
  'Laat krullen sterker aanvoelen en beter bestand tegen breuk',
  'Intensieve verzorging voor een langdurig levendige haarkleur',
  'Biedt langdurige pluiscontrole en betere kruldefinitie',
  'Geeft krullen zichtbaar meer vitaliteit en een gezonde uitstraling',
  'Geeft krullen een intensieve reset voor zichtbaar gezonder en sterker haar'
]

const productSections = [
  {
    key: "shampoo",
    title: "Curly Girl Shampoo",
    claims: curlyGirlShampooClaims,
    fieldName: "standaardClaimCurlyGirlShampoo" as const
  },
  {
    key: "conditioner", 
    title: "Curly Girl Conditioner",
    claims: curlyGirlConditionerClaims,
    fieldName: "standaardClaimCurlyGirlConditioner" as const
  },
  {
    key: "mask", 
    title: "Curly Girl Mask",
    claims: curlyGirlMaskClaims,
    fieldName: "standaardClaimCurlyGirlMask" as const
  }
]

export default function Slide42({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): CurlyGirlClaimsSelections => {
    return {
      shampoo: formData.curlyGirlClaims?.shampoo || formatClaimWithNumber(curlyGirlShampooClaims[0], 0),
      conditioner: formData.curlyGirlClaims?.conditioner || formatClaimWithNumber(curlyGirlConditionerClaims[0], 0),
      mask: formData.curlyGirlClaims?.mask || formatClaimWithNumber(curlyGirlMaskClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<CurlyGirlClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.curlyGirlClaims?.shampoo || !formData.curlyGirlClaims?.conditioner || !formData.curlyGirlClaims?.mask) {
      const defaults = {
        shampoo: formatClaimWithNumber(curlyGirlShampooClaims[0], 0),
        conditioner: formatClaimWithNumber(curlyGirlConditionerClaims[0], 0),
        mask: formatClaimWithNumber(curlyGirlMaskClaims[0], 0)
      }
      
      const updates = {
        curlyGirlClaims: {
          shampoo: formData.curlyGirlClaims?.shampoo || defaults.shampoo,
          conditioner: formData.curlyGirlClaims?.conditioner || defaults.conditioner,
          mask: formData.curlyGirlClaims?.mask || defaults.mask
        },
        standaardClaimCurlyGirlShampoo: formData.standaardClaimCurlyGirlShampoo || defaults.shampoo,
        standaardClaimCurlyGirlConditioner: formData.standaardClaimCurlyGirlConditioner || defaults.conditioner,
        standaardClaimCurlyGirlMask: formData.standaardClaimCurlyGirlMask || defaults.mask
      }
      
      updateFormData(updates)
      setSelectedClaims({
        shampoo: updates.curlyGirlClaims.shampoo,
        conditioner: updates.curlyGirlClaims.conditioner,
        mask: updates.curlyGirlClaims.mask
      })
    }
  }, [formData.curlyGirlClaims, formData.standaardClaimCurlyGirlShampoo, formData.standaardClaimCurlyGirlConditioner, formData.standaardClaimCurlyGirlMask, updateFormData])

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedClaims.shampoo && selectedClaims.conditioner && selectedClaims.mask
  }, [selectedClaims])

  const handleOptionSelect = (sectionKey: keyof CurlyGirlClaimsSelections, claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { ...selectedClaims, [sectionKey]: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      curlyGirlClaims: newSelections,
      standaardClaimCurlyGirlShampoo: newSelections.shampoo,
      standaardClaimCurlyGirlConditioner: newSelections.conditioner,
      standaardClaimCurlyGirlMask: newSelections.mask
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      const storageKey = sectionKey === 'shampoo' ? 'CurlyGirlShampoo' : 
                        sectionKey === 'conditioner' ? 'CurlyGirlConditioner' : 'CurlyGirlMask'
      localStorage.setItem(`salonid:${storageKey}Claims`, formattedClaim)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Curly Girl - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claims voor je Curly Girl producten. Deze producten zijn speciaal ontwikkeld voor krullend en golvend haar volgens de Curly Girl Methode.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor elk product. Je kunt later nog wijzigingen maken.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.claims.map((claim, index) => {
                  const formattedClaim = formatClaimWithNumber(claim, index)
                  const isSelected = selectedClaims[section.key as keyof CurlyGirlClaimsSelections] === formattedClaim
                  return (
                    <div
                      key={claim}
                      className={`
                        p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleOptionSelect(section.key as keyof CurlyGirlClaimsSelections, claim, index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
                          ${isSelected 
                            ? 'border-white bg-white' 
                            : 'border-gray-300 bg-white'
                          }
                        `}>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold">{index + 1}.</span>{" "}
                          <span className={isSelected ? "text-white" : "text-gray-900"}>
                            {claim}
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

        <div className="flex justify-between pt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Terug
          </button>
          <button
            onClick={onNext}
            disabled={!isComplete}
            className={`
              px-6 py-3 rounded-md transition-colors
              ${isComplete
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Doorgaan
          </button>
        </div>
      </section>
    </SlideContainer>
  )
}