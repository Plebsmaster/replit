"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { FormData } from "@/lib/form/schema"

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
