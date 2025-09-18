"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, Clock, RefreshCw } from "lucide-react"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

export function OTPStep({ email = '', onVerified = () => {}, onBack, sendOtp, formData }: StepProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isGeneratingInitial, setIsGeneratingInitial] = useState(false)
  const [initialOtpGenerated, setInitialOtpGenerated] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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
        console.log('[OTPStep] Skipping OTP generation for new user')
        return
      }
      
      if (!email || initialOtpGenerated || isGeneratingInitial) {
        return
      }

      setIsGeneratingInitial(true)
      setError("")

      try {
        console.log('[OTPStep] Generating initial OTP for existing user:', email)
        
        // Call the API to actually generate and send the OTP
        const response = await fetch("/api/otp/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()
        console.log('[OTPStep] Initial OTP response:', data)

        if (data.sent === true) {
          // Notify state machine that OTP was sent
          if (sendOtp) {
            sendOtp(email)
          }
          setInitialOtpGenerated(true)
          console.log('[OTPStep] Initial OTP sent successfully')
        } else if (response.status === 429) {
          setError("Too many requests. Please wait before trying again.")
        } else {
          setError(data.error || "Failed to send verification code")
        }
      } catch (error) {
        console.error('[OTPStep] Failed to generate initial OTP:', error)
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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6)
      const newOtp = [...otp]
      for (let i = 0; i < pastedValue.length && i + index < 6; i++) {
        newOtp[i + index] = pastedValue[i]
      }
      setOtp(newOtp)

      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + pastedValue.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpString }),
      })

      const data = await response.json()

      if (data.ok) {
        onVerified()
      } else {
        setError(data.error || "Invalid verification code")
        // Clear OTP inputs on error
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
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
        setOtp(["", "", "", "", "", ""])

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
    <div className="space-y-8 text-center max-w-md mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
          <Mail className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className={getTypographyClasses("title", { alignment: "center" })}>Verify Your Email</h1>
        {isGeneratingInitial ? (
          <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} text-blue-600`}>
            Sending verification code to {email}...
          </p>
        ) : (
          <>
            <p className={getTypographyClasses("paragraph", { alignment: "center" })}>We've sent a 6-digit code to</p>
            <p className={`${getTypographyClasses("paragraph", { alignment: "center" })} font-semibold text-blue-600`}>
              {email}
            </p>
          </>
        )}
      </div>

      {/* OTP Input */}
      <div className="space-y-4">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 bg-white text-gray-900 focus:border-blue-500 focus:bg-white"
              disabled={isVerifying || isGeneratingInitial}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Timer and Resend */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className={getTypographyClasses("paragraph", { removeSpacing: true })}>
            Code expires in {formatTime(timeLeft)}
          </span>
        </div>

        <div className={getTypographyClasses("paragraph", { removeSpacing: true })}>
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={!canResend || isResending}
            className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isResending ? (
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Sending...
              </span>
            ) : (
              "Resend code"
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent" disabled={isVerifying || isGeneratingInitial}>
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={isVerifying || isGeneratingInitial || otp.join("").length !== 6}
          className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
        >
          {isVerifying ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Verify
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
