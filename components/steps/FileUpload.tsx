"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { fileUploadContent } from "@/lib/slide-content-config"
import type { StepProps } from "@/lib/form/steps"

export default function FileUpload({ formData, updateFormData, onNext, stepKey }: StepProps & { stepKey?: string }) {
  const config = fileUploadContent[stepKey as keyof typeof fileUploadContent]
  if (!config) {
    console.error(`No config found for file upload step: ${stepKey}`)
    return null
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>((formData as any)[config.fieldName] || null)
  const [error, setError] = useState("")

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (config.acceptedTypes && !config.acceptedTypes.includes(file.type)) {
      setError(config.errorMessage || "Bestandstype niet toegestaan")
      return
    }

    // Validate file size
    if (config.maxSize && file.size > config.maxSize) {
      setError(`Bestand te groot. Maximaal ${config.maxSize / 1024 / 1024}MB toegestaan`)
      return
    }

    setSelectedFile(file)
    setError("")

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        updateFormData({ [config.fieldName]: result })
      }
      reader.readAsDataURL(file)
    } else {
      updateFormData({ [config.fieldName]: file.name })
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    updateFormData({ [config.fieldName]: null })
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
          {config.instructions && (
            <p className={getTypographyClasses("cardDescription", { alignment: "left" })}>
              {config.instructions}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {preview ? (
            <div className="relative inline-block">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-md rounded-lg border border-gray-300 shadow-sm"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                onChange={handleFileSelect}
                accept={config.acceptedTypes?.join(",")}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="text-6xl text-gray-400">📁</div>
                  <p className="text-gray-600">
                    {config.placeholder || "Klik hier om een bestand te selecteren"}
                  </p>
                  {config.acceptedTypes && (
                    <p className="text-sm text-gray-500">
                      Toegestane formaten: {config.acceptedTypes.join(", ")}
                    </p>
                  )}
                </div>
              </label>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {selectedFile && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Geselecteerd bestand: <strong>{selectedFile.name}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Grootte: {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        {config.showContinue && (
          <div className="mt-8">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              disabled={config.required && !selectedFile}
            >
              Doorgaan
            </button>
          </div>
        )}
      </section>
    </SlideContainer>
  )
}