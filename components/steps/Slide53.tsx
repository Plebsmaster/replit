"use client"

import { useState, useRef, useEffect } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import type { StepProps } from "@/lib/form/steps"

type LogoMeta = {
  name: string
  sizeBytes: number
  dataURL: string
  ext: ".pdf" | ".ai" | ".eps" | ".jpg" | ".jpeg" | ".png"
}

const ACCEPT_EXTS = [".pdf", ".ai", ".eps", ".jpg", ".jpeg", ".png"] as const
const ACCEPT_STRING = ACCEPT_EXTS.join(",")
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB (safe for localStorage)

function getExt(name: string): string {
  const dot = name.lastIndexOf(".")
  return dot >= 0 ? name.slice(dot).toLowerCase() : ""
}

function isValidFileType(file: File): boolean {
  const ext = getExt(file.name)
  // Accept any file with a valid extension, regardless of MIME type
  // This handles AI/EPS files that browsers may not recognize or set unknown MIME types for
  return (ACCEPT_EXTS as readonly string[]).includes(ext)
}

export default function Slide53({ updateFormData, formData, onNext, onBack }: StepProps) {
  const initialLogo = formData?.naamLogo ? {
    name: formData.naamLogo as string,
    sizeBytes: 0,
    dataURL: formData.afbeeldingsURL as string,
    ext: getExt(formData.naamLogo as string) as LogoMeta["ext"]
  } : null
  
  const [uploadedFile, setUploadedFile] = useState<LogoMeta | null>(initialLogo)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Keep global form state in sync
    if (uploadedFile) {
      updateFormData({ 
        naamLogo: uploadedFile.name,
        afbeeldingsURL: uploadedFile.dataURL
      })
      try {
        // Only store filename, not the large data URL to avoid localStorage quota issues
        localStorage.setItem("salonid:logoFile", uploadedFile.name)
        localStorage.setItem("salonid:dateISO", new Date().toISOString())
      } catch (e) {
        console.warn('Failed to save to localStorage:', e)
      }
    } else {
      updateFormData({ naamLogo: '', afbeeldingsURL: '' })
      // Clear localStorage when file is removed
      try {
        localStorage.removeItem("salonid:logoFile")
        localStorage.removeItem("salonid:dateISO")
      } catch {}
    }
  }, [uploadedFile, updateFormData])

  const handleFileSelect = async (file: File) => {
    setError(null) // Clear previous errors
    
    // Validate file type
    if (!isValidFileType(file)) {
      setError("Alleen AI, EPS, PDF, JPG en PNG bestanden zijn toegestaan.")
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`Bestand is te groot. Maximale grootte is ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
      return
    }

    setIsUploading(true)
    
    try {
      // Convert file to data URL for storage
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target?.result as string
        
        setUploadedFile({
          name: file.name,
          sizeBytes: file.size,
          dataURL: dataURL,
          ext: getExt(file.name) as LogoMeta["ext"],
        })
        setIsUploading(false)
        setError(null)
      }
      
      reader.onerror = () => {
        setError("Er is een fout opgetreden bij het lezen van het bestand.")
        setIsUploading(false)
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('File upload error:', error)
      setError("Er is een fout opgetreden bij het uploaden van het bestand.")
      setIsUploading(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) handleFileSelect(files[0])
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const onClickPicker = () => fileInputRef.current?.click()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFileSelect(f)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <SlideContainer width="wide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>Logo Upload</h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Upload je logo hier. Voor de beste resultaten met onze druktechnieken accepteren wij 
            de volgende bestandsformaten: <strong>AI, EPS, PDF</strong> (vectorformaten) en 
            <strong>JPG, PNG</strong> (hoge resolutie afbeeldingen).
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Zorg ervoor dat je logo een hoge kwaliteit heeft en geschikt is voor productie. 
            Maximale bestandsgrootte is 5MB.
          </p>
        </div>

        <div className="max-w-[600px] mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              isDragOver
                ? "border-black bg-gray-50"
                : uploadedFile
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={onClickPicker}
            role="button"
            aria-label="Upload je logo (AI, EPS, PDF, JPG, PNG)"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClickPicker()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_STRING}
              onChange={onInputChange}
              className="hidden"
            />

            {isUploading ? (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">Bestand wordt geüpload...</p>
              </div>
            ) : uploadedFile ? (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.sizeBytes / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <p className="text-sm text-green-600">Logo succesvol geüpload!</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Verwijder bestand
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">
                    Klik hier, of sleep je logo hierheen om te uploaden.
                  </p>
                  <p className="text-sm text-gray-600">AI, EPS, PDF, JPG, PNG (Max. 5MB)</p>
                </div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </section>
    </SlideContainer>
  )
}