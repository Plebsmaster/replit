"use client"

import { useState, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export default function Slide46({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    formData.verkoopland || 'NL'
  )

  // Set default country selection on component mount
  useEffect(() => {
    if (!formData.verkoopland) {
      updateFormData({ verkoopland: 'NL' })
      try {
        localStorage.setItem("salonid:verkoopland", 'NL')
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (error) {
        // localStorage not available, continue silently
      }
    }
  }, [formData.verkoopland, updateFormData])

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode)
    updateFormData({ verkoopland: countryCode as 'NL' | 'DE' | 'BE' })
    
    try {
      localStorage.setItem("salonid:verkoopland", countryCode)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    
    // Auto-advance with 500ms delay as required
    setTimeout(() => {
      onNext()
    }, 500)
  }

  const countryOptions = [
    {
      key: "NL",
      label: "Nederland",
      imageSrc: "/img/slide19/icon-with.png", // Reusing existing image - can be updated with flag images
      alt: "Nederland - NL",
    },
    {
      key: "DE", 
      label: "Duitsland",
      imageSrc: "/img/slide19/icon-with.png", // Reusing existing image - can be updated with flag images
      alt: "Duitsland - DE",
    },
    {
      key: "BE",
      label: "België", 
      imageSrc: "/img/slide19/icon-with.png", // Reusing existing image - can be updated with flag images
      alt: "België - BE",
    },
  ]

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          In welk land worden de producten verkocht?
        </h2>

        <div className="max-w-[760px] space-y-4">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            De keuze van het verkoopland is belangrijk voor de juiste naleving van lokale regelgeving 
            en productvoorschriften. Elk land heeft specifieke eisen voor cosmetische producten.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h3 className={getTypographyClasses("cardTitle", { alignment: "left" })}>
              Regels en Voorschriften
            </h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className={getTypographyClasses("cardDescription", { alignment: "left" })}>
                <strong>Nederland (NL):</strong> Volgt EU cosmetica regelgeving en Nederlandse NVWA voorschriften
              </li>
              <li className={getTypographyClasses("cardDescription", { alignment: "left" })}>
                <strong>Duitsland (DE):</strong> Volgt EU cosmetica regelgeving en Duitse BVL voorschriften  
              </li>
              <li className={getTypographyClasses("cardDescription", { alignment: "left" })}>
                <strong>België (BE):</strong> Volgt EU cosmetica regelgeving en Belgische FOD voorschriften
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className={getTypographyClasses("cardTitle", { alignment: "left" })}>
              Maak hier je keuze
            </h3>
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              Klik op het gewenste land om automatisch door te gaan. Standaard selectie: <strong>Nederland</strong>.
            </p>
          </div>
        </div>

        <ResponsiveCarousel
          items={countryOptions}
          selectedItem={selectedCountry}
          onItemClick={handleCountrySelect}
          columns={3}
        />
      </section>
    </SlideContainer>
  )
}