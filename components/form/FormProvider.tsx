"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface FormData {
  ingredients: string[]
  style: "elegant" | "modern" | null
  elegantStyle: string
  styleVariant: string
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
  colorChoice: string
}

interface FormContextType {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  resetForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

const initialFormData: FormData = {
  ingredients: [],
  style: null,
  elegantStyle: "",
  styleVariant: "",
  variantNumber: "",
  textColor: "",
  colorPalette: "",
  productColors: {},
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  agreeTerms: false,
  subscribeNewsletter: false,
  colorChoice: "",
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = (updates: Partial<FormData>) => {
    console.log("[v0] FormProvider: Updating form data:", updates)
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormData() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider")
  }
  return context
}