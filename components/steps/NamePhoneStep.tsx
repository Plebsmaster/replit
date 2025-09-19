"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Phone, ChevronDown, ArrowRight, AlertCircle, CheckCircle, Mail } from "lucide-react"
import { useState, useEffect, useRef } from "react"
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
  { code: "+34", flag: "🇪🇸", name: "Spanje", short: "ES" },
  { code: "+39", flag: "🇮🇹", name: "Italië", short: "IT" },
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
  const [showPhoneField, setShowPhoneField] = useState(false)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Auto-show phone field if names are complete
  useEffect(() => {
    if (formData.firstName && formData.firstName.trim().length >= 2 &&
        formData.lastName && formData.lastName.trim().length >= 2) {
      setShowPhoneField(true)
    }
  }, [formData.firstName, formData.lastName])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          if (!value.trim()) {
            newErrors.phone = "Telefoonnummer is verplicht"
            newValidationState.phone = "invalid"
          } else {
            const phoneRegex = /^[\d\s\-+()]+$/
            if (!phoneRegex.test(value) || value.replace(/\D/g, "").length < 8) {
              newErrors.phone = "Voer een geldig telefoonnummer in"
              newValidationState.phone = "invalid"
            } else {
              delete newErrors.phone
              newValidationState.phone = "valid"
            }
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
    updateFormData({ [field]: value })
    setTouched({ ...touched, [field]: true })
  }

  const isFormValid = () => {
    const hasFirstName = formData.firstName && formData.firstName.trim().length >= 2
    const hasLastName = formData.lastName && formData.lastName.trim().length >= 2
    const hasValidPhone =
      formData.phone && /^[\d\s\-+()]+$/.test(formData.phone) && formData.phone.replace(/\D/g, "").length >= 8

    return hasFirstName && hasLastName && hasValidPhone
  }

  const getInputClassName = (field: keyof ValidationState, hasIcon: boolean = false) => {
    const baseClass = "w-full h-14 px-4 bg-white border rounded-xl transition-all duration-200 text-base"
    const paddingClass = hasIcon ? "pl-12" : ""
    const focusClass = "focus:outline-none focus:ring-2 focus:ring-offset-0"

    if (validationState[field] === "valid") {
      return `${baseClass} ${paddingClass} ${focusClass} border-green-400 focus:border-green-500 focus:ring-green-200/50 bg-green-50/30`
    } else if (validationState[field] === "invalid") {
      return `${baseClass} ${paddingClass} ${focusClass} border-red-400 focus:border-red-500 focus:ring-red-200/50 bg-red-50/30`
    } else {
      return `${baseClass} ${paddingClass} ${focusClass} border-gray-200 hover:border-gray-300 focus:border-black focus:ring-black/10`
    }
  }

  const getValidationIcon = (field: keyof ValidationState) => {
    if (validationState[field] === "valid") {
      return <CheckCircle className="w-5 h-5 text-green-500 animate-in fade-in zoom-in duration-200" />
    } else if (validationState[field] === "invalid") {
      return <AlertCircle className="w-5 h-5 text-red-500 animate-in fade-in zoom-in duration-200" />
    }
    return null
  }

  const handleNext = () => {
    if (isFormValid()) {
      onNext()
    }
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-8">
      <div className="space-y-6 w-full max-w-2xl mx-auto px-4 sm:px-6">
        {/* Floating email badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
            <Mail className="w-4 h-4" />
            <span>{formData.email}</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className={getTypographyClasses("title", { alignment: "center" })}>Vertel ons over jezelf</h2>
          <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} max-w-xl mx-auto mt-2`}>
            Vul je gegevens in zodat we je account kunnen aanmaken
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          {/* Name Fields Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Naam
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Voornaam"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    onBlur={() => setTouched({ ...touched, firstName: true })}
                    className={getInputClassName("firstName")}
                    autoComplete="given-name"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {touched.firstName && getValidationIcon("firstName")}
                  </div>
                </div>
                {touched.firstName && errors.firstName && (
                  <p className="text-red-500 text-xs ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.firstName}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Achternaam"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    onBlur={() => setTouched({ ...touched, lastName: true })}
                    className={getInputClassName("lastName")}
                    autoComplete="family-name"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {touched.lastName && getValidationIcon("lastName")}
                  </div>
                </div>
                {touched.lastName && errors.lastName && (
                  <p className="text-red-500 text-xs ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Phone Field - Progressive Disclosure */}
          {showPhoneField && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefoonnummer <span className="text-red-400">*</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Modern Country Selector */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="w-full sm:w-auto h-14 px-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all duration-200 flex items-center justify-between gap-2 min-w-[140px]"
                  >
                    <span className="flex items-center gap-2 text-base">
                      <span className="font-medium">{countryCode}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  {isCountryDropdownOpen && (
                    <div className="absolute z-50 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="max-h-64 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setCountryCode(country.code)
                              setIsCountryDropdownOpen(false)
                            }}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="flex-1">
                              <span className="font-medium">{country.name}</span>
                              <span className="text-gray-500 ml-2">{country.code}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Phone Input */}
                <div className="flex-1 space-y-2">
                  <div className="relative">
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="6 12345678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      onBlur={() => setTouched({ ...touched, phone: true })}
                      className={getInputClassName("phone")}
                      autoComplete="tel"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {touched.phone && formData.phone && getValidationIcon("phone")}
                    </div>
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Helper Text */}
          {!showPhoneField && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                Vul eerst je naam in om door te gaan
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleNext}
              disabled={!isFormValid()}
              className="w-full h-14 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
            >
              {isFormValid() ? (
                <span className="flex items-center justify-center gap-2">
                  Doorgaan
                  <ArrowRight className="w-5 h-5" />
                </span>
              ) : (
                <span>Vul alle verplichte velden in</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NamePhoneStep
