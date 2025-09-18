export interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Design Preferences
  style: "elegant" | "modern" | null
  elegantStyle: string
  styleVariant: string
  variantNumber: string
  textColor: "black" | "white" | ""
  colorChoice: string
  colorPalette: string
  colorMode?: "variation" | "uniform"
  
  // Product Configuration
  ingredients: string[]
  productColors: Record<string, string>
  
  // Consent & Preferences
  agreeTerms: boolean
  subscribeNewsletter: boolean
}

export interface ValidationState {
  firstName: ValidationStatus
  lastName: ValidationStatus
  email: ValidationStatus
  phone: ValidationStatus
}

export type ValidationStatus = "idle" | "valid" | "invalid"

export interface StepConfig {
  id: number
  title: string
  component: string
  required: boolean
  validation?: (formData: FormData) => boolean
}

export interface FlowState {
  type: "normal" | "existing-user" | "new-user"
  data?: {
    email?: string
    otpSent?: boolean
  }
}

export interface SubmissionState {
  status: "idle" | "submitting" | "success" | "error"
  message?: string
  error?: string
}