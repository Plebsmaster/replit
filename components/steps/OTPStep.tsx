"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, Clock, RefreshCw, AlertCircle } from "lucide-react"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export function OTPStep({ email = '', onVerified = () => {}, onBack, sendOtp, formData }: StepProps) {
  const [otpValue, setOtpValue] = useState("") // Single string for OTP
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isGeneratingInitial, setIsGeneratingInitial] = useState(false)
  const [initialOtpGenerated, setInitialOtpGenerated] = useState(false)
  const singleInputRef = useRef<HTMLInputElement | null>(null)

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Enable resend after 60 seconds
  useEffect(() => {
    const resendTimer = setTimeout(() => setCanResend(true), 60000)
    return () => clearTimeout(resendTimer)
  }, [])

  // Guard: Only generate OTP for existing users
  // Automatically generate OTP when component mounts with valid email
  useEffect(() => {
    const generateInitialOtp = async () => {
      // GUARD: Only generate OTP for existing users
      if (!formData || !formData.isExistingUser) {
        return
      }
      
      if (!email || initialOtpGenerated || isGeneratingInitial) {
        return
      }

      setIsGeneratingInitial(true)
      setError("")

      try {
        // Call the API to actually generate and send the OTP
        const response = await fetch("/api/otp/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (data.sent === true) {
          // Notify state machine that OTP was sent
          if (sendOtp) {
            sendOtp(email)
          }
          setInitialOtpGenerated(true)
        } else if (response.status === 429) {
          setError("Too many requests. Please wait before trying again.")
        } else {
          setError(data.error || "Failed to send verification code")
        }
      } catch (error) {
        setError("Failed to send verification code. Please try again.")
      } finally {
        setIsGeneratingInitial(false)
      }
    }

    if (email) {
      generateInitialOtp()
    }
  }, [email, initialOtpGenerated, isGeneratingInitial, sendOtp, formData])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Only allow digits
    if (value.length <= 6) {
      setOtpValue(value)
      // Clear error when user starts typing
      if (error) setError("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow ctrl+v for paste
    if (e.ctrlKey && e.key === 'v') {
      return
    }
    // Allow backspace
    if (e.key === 'Backspace') {
      return
    }
    // Allow tab for navigation
    if (e.key === 'Tab') {
      return
    }
    // Block non-numeric keys except control keys
    if (!/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain')
    const digitsOnly = pastedData.replace(/\D/g, '').slice(0, 6)
    setOtpValue(digitsOnly)
    if (error) setError("")
  }

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpValue }),
      })

      const data = await response.json()

      if (data.ok) {
        onVerified()
      } else {
        setError(data.error || "Invalid verification code")
        // Clear OTP input on error
        setOtpValue("")
        singleInputRef.current?.focus()
      }
    } catch (error) {
      setError("Failed to verify code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setError("")

    try {
      const response = await fetch("/api/otp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.sent === true) {
        // Notify state machine that OTP was sent
        if (sendOtp) {
          sendOtp(email)
        }
        setTimeLeft(600) // Reset timer
        setCanResend(false)
        setOtpValue("")

        // Reset resend timer
        setTimeout(() => setCanResend(true), 60000)
      } else if (response.status === 429) {
        setError("Too many requests. Please wait before trying again.")
      } else {
        setError(data.error || "Failed to resend code")
      }
    } catch (error) {
      setError("Failed to resend code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-8">
      <div className="space-y-8 w-full max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className={getTypographyClasses("title", { alignment: "center" })}>Verifieer je e-mail</h1>
            {isGeneratingInitial ? (
              <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} text-black`}>
                Verificatiecode wordt verstuurd naar {email}...
              </p>
            ) : (
              <>
                <p className={getTypographyClasses("paragraph", { alignment: "center" })}>We hebben een 6-cijferige code gestuurd naar</p>
                <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} font-semibold text-black`}>
                  {email}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
          {/* OTP Input - Single input with visual boxes */}
          <div className="space-y-4">
            <div className="relative">
              {/* Hidden input for actual typing */}
              <input
                ref={singleInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otpValue}
                onChange={handleOtpChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isVerifying || isGeneratingInitial}
                autoComplete="one-time-code"
                placeholder=""
                aria-label="Enter 6-digit verification code"
              />
              
              {/* Visual representation of OTP boxes */}
              <div className="flex justify-center gap-2 sm:gap-3 pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`
                      w-11 h-12 sm:w-12 sm:h-14 
                      flex items-center justify-center
                      text-xl sm:text-2xl font-bold 
                      border-2 rounded-lg
                      bg-white text-gray-900
                      transition-all duration-200
                      ${
                        otpValue[index] 
                          ? 'border-black bg-gray-50' 
                          : index === otpValue.length 
                            ? 'border-black animate-pulse' 
                            : 'border-gray-300'
                      }
                      ${isVerifying || isGeneratingInitial ? 'opacity-50' : ''}
                    `}
                  >
                    {otpValue[index] || ''}
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="text-center text-sm text-gray-500 cursor-pointer"
              onClick={() => singleInputRef.current?.focus()}
            >
              Click here or press Ctrl+V to paste code
            </div>

            {error && <p className="text-red-500 text-sm flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
          </div>

          {/* Timer and Resend */}
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className={getTypographyClasses("paragraph", { removeSpacing: true })}>
                Code verloopt over {formatTime(timeLeft)}
              </span>
            </div>

            <div className={getTypographyClasses("paragraph", { removeSpacing: true })}>
              Geen code ontvangen?{" "}
              <button
                onClick={handleResend}
                disabled={!canResend || isResending}
                className="text-black hover:text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed underline"
              >
                {isResending ? (
                  <span className="inline-flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Versturen...
                  </span>
                ) : (
                  "Code opnieuw versturen"
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={onBack} variant="outline" className="flex-1 bg-white border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 text-base" disabled={isVerifying || isGeneratingInitial}>
              Terug
            </Button>
            <Button
              onClick={handleVerify}
              disabled={isVerifying || isGeneratingInitial || otpValue.length !== 6}
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifiëren...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Verifieer
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPStep
