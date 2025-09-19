"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { textInputContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function TextInput({ formData, updateFormData, onNext, stepKey }: StepProps & { stepKey?: string }) {
  const config = textInputContent[stepKey as keyof typeof textInputContent]
  if (!config) {
    console.error(`No config found for text input step: ${stepKey}`)
    return null
  }

  const [inputValue, setInputValue] = useState((formData as any)[config.fieldName] || "")
  const [error, setError] = useState("")

  const handleInputChange = (value: string) => {
    setInputValue(value)
    
    // Clear error when typing
    if (error) setError("")

    // Update form data
    updateFormData({ [config.fieldName]: value })

    // Persist to localStorage
    try {
      localStorage.setItem(`salonid:${config.storageKey}`, value)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available
    }
  }

  const handleSubmit = () => {
    if (!inputValue.trim() && config.required) {
      setError(config.errorMessage || "Dit veld is verplicht")
      return
    }

    if (config.maxLength && inputValue.length > config.maxLength) {
      setError(`Maximaal ${config.maxLength} karakters toegestaan`)
      return
    }

    onNext()
  }

  return (
    <SlideContainer width="standard">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          {config.title}
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            {config.description}
          </p>
          {config.helperText && (
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              {config.helperText}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {config.multiline ? (
            <textarea
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={config.placeholder}
              className={`w-full p-4 border rounded-lg resize-none ${
                error ? "border-red-500" : "border-gray-300 focus:border-black"
              } focus:outline-none focus:ring-2 focus:ring-black/5`}
              rows={5}
              maxLength={config.maxLength}
            />
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={config.placeholder}
              className={`w-full p-4 border rounded-lg ${
                error ? "border-red-500" : "border-gray-300 focus:border-black"
              } focus:outline-none focus:ring-2 focus:ring-black/5`}
              maxLength={config.maxLength}
            />
          )}
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          {config.maxLength && (
            <p className="text-gray-500 text-sm text-right">
              {inputValue.length}/{config.maxLength} karakters
            </p>
          )}
        </div>

        {config.showContinue && (
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Doorgaan
            </button>
          </div>
        )}
      </section>
    </SlideContainer>
  )
}