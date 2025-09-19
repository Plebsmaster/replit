"use client"

import { useState, useEffect, useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

function validateDomain(input: string): boolean {
  if (!input) return true // optional field
  // strip a leading "www." for validation purposes
  const urlWithoutWww = input.replace(/^www\./i, "")
  // basic domain pattern
  const domainRegex =
    /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
  return domainRegex.test(urlWithoutWww)
}

function formatWebsiteDisplay(url: string): string {
  if (!url) return ""
  const hasWWW = /^www\./i.test(url)
  const hasHTTP = /^https?:\/\//i.test(url)
  if (hasHTTP || hasWWW) return url
  return `www.${url}`
}

export default function Slide55({ updateFormData, formData, onNext, onBack }: StepProps) {
  const initial = (formData?.qrCode as string | undefined) ?? ""
  const [website, setWebsite] = useState<string>(initial)
  const isValidUrl = useMemo(() => validateDomain(website), [website])

  // keep global state & localStorage in sync while typing
  useEffect(() => {
    updateFormData({ qrCode: website })
    try {
      localStorage.setItem("salonid:qrCode", website)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}
  }, [website, updateFormData])

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>QR-Code Website</h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt gekozen voor een QR-Code op de achterkant van de fles. Hiervoor hebben wij de link van
            jouw website nodig. Vul deze in zonder het eerste deel 'www.'.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Dat ziet er als volgt uit: <span className="font-semibold">salonid.com</span> wordt www.salonid.com
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 text-left mb-4">Voeg hier je website toe:</h3>
        </div>

        <div className="max-w-[500px] space-y-4">
          <div>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="salonid.com"
              className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 transition-all ${
                !isValidUrl ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"
              }`}
            />
            {!isValidUrl && (
              <p className="text-sm text-red-600 mt-2">
                Vul een geldige website URL in (bijvoorbeeld: salonid.com)
              </p>
            )}
          </div>

          {website && isValidUrl && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Preview:</span> {formatWebsiteDisplay(website)}
              </p>
            </div>
          )}
        </div>

        <div className="max-w-[500px] mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Let op:</span> SalonID is niet verantwoordelijk voor het plaatsen van
              foutieve links.
            </p>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}