"use client"

import { useState, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

const MAX_LEN = 100

export default function Slide52({ updateFormData, formData, onNext, onBack }: StepProps) {
  const initial = (formData?.merknaam as string | undefined) ?? ""
  const [merknaam, setMerknaam] = useState<string>(initial)
  const charCount = merknaam.length

  useEffect(() => {
    // Keep global state in sync as user types
    updateFormData({ merknaam })
    try {
      localStorage.setItem("salonid:merknaam", merknaam)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}
  }, [merknaam, updateFormData])

  const handleMerknaamChange = (value: string) => {
    if (value.length <= MAX_LEN) setMerknaam(value)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          Merknaam
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Je hebt gekozen voor je merknaam op jouw verpakking. Vul hier de exacte merknaam in 
            die je op je producten wilt laten verschijnen.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 text-left mb-4">Vul hier je merknaam in:</h3>
        </div>

        <div className="max-w-[600px]">
          <div className="relative">
            <textarea
              value={merknaam}
              onChange={(e) => handleMerknaamChange(e.target.value)}
              placeholder="Bijv. SalonID Beauty, Haircare Pro, etc. (Max. 100 karakters.)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 resize-none transition-all"
              rows={2}
              maxLength={MAX_LEN}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {charCount}/{MAX_LEN}
            </div>
          </div>

          {charCount >= 90 && charCount < MAX_LEN && (
            <p className="text-sm text-orange-600 mt-2">Let op: Je nadert de karakterlimiet van 100 tekens.</p>
          )}

          {charCount === MAX_LEN && (
            <p className="text-sm text-red-600 mt-2">Maximale karakterlimiet bereikt.</p>
          )}
        </div>
      </section>
    </SlideContainer>
  )
}