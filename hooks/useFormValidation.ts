"use client"

import { useMemo } from "react"
import { useFormData } from "@/components/form/FormProvider"

export function useFormValidation(currentStep: number) {
  const { formData } = useFormData()

  const hasSelection = useMemo(() => {
    console.log("[v0] Checking hasSelection for step:", currentStep, "formData.style:", formData.style)
    
    switch (currentStep) {
      case 4: // Style Selection
        const hasStyleSelection = formData.style !== null && formData.style !== "" && formData.style !== undefined
        console.log("[v0] Style selection check:", hasStyleSelection)
        return hasStyleSelection
      
      case 5: // Elegant Styles
        return formData.elegantStyle !== ""
      
      case 6: // Elegant Variant 1
      case 7: // Elegant Variant 2
        return formData.styleVariant !== "" && formData.styleVariant !== null && formData.styleVariant !== undefined
      
      case 8: // Color Selection (2 options)
      case 9: // Color Selection (3 options)
        return formData.colorChoice !== "" && formData.colorChoice !== null && formData.colorChoice !== undefined
      
      case 10: // Color Palette
        return formData.colorPalette !== ""
      
      case 30: // Ingredients
        return formData.ingredients.length > 0
      
      default:
        return true // For slides without selections, always allow continue
    }
  }, [currentStep, formData])

  const isFormValid = useMemo(() => {
    const hasFirstName = formData.firstName && formData.firstName.trim().length >= 2
    const hasLastName = formData.lastName && formData.lastName.trim().length >= 2
    const hasValidEmail = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const hasValidPhone = !formData.phone || 
      (formData.phone && /^[\d\s\-+()]+$/.test(formData.phone) && formData.phone.replace(/\D/g, "").length >= 8)

    return hasFirstName && hasLastName && hasValidEmail && hasValidPhone
  }, [formData])

  return {
    hasSelection,
    isFormValid
  }
}