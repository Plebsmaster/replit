"use client"

import { createContext, useContext, type ReactNode } from "react"

export interface FormData {
  ingredients: string[]
  style: "elegant" | "modern" | null
  elegantStyle: string
  styleVariant: string
  colorScheme: string // Added colorScheme field for Slide6
  variantNumber: string
  textColor: "black" | "white" | ""
  colorPalette: string
  productColors: Record<string, string>
  colorMode?: "variation" | "uniform"
  firstName: string
  lastName: string
  email: string
  phone: string
  agreeTerms: boolean
  subscribeNewsletter: boolean
}

interface FormDataContextType {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined)

export function FormDataProvider({
  children,
  formData,
  updateFormData,
}: {
  children: ReactNode
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}) {
  return <FormDataContext.Provider value={{ formData, updateFormData }}>{children}</FormDataContext.Provider>
}

export function useFormData() {
  const context = useContext(FormDataContext)
  if (context === undefined) {
    throw new Error("useFormData must be used within a FormDataProvider")
  }
  return context
}
