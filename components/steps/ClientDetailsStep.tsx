"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, ChevronDown, User, AlertCircle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import type { FormData } from "@/lib/form/schema"

interface ClientDetailsStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
}

interface ValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

interface ValidationState {
  firstName: "idle" | "valid" | "invalid"
  lastName: "idle" | "valid" | "invalid"
  email: "idle" | "valid" | "invalid"
  phone: "idle" | "valid" | "invalid"
}

export function ClientDetailsStep({ formData, updateFormData, onNext }: ClientDetailsStepProps) {
  const [countryCode, setCountryCode] = useState("+31")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [validationState, setValidationState] = useState<ValidationState>({
    firstName: "idle",
    lastName: "idle",
    email: "idle",
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

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!value.trim()) {
            newErrors.email = "E-mailadres is verplicht"
            newValidationState.email = "invalid"
          } else if (!emailRegex.test(value)) {
            newErrors.email = "Voer een geldig e-mailadres in"
            newValidationState.email = "invalid"
          } else {
            delete newErrors.email
            newValidationState.email = "valid"
          }
          break

        case "phone":
          if (value.trim()) {
            const phoneRegex = /^[\d\s\-+()]+$/
            if (!phoneRegex.test(value) || value.replace(/\D/g, "").length < 8) {
              newErrors.phone = "Voer een geldig telefoonnummer in"
              newValidationState.phone = "invalid"
            } else {
              delete newErrors.phone
              newValidationState.phone = "valid"
            }
          } else {
            delete newErrors.phone
            newValidationState.phone = "idle"
          }
          break
      }

      setErrors(newErrors)
      setValidationState(newValidationState)
    }

    const timeouts: NodeJS.Timeout[] = []

    Object.entries(formData).forEach(([field, value]) => {
      if (touched[field] && typeof value === "string") {
        const timeout = setTimeout(() => {
          validateField(field as keyof FormData, value)
        }, 300)
        timeouts.push(timeout)
      }
    })

    return () => timeouts.forEach(clearTimeout)
  }, [formData, touched])

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log("[v0] Updating form data:", { [field]: value })
    updateFormData({ [field]: value })
    setTouched({ ...touched, [field]: true })
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched({ ...touched, [field]: true })
  }

  const isFormValid = () => {
    const hasFirstName = formData.firstName && formData.firstName.trim().length >= 2
    const hasLastName = formData.lastName && formData.lastName.trim().length >= 2
    const hasValidEmail = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const hasValidPhone =
      !formData.phone ||
      (formData.phone && /^[\d\s\-+()]+$/.test(formData.phone) && formData.phone.replace(/\D/g, "").length >= 8)

    const isValid = hasFirstName && hasLastName && hasValidEmail && hasValidPhone
    console.log("[v0] Form validation check:", {
      hasFirstName,
      hasLastName,
      hasValidEmail,
      hasValidPhone,
      isValid,
      formData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
    })

    return isValid
  }

  const handleNext = () => {
    console.log("[v0] Next button clicked, form valid:", isFormValid())
    if (isFormValid()) {
      onNext()
    }
  }

  const getInputClassName = (field: keyof ValidationState) => {
    const baseClass = "w-full p-3 border rounded-lg transition-colors duration-200"
    const focusClass = "focus:outline-none focus:ring-2 focus:ring-offset-1"

    if (validationState[field] === "valid") {
      return `${baseClass} ${focusClass} border-green-300 focus:border-green-500 focus:ring-green-200`
    } else if (validationState[field] === "invalid") {
      return `${baseClass} ${focusClass} border-red-300 focus:border-red-500 focus:ring-red-200`
    } else {
      return `${baseClass} ${focusClass} border-gray-300 focus:border-black focus:ring-black/10`
    }
  }

  const getValidationIcon = (field: keyof ValidationState) => {
    if (validationState[field] === "valid") {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    } else if (validationState[field] === "invalid") {
      return <AlertCircle className="w-5 h-5 text-red-500" />
    }
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Welkom! Laten we beginnen</h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Vul je contactgegevens in om te beginnen met het creëren van jouw unieke productlijn. Met deze gegevens kun je
          later al je ontwerpen beheren en de juiste selecteren.
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Voornaam"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              className={`${getInputClassName("firstName")} pl-10 pr-10`}
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
              onBlur={() => handleBlur("lastName")}
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

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <Input
            type="email"
            placeholder="E-mail adres"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${getInputClassName("email")} pl-10 pr-10`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon("email")}</div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
          {!errors.email && (
            <p className="text-sm text-gray-600 mt-2">
              Dit e-mailadres wordt gebruikt om je ontwerpen te beheren en op te slaan.
            </p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-3 pr-8 focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="+31">🇳🇱 NL</option>
                <option value="+32">🇧🇪 BE</option>
                <option value="+49">🇩🇪 DE</option>
                <option value="+33">🇫🇷 FR</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex-1 relative">
              <Input
                type="tel"
                placeholder="Telefoonnummer (optioneel)"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
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
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> Met je e-mailadres kun je later inloggen om al je ontwerpen te bekijken, te beheren en
            de juiste te selecteren voor productie.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          disabled={!isFormValid()}
          className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Doorgaan naar ingrediënten
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
