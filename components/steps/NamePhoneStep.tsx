"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, ChevronDown, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import type { FormData } from "@/lib/form/schema"
import type { StepProps } from "@/lib/form/steps"
import { getTypographyClasses } from "@/lib/typography"

interface ValidationErrors {
  firstName?: string
  lastName?: string
  phone?: string
}

interface ValidationState {
  firstName: "idle" | "valid" | "invalid"
  lastName: "idle" | "valid" | "invalid"
  phone: "idle" | "valid" | "invalid"
}

const countries = [
  { code: "+31", flag: "🇳🇱", name: "Nederland", short: "NL" },
  { code: "+32", flag: "🇧🇪", name: "België", short: "BE" },
  { code: "+49", flag: "🇩🇪", name: "Duitsland", short: "DE" },
  { code: "+33", flag: "🇫🇷", name: "Frankrijk", short: "FR" },
  { code: "+44", flag: "🇬🇧", name: "Verenigd Koninkrijk", short: "GB" },
  { code: "+1", flag: "🇺🇸", name: "Verenigde Staten", short: "US" },
]

export function NamePhoneStep({ formData, updateFormData, onNext }: StepProps) {
  const [countryCode, setCountryCode] = useState("+31")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [validationState, setValidationState] = useState<ValidationState>({
    firstName: "idle",
    lastName: "idle",
    phone: "idle",
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const validateField = (field: keyof FormData, value: string) => {
      const newErrors = { ...errors }
      const newValidationState = { ...validationState }

      switch (field) {
        case "firstName":
          if (!value.trim()) {
            newErrors.firstName = "Voornaam is verplicht"
            newValidationState.firstName = "invalid"
          } else if (value.trim().length < 2) {
            newErrors.firstName = "Voornaam moet minimaal 2 karakters bevatten"
            newValidationState.firstName = "invalid"
          } else {
            delete newErrors.firstName
            newValidationState.firstName = "valid"
          }
          break

        case "lastName":
          if (!value.trim()) {
            newErrors.lastName = "Achternaam is verplicht"
            newValidationState.lastName = "invalid"
          } else if (value.trim().length < 2) {
            newErrors.lastName = "Achternaam moet minimaal 2 karakters bevatten"
            newValidationState.lastName = "invalid"
          } else {
            delete newErrors.lastName
            newValidationState.lastName = "valid"
          }
          break

        case "phone":
          if (value.trim() === "") {
            delete newErrors.phone
            newValidationState.phone = "idle"
          } else if (value.trim().length < 8) {
            newErrors.phone = "Telefoonnummer moet minimaal 8 cijfers bevatten"
            newValidationState.phone = "invalid"
          } else {
            delete newErrors.phone
            newValidationState.phone = "valid"
          }
          break
      }

      setErrors(newErrors)
      setValidationState(newValidationState)
    }

    const timeouts: NodeJS.Timeout[] = []

    Object.keys(touched).forEach((field) => {
      if (touched[field]) {
        const fieldValue = formData[field as keyof FormData] as string
        const timeout = setTimeout(() => {
          validateField(field as keyof FormData, fieldValue || "")
        }, 300)
        timeouts.push(timeout)
      }
    })

    return () => timeouts.forEach(clearTimeout)
  }, [formData, touched])

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value })
    setTouched({ ...touched, [field]: true })
  }

  const isFormValid = () => {
    const hasFirstName = formData.firstName && formData.firstName.trim().length >= 2
    const hasLastName = formData.lastName && formData.lastName.trim().length >= 2
    
    const phoneIsEmpty = !formData.phone || formData.phone.trim() === ""
    const phoneIsValid = formData.phone && formData.phone.trim().length >= 8
    
    return hasFirstName && hasLastName && (phoneIsEmpty || phoneIsValid)
  }

  const handleNext = () => {
    if (isFormValid()) {
      let fullPhone = ""
      if (formData.phone && formData.phone.trim()) {
        fullPhone = `${countryCode}${formData.phone.replace(/\s/g, "")}`
        updateFormData({ phone: fullPhone })
      }
      onNext()
    }
  }

  const getValidationIcon = (field: keyof ValidationState) => {
    const state = validationState[field]
    if (state === "valid") {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (state === "invalid") {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  const getInputClassName = (field: keyof ValidationState) => {
    const state = validationState[field]
    if (state === "valid") {
      return "border-green-500 focus:border-green-500 focus:ring-green-200"
    } else if (state === "invalid") {
      return "border-red-500 focus:border-red-500 focus:ring-red-200"
    }
    return "border-gray-300 focus:border-black focus:ring-black"
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-8">
      <div className="space-y-8 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="text-center">
          <h2 className={getTypographyClasses("title", { alignment: "center" })}>Vertel ons over jezelf</h2>
          <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} max-w-xl mx-auto`}>
            We hebben je naam en telefoonnummer nodig om je account aan te maken en contact met je op te nemen over je
            ontwerpen.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Voornaam"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`${getInputClassName("firstName")} pr-10`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon("firstName")}</div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Achternaam"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`${getInputClassName("lastName")} pr-10`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon("lastName")}</div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Phone Field (Optional) */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-3 pr-8 focus:border-black focus:ring-1 focus:ring-black min-w-[120px] text-sm font-medium shadow-sm hover:border-gray-400 transition-colors cursor-pointer"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code} className="py-2">
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <div className="flex-1 relative">
                <Input
                  type="tel"
                  placeholder="Telefoonnummer (optioneel)"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`${getInputClassName("phone")} pr-10`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon("phone")}</div>
              </div>
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className={getTypographyClasses("paragraph", { removeSpacing: true })}>
              <strong>E-mailadres:</strong> {formData.email}
            </p>
            <p className={`${getTypographyClasses("paragraph", { removeSpacing: true })} mt-1 text-gray-700`}>
              Met dit e-mailadres kun je later inloggen om al je ontwerpen te bekijken en beheren.
            </p>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleNext}
              disabled={!isFormValid()}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Doorgaan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NamePhoneStep