"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ChevronDown, CheckCircle, AlertCircle, Loader2, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import type { FormData } from "@/lib/form/schema"

interface ContactStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onSubmit: () => void
  isSubmitting: boolean
  submitStatus: "idle" | "success" | "error"
  submitMessage: string
}

export function ContactStep({
  formData,
  updateFormData,
  onSubmit,
  isSubmitting,
  submitStatus,
  submitMessage,
}: ContactStepProps) {
  const [countryCode, setCountryCode] = useState("+31")

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    updateFormData({ [field]: value })
  }

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.agreeTerms
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Bevestig je ontwerp</h2>
        <div className="max-w-xl mx-auto text-gray-700">
          <p className="mb-2">
            Je ontwerp is bijna klaar! Controleer je gegevens en verstuur het formulier. Na het versturen kun je al je
            ontwerpen beheren via je persoonlijke dashboard.
          </p>
          <p>
            <span className="font-semibold">Tip:</span> Je kunt later meerdere ontwerpen maken en de beste selecteren
            voor productie.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-black mb-3">Je contactgegevens</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Naam:</span> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <span className="font-medium">E-mail:</span> {formData.email}
            </p>
            {formData.phone && (
              <p>
                <span className="font-medium">Telefoon:</span> {formData.phone}
              </p>
            )}
          </div>
        </div>

        {/* Phone Field - Optional update */}
        {!formData.phone && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefoonnummer (optioneel)</label>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-3 pr-8 focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="+31">NL</option>
                  <option value="+32">BE</option>
                  <option value="+49">DE</option>
                  <option value="+33">FR</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <Input
                type="tel"
                placeholder={countryCode + " 0 00000000"}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}

        {/* Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div
              onClick={() => !isSubmitting && handleInputChange("agreeTerms", !formData.agreeTerms)}
              className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center cursor-pointer ${
                formData.agreeTerms ? "border-black bg-black" : "border-gray-300"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {formData.agreeTerms && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <div className="text-sm text-gray-700">
              Ik ga akkoord met de <span className="text-blue-600 underline cursor-pointer">algemene voorwaarden</span>{" "}
              *
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              onClick={() => !isSubmitting && handleInputChange("subscribeNewsletter", !formData.subscribeNewsletter)}
              className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center cursor-pointer ${
                formData.subscribeNewsletter ? "border-black bg-black" : "border-gray-300"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {formData.subscribeNewsletter && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <div className="text-sm text-gray-700">Ik schrijf me graag in voor de nieuwsbrief (optioneel)</div>
          </div>
        </div>
      </div>

      {/* Submission Status Display and Loading States */}
      {submitStatus !== "idle" && (
        <div
          className={`flex items-center justify-center gap-2 p-4 rounded-lg ${
            submitStatus === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {submitStatus === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{submitMessage}</span>
        </div>
      )}

      {submitStatus === "success" && (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="font-semibold text-blue-900 mb-2">Ontwerp succesvol opgeslagen!</h3>
          <p className="text-blue-800 mb-4">
            Je kunt nu al je ontwerpen bekijken en beheren via je persoonlijke dashboard.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Eye className="w-4 h-4 mr-2" />
              Bekijk mijn ontwerpen
            </Button>
          </Link>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={!isFormValid() || isSubmitting || submitStatus === "success"}
          className="bg-black text-white hover:bg-gray-800 px-12 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Versturen...
            </>
          ) : submitStatus === "success" ? (
            "Ontwerp opgeslagen!"
          ) : (
            <>
              Verstuur ontwerp
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>

      {submitStatus === "idle" && (
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Heb je al eerder een ontwerp gemaakt?</p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-black text-black hover:bg-gray-50 bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              Bekijk mijn ontwerpen
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
