"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, Clock, RefreshCw } from "lucide-react"

interface OTPStepProps {
  email: string
  onVerified: () => void
  onBack: () => void
}

export function OTPStep({ email, onVerified, onBack }: OTPStepProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
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
        <h1 className="text-3xl font-bold text-black">Verify Your Email</h1>
        <p className="text-gray-600">We've sent a 6-digit code to</p>
        <p className="font-semibold text-blue-600">{email}</p>
      </div>

      {/* OTP Input */}
      <div className="space-y-4">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 focus:border-blue-500"
              disabled={isVerifying}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Timer and Resend */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Code expires in {formatTime(timeLeft)}</span>
        </div>

        <div className="text-sm text-gray-600">
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
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent" disabled={isVerifying}>
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={isVerifying || otp.join("").length !== 6}
          className="flex-1 bg-black text-white hover:bg-gray-800"
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
