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
  const [glareKey, setGlareKey] = useState(0)

  // Button text rotation effect
  useEffect(() => {
    if (isLoading) return // Pause rotation during loading
    
    const rotationInterval = setInterval(() => {
      setCurrentLabelIndex((prev) => (prev + 1) % BUTTON_LABELS.length)
      setGlareKey((prev) => prev + 1) // Trigger glare animation
    }, 5000) // Switch every 5 seconds
    
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
    const baseClass = "w-full p-4 border rounded-lg transition-colors duration-200 text-lg"
    const focusClass = "focus:outline-none focus:ring-2 focus:ring-offset-1"

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
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-8">
      <div className="space-y-8 w-full max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/salonid.svg" 
              alt="SalonID logo" 
              width={280} 
              height={120}
              priority
            />
          </div>
          <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} max-w-2xl mx-auto`}>
            Start nu je eigen merk of ga direct naar je dashboard.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 max-w-md mx-auto flex flex-col justify-center">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
            <Input
              type="email"
              placeholder="je@email.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyPress={handleKeyPress}
              className={`${getInputClassName()} pl-12 pr-12`}
              autoFocus
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">{getValidationIcon()}</div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}

          <div className="mt-6">
            <Button
              onClick={handleNext}
              disabled={validationState !== "valid" || isLoading}
              className="relative w-full bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden"
              aria-label="Starten of inloggen"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Controleren...
                </>
              ) : (
                <>
                  {/* Button text that changes */}
                  <span 
                    key={currentLabelIndex} 
                    className="relative z-10 animate-fade-swap"
                    aria-hidden="true"
                  >
                    {BUTTON_LABELS[currentLabelIndex]}
                  </span>
                  
                  {/* Glare animation on entire button */}
                  <span 
                    key={glareKey} 
                    className="glare-run" 
                    aria-hidden="true" 
                  />
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className={getTypographyClasses("paragraph", { alignment: "center", removeSpacing: true })}>
              Hulp nodig? <a href="https://salonid.com/pages/contact" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-700">Klantenservice</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailStep
