import type { ApiResponse, ClientData, Submission } from "./types"

export class ApiClient {
  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      let data: any
      const contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        throw new Error(`Server returned non-JSON response: ${response.status}`)
      }

      if (!response.ok) {
        return {
          success: false,
          error: data.error || data.message || `HTTP ${response.status}`,
        }
      }

      return {
        success: true,
        data,
        ...data,
      }
    } catch (error) {
      console.error(`[v0] API Error (${endpoint}):`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  static async generateOTP(email: string): Promise<ApiResponse<{ sent: boolean }>> {
    return this.request("/api/otp/generate", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  static async verifyOTP(email: string, code: string): Promise<ApiResponse<{ verified: boolean }>> {
    return this.request("/api/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    })
  }

  static async submitForm(formData: any): Promise<ApiResponse> {
    return this.request("/api/submit-form", {
      method: "POST",
      body: JSON.stringify(formData),
    })
  }

  static async getClientData(): Promise<ApiResponse<{ client: ClientData }>> {
    return this.request("/api/client/me")
  }

  static async getSubmissions(email: string): Promise<ApiResponse<Submission[]>> {
    return this.request(`/api/submit-form?email=${encodeURIComponent(email)}`)
  }

  static async setActiveSubmission(submissionId: string, email: string): Promise<ApiResponse> {
    return this.request("/api/set-active-submission", {
      method: "POST",
      body: JSON.stringify({ submissionId, email }),
    })
  }

  static async deleteSubmission(submissionId: string, email: string): Promise<ApiResponse> {
    return this.request("/api/delete-submission", {
      method: "DELETE",
      body: JSON.stringify({ submissionId, email }),
    })
  }
}
