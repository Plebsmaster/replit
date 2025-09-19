"use client"

import { useState, useEffect } from "react"
import { quotes } from "@/lib/quotes"

export function QuoteDisplay() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Change quote every 6 seconds
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // After fade out, change quote and fade in
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
        setIsVisible(true)
      }, 500) // Wait for fade out to complete
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  // Don't render if no quotes
  if (quotes.length === 0) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 z-10 pointer-events-none">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p
          className={`
            text-sm md:text-base text-gray-600 italic
            transition-all duration-500 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          "{quotes[currentQuoteIndex]}"
        </p>
      </div>
    </div>
  )
}