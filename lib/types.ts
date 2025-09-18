export interface FormData {
  ingredients: string[]
  style: string
  textColor: string
  colorPalette: string
  productColors: Record<string, string>
  firstName: string
  lastName: string
  email: string
  phone: string
  agreeTerms: boolean
  subscribeNewsletter: boolean
}

export interface Submission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  style: string | null
  text_color: string | null
  color_palette: string | null
  color_mode: string | null
  ingredients: string[]
  product_colors: Record<string, string>
  is_active: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
}

export interface ClientData {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface ValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export interface ValidationState {
  firstName: "idle" | "valid" | "invalid"
  lastName: "idle" | "valid" | "invalid"
  email: "idle" | "valid" | "invalid"
  phone: "idle" | "valid" | "invalid"
}

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}
