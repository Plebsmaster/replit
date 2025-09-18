import type { FormData, ValidationErrors } from "./types"

export const validateField = (
  field: keyof FormData,
  value: string,
): { error?: string; state: "idle" | "valid" | "invalid" } => {
  switch (field) {
    case "firstName":
      if (!value.trim()) {
        return { error: "Voornaam is verplicht", state: "invalid" }
      } else if (value.trim().length < 2) {
        return { error: "Voornaam moet minimaal 2 karakters bevatten", state: "invalid" }
      }
      return { state: "valid" }

    case "lastName":
      if (!value.trim()) {
        return { error: "Achternaam is verplicht", state: "invalid" }
      } else if (value.trim().length < 2) {
        return { error: "Achternaam moet minimaal 2 karakters bevatten", state: "invalid" }
      }
      return { state: "valid" }

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        return { error: "E-mailadres is verplicht", state: "invalid" }
      } else if (!emailRegex.test(value)) {
        return { error: "Voer een geldig e-mailadres in", state: "invalid" }
      }
      return { state: "valid" }

    case "phone":
      if (value.trim()) {
        const phoneRegex = /^[\d\s\-+()]+$/
        if (!phoneRegex.test(value) || value.replace(/\D/g, "").length < 8) {
          return { error: "Voer een geldig telefoonnummer in", state: "invalid" }
        }
        return { state: "valid" }
      }
      return { state: "idle" }

    default:
      return { state: "idle" }
  }
}

export const validateForm = (formData: FormData): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {}

  const firstNameResult = validateField("firstName", formData.firstName)
  if (firstNameResult.error) errors.firstName = firstNameResult.error

  const lastNameResult = validateField("lastName", formData.lastName)
  if (lastNameResult.error) errors.lastName = lastNameResult.error

  const emailResult = validateField("email", formData.email)
  if (emailResult.error) errors.email = emailResult.error

  const phoneResult = validateField("phone", formData.phone)
  if (phoneResult.error) errors.phone = phoneResult.error

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
