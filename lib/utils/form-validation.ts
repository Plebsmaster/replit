export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email.trim()) {
    return { isValid: false, error: "E-mailadres is verplicht" }
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Voer een geldig e-mailadres in" }
  }
  
  return { isValid: true }
}

export const validateName = (name: string, fieldName: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: `${fieldName} is verplicht` }
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} moet minimaal 2 karakters bevatten` }
  }
  
  return { isValid: true }
}

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: true } // Phone is optional
  }
  
  const phoneRegex = /^[\d\s\-+()]+$/
  if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 8) {
    return { isValid: false, error: "Voer een geldig telefoonnummer in" }
  }
  
  return { isValid: true }
}

export const validateOTP = (otp: string): ValidationResult => {
  if (!otp || otp.length !== 6) {
    return { isValid: false, error: "Voer de complete 6-cijferige code in" }
  }
  
  if (!/^\d{6}$/.test(otp)) {
    return { isValid: false, error: "Code mag alleen cijfers bevatten" }
  }
  
  return { isValid: true }
}