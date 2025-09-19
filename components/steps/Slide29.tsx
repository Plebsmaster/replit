"use client"

import React, { useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type Props = StepProps

export default function Slide29({ onNext, updateFormData }: Props) {
  useEffect(() => {
    // Auto-continue after 2 seconds as specified in requirements
    const timer = setTimeout(() => {
      queueMicrotask(() => {
        onNext()
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <SlideContainer width="standard">
      <section>
        <div className="text-center space-y-8">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className={getTypographyClasses("title", { alignment: "center" })}>
            Perfect!
          </h2>

          {/* Confirmation message */}
          <div className="max-w-2xl mx-auto space-y-4">
            <p className={getTypographyClasses("subtitle", { alignment: "center" })}>
              Product namen zijn toegepast door SalonID
            </p>
            <p className={getTypographyClasses("paragraph", { alignment: "center" })}>
              Op basis van grondig onderzoek hebben wij de beste namen voor jouw producten geselecteerd. 
              Deze zijn nu automatisch toegepast aan jouw productlijn.
            </p>
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center items-center space-x-2 text-gray-600">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </section>
    </SlideContainer>
  )
}