"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

type RepairClaimsSelections = {
  shampoo: string
  conditioner: string
  mask: string
}

const repairShampooClaims = [
  'Diepe reiniging die het haar tegelijkertijd herstelt en voedt',
  'Versterkt zwak haar en voorkomt haarbreuk',
  'Reinigt en herstelt beschadigd haar van wortel tot punt',
  'Verbetert de algehele gezondheid en uitstraling van het haar',
  'Herstelt de natuurlijke glans en zachtheid van het haar',
  'Bevordert een gezonde hoofdhuid voor sterkere haargroei',
  'Beschermt tegen toekomstige schade en gespleten haarpunten',
  'Hydrateert en herstelt droog en broos haar',
  'Verbetert de handelbaarheid en elasticiteit van het haar',
  'Zorgt voor gezond en vitaal haar, ideaal voor dagelijks gebruik'
]

const repairConditionerClaims = [
  'Intensieve hydratatie en diepgaand herstel van beschadigd haar',
  'Voedt en versterkt het haar voor verbeterde veerkracht',
  'Herstelt schade veroorzaakt door hitte en chemische behandelingen',
  'Verbetert de algehele gezondheid en uitstraling van het haar',
  'Herstelt de natuurlijke glans en zachtheid van het haar',
  'Bevordert langdurige reparatie en bescherming voor sterker haar',
  'Beschermt tegen toekomstige schade en gespleten haarpunten',
  'Hydrateert en herstelt droog en broos haar',
  'Verbetert de handelbaarheid en elasticiteit van het haar',
  'Zorgt voor gezond en vitaal haar, ideaal voor dagelijks gebruik'
]

const repairMaskClaims = [
  'Intensief herstellend masker voor beschadigd en verzwakt haar',
  'Krachtige formule die de haarvezel van binnenuit versterkt',
  'Diepgaand herstel voor door hitte en chemisch behandeld haar',
  'Verbetert de haarstructuur en vitaliteit met intensieve voeding',
  'Herstelt de natuurlijke veerkracht en glans van het haar',
  'Versterkt de haarvezels en voorkomt toekomstige beschadiging',
  'Intensieve verzorging tegen gespleten haarpunten en broosheid',
  'Voedt en revitaliseert extreem beschadigd haar',
  'Verbetert de elasticiteit en stevigheid van het haar',
  'Biedt intensieve verzorging voor direct zichtbaar gezonder en sterker haar'
]

const productSections = [
  {
    key: "shampoo",
    title: "Repair Shampoo",
    claims: repairShampooClaims,
    fieldName: "standaardClaimRepairShampoo" as const
  },
  {
    key: "conditioner", 
    title: "Repair Conditioner",
    claims: repairConditionerClaims,
    fieldName: "standaardClaimRepairConditioner" as const
  },
  {
    key: "mask", 
    title: "Repair Mask",
    claims: repairMaskClaims,
    fieldName: "standaardClaimRepairMask" as const
  }
]

export default function Slide40({ updateFormData, formData, onNext, onBack }: Props) {
  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize with defaults from formData or default to option 1
  const getInitialSelections = (): RepairClaimsSelections => {
    return {
      shampoo: formData.repairClaims?.shampoo || formatClaimWithNumber(repairShampooClaims[0], 0),
      conditioner: formData.repairClaims?.conditioner || formatClaimWithNumber(repairConditionerClaims[0], 0),
      mask: formData.repairClaims?.mask || formatClaimWithNumber(repairMaskClaims[0], 0)
    }
  }

  const [selectedClaims, setSelectedClaims] = useState<RepairClaimsSelections>(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    if (!formData.repairClaims?.shampoo || !formData.repairClaims?.conditioner || !formData.repairClaims?.mask) {
      const defaults = {
        shampoo: formatClaimWithNumber(repairShampooClaims[0], 0),
        conditioner: formatClaimWithNumber(repairConditionerClaims[0], 0),
        mask: formatClaimWithNumber(repairMaskClaims[0], 0)
      }
      
      const updates = {
        repairClaims: {
          shampoo: formData.repairClaims?.shampoo || defaults.shampoo,
          conditioner: formData.repairClaims?.conditioner || defaults.conditioner,
          mask: formData.repairClaims?.mask || defaults.mask
        },
        standaardClaimRepairShampoo: formData.standaardClaimRepairShampoo || defaults.shampoo,
        standaardClaimRepairConditioner: formData.standaardClaimRepairConditioner || defaults.conditioner,
        standaardClaimRepairMask: formData.standaardClaimRepairMask || defaults.mask
      }
      
      updateFormData(updates)
      setSelectedClaims({
        shampoo: updates.repairClaims.shampoo,
        conditioner: updates.repairClaims.conditioner,
        mask: updates.repairClaims.mask
      })
    }
  }, [updateFormData, formData.repairClaims, formData.standaardClaimRepairShampoo, formData.standaardClaimRepairConditioner, formData.standaardClaimRepairMask])

  // Check if all three products have selections
  const isComplete = useMemo(() => {
    return selectedClaims.shampoo && selectedClaims.conditioner && selectedClaims.mask
  }, [selectedClaims])

  const handleClaimSelect = (sectionKey: keyof RepairClaimsSelections, claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { ...selectedClaims, [sectionKey]: formattedClaim }
    setSelectedClaims(newSelections)

    // Update formData with the selections
    const updates = {
      repairClaims: newSelections,
      standaardClaimRepairShampoo: newSelections.shampoo,
      standaardClaimRepairConditioner: newSelections.conditioner,
      standaardClaimRepairMask: newSelections.mask
    }
    updateFormData(updates)

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:Repair${sectionKey === 'shampoo' ? 'Shampoo' : sectionKey === 'conditioner' ? 'Conditioner' : 'Mask'}Claim`, formattedClaim)
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
          Repair - Kies de claims
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies de claims voor je Repair producten. Deze producten zijn speciaal ontwikkeld om beschadigd haar intensief te herstellen en te versterken.
          </p>
          <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
            Selecteer één claim voor elk product. Je kunt doorgaan zodra alle drie de producten een claim hebben.
          </p>
        </div>

        <div className="space-y-8">
          {productSections.map((section) => {
            const claims = section.claims
            return (
              <div key={section.key}>
                <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
                
                <div className="space-y-3">
                  {claims.map((claim, index) => {
                    const formattedClaim = formatClaimWithNumber(claim, index)
                    const isSelected = selectedClaims[section.key as keyof RepairClaimsSelections] === formattedClaim
                    return (
                      <div
                        key={claim}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                          isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => handleClaimSelect(section.key as keyof RepairClaimsSelections, claim, index)}
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
            )
          })}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isComplete ? "Alle drie producten hebben een claim - ga door naar de volgende stap" : "Selecteer claims voor alle drie producten om door te gaan"}
          </p>
        </div>

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
            className={`px-6 py-3 rounded-md ${
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