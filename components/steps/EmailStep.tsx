"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import type { FormData } from "@/lib/form/schema"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"
import Image from "next/image"

// Button label constants - outside component to prevent re-renders
const BUTTON_LABELS = ["Start je eigen merk", "Inloggen op dashboard"]

export function EmailStep({ formData, updateFormData, onNext }: StepProps) {
  const [email, setEmail] = useState(formData.email || "")
  const [error, setError] = useState("")
  const [validationState, setValidationState] = useState<"idle" | "valid" | "invalid">("idle")
  const [touched, setTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Button text rotation states
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0)
  const [showGlare, setShowGlare] = useState(false)

  // Button text rotation effect - simplified and mobile-friendly
  useEffect(() => {
    if (isLoading) return // Pause rotation during loading
    
    const rotationInterval = setInterval(() => {
      setCurrentLabelIndex((prev) => (prev + 1) % BUTTON_LABELS.length)
    }, 4000) // Switch every 4 seconds
    
    return () => clearInterval(rotationInterval)
  }, [isLoading])
  
  useEffect(() => {
    if (touched) {
      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim()) {
          setError("E-mailadres is verplicht")
          setValidationState("invalid")
        } else if (!emailRegex.test(email)) {
          setError("Voer een geldig e-mailadres in")
          setValidationState("invalid")
        } else {
          setError("")
          setValidationState("valid")
        }
      }

      const timeout = setTimeout(validateEmail, 300)
      return () => clearTimeout(timeout)
    }
  }, [email, touched])

  const handleEmailChange = (value: string) => {
    setEmail(value)
    updateFormData({ email: value })
    setTouched(true)
  }

  const checkUserExistence = async (email: string) => {
    try {
      const response = await fetch('/api/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to check user existence')
      }

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  const handleNext = async () => {
    if (validationState !== "valid") {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const userCheckResult = await checkUserExistence(email)
      
      if (userCheckResult.exists) {
        // Update form data with existing user information
        updateFormData({
          email: email,
          isExistingUser: true,
          userId: userCheckResult.user.id,
          firstName: userCheckResult.user.firstName,
          lastName: userCheckResult.user.lastName,
          phone: userCheckResult.user.phone,
        })
      } else {
        // Update form data for new user
        updateFormData({
          email: email,
          isExistingUser: false,
          userId: '',
        })
      }

      onNext()
    } catch (error) {
      setError("Er is een probleem opgetreden. Probeer het opnieuw.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && validationState === "valid" && !isLoading) {
      handleNext()
    }
  }

  const getInputClassName = () => {
    const baseClass = "w-full h-14 px-4 border rounded-xl transition-all duration-200 text-base sm:text-lg"
    const focusClass = "focus:outline-none focus:ring-2 focus:ring-offset-0"

    if (validationState === "valid") {
      return `${baseClass} ${focusClass} border-green-300 focus:border-green-500 focus:ring-green-200`
    } else if (validationState === "invalid") {
      return `${baseClass} ${focusClass} border-red-300 focus:border-red-500 focus:ring-red-200`
    } else {
      return `${baseClass} ${focusClass} border-gray-300 focus:border-black focus:ring-black/10`
    }
  }

  const getValidationIcon = () => {
    if (validationState === "valid") {
      return <CheckCircle className="w-6 h-6 text-green-500" />
    } else if (validationState === "invalid") {
      return <AlertCircle className="w-6 h-6 text-red-500" />
    }
    return null
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-6 sm:py-8">
      <div className="space-y-6 sm:space-y-8 w-full max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          {/* Logo - responsive size */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image 
              src="/salonid.svg" 
              alt="SalonID logo" 
              width={220} 
              height={95}
              className="w-48 sm:w-56 lg:w-64 h-auto"
              priority
            />
          </div>
          <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} max-w-md sm:max-w-2xl mx-auto px-2`}>
            Start nu je eigen merk of ga direct naar je dashboard.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-md mx-auto flex flex-col justify-center">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <Input
              type="email"
              inputMode="email"
              placeholder="je@email.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyPress={handleKeyPress}
              className={`${getInputClassName()} pl-11 pr-11`}
              autoFocus
              autoComplete="email"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">{getValidationIcon()}</div>
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-6">
            <Button
              onClick={handleNext}
              disabled={validationState !== "valid" || isLoading}
              className="relative w-full h-14 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md"
              aria-label="Starten of inloggen"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Controleren...
                </>
              ) : (
                <>
                  {/* Simplified button text with smooth fade */}
                  <span className="relative inline-flex items-center justify-center gap-2">
                    {BUTTON_LABELS.map((label, index) => (
                      <span
                        key={label}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                          index === currentLabelIndex 
                            ? 'opacity-100' 
                            : 'opacity-0'
                        }`}
                        aria-hidden={index !== currentLabelIndex}
                      >
                        {label}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </span>
                    ))}
                  </span>
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className={`${getTypographyClasses("paragraph", { alignment: "center", removeSpacing: true })} text-sm sm:text-base`}>
              Hulp nodig? <a href="https://salonid.com/pages/contact" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-700">Klantenservice</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailStep
