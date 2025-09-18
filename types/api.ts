export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface OTPGenerateRequest {
  email: string
}

export interface OTPGenerateResponse {
  sent: boolean
}

export interface OTPVerifyRequest {
  email: string
  code: string
}

export interface OTPVerifyResponse {
  verified: boolean
}

export interface FormSubmissionRequest extends FormData {
  timestamp?: string
}

export interface ClientData {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Submission {
  id: string
  clientId: string
  formData: FormData
  status: "draft" | "submitted" | "locked"
  isActive: boolean
  createdAt: string
  updatedAt: string
}