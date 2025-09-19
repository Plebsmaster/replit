"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { claimsContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function ClaimsSelector({ formData, updateFormData, stepKey }: StepProps & { stepKey?: string }) {
  const config = claimsContent[stepKey as keyof typeof claimsContent]
  if (!config) {
    console.error(`No config found for claims step: ${stepKey}`)
    return null
  }

  // Function to create numbered claim format
  const formatClaimWithNumber = (claim: string, index: number): string => {
    return `"${index + 1}. ${claim}"`
  }

  // Initialize selections from formData
  const getInitialSelections = () => {
    return config.sections.reduce((acc: Record<string, string>, section: any) => {
      const existingValue = (formData as any)[section.fieldName]
      acc[section.key] = existingValue || formatClaimWithNumber(section.claims[0], 0)
      return acc
    }, {} as Record<string, string>)
  }

  const [selectedClaims, setSelectedClaims] = useState(getInitialSelections)

  // Smart persistence - only apply defaults if fields are missing
  useEffect(() => {
    const updates: any = {}
    let hasUpdates = false

    config.sections.forEach((section: any) => {
      if (!(formData as any)[section.fieldName]) {
        const defaultClaim = formatClaimWithNumber(section.claims[0], 0)
        updates[section.fieldName] = defaultClaim
        hasUpdates = true
      }
    })

    if (hasUpdates) {
      updateFormData(updates)
    }
  }, [])

  // Check if all products have selections
  const isComplete = useMemo(() => {
    return config.sections.every((section: any) => selectedClaims[section.key])
  }, [selectedClaims, config.sections])

  const handleClaimSelect = (sectionKey: string, claim: string, index: number) => {
    const formattedClaim = formatClaimWithNumber(claim, index)
    const newSelections = { ...selectedClaims, [sectionKey]: formattedClaim }
    setSelectedClaims(newSelections)

    // Find section config
    const section = config.sections.find((s: any) => s.key === sectionKey)
    if (!section) return

    // Update formData with the selection
    updateFormData({ [section.fieldName]: formattedClaim })

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:${section.key}Claim`, formattedClaim)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available
    }
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
          {config.sections.map((section: any) => (
            <div key={section.key}>
              <h3 className="text-xl font-bold text-gray-900 text-left mb-4">{section.title}</h3>
              
              <div className="space-y-3">
                {section.claims.map((claim: string, index: number) => {
                  const formattedClaim = formatClaimWithNumber(claim, index)
                  const isSelected = selectedClaims[section.key] === formattedClaim
                  
                  return (
                    <div
                      key={`${section.key}-${index}`}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleClaimSelect(section.key, claim, index)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-gray-800 flex-1">{claim}</p>
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