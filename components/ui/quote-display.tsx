"use client"

import { useState, useEffect } from "react"
import { quotes } from "@/lib/quotes"

export function QuoteDisplay() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  // Explicitly typed quotes array to ensure type safety
  const quotesArray: readonly string[] = quotes

  useEffect(() => {
    // Change quote every 6 seconds
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // After fade out, change quote and fade in
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotesArray.length)
        setIsVisible(true)
      }, 500) // Wait for fade out to complete
    }, 6000)

    return () => clearInterval(interval)
  }, [quotesArray])

  // Don't render if no quotes
  if (quotesArray.length === 0) return null

  return (
    <div className="w-full pointer-events-none">
      <div className="text-center">
        <p
          className={`
            text-sm md:text-base text-gray-600 italic
            transition-all duration-500 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          "{quotesArray[currentQuoteIndex]}"
        </p>
      </div>
    </div>
  )
}