"use client"

import { useMemo } from "react"
import { useFormData } from "@/components/form/FormProvider"
import { validateEmail, validateName, validatePhone } from "@/lib/utils/form-validation"

export function useMemoizedValidation() {
  const { formData } = useFormData()

  const validationResults = useMemo(() => {
    return {
      firstName: validateName(formData.firstName, "Voornaam"),
      lastName: validateName(formData.lastName, "Achternaam"),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
    }
  }, [formData.firstName, formData.lastName, formData.email, formData.phone])

  const isFormValid = useMemo(() => {
    return Object.values(validationResults).every(result => result.isValid)
  }, [validationResults])

  return {
    validationResults,
    isFormValid
  }
}