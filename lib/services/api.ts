interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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

  async generateOTP(email: string) {
    return this.request<{ sent: boolean }>("/api/otp/generate", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async verifyOTP(email: string, code: string) {
    return this.request<{ verified: boolean }>("/api/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    })
  }

  async submitForm(formData: any) {
    return this.request("/api/submit-form", {
      method: "POST",
      body: JSON.stringify(formData),
    })
  }

  async getClientData() {
    return this.request("/api/client/me")
  }

  async getSubmissions(email: string) {
    return this.request(`/api/submit-form?email=${encodeURIComponent(email)}`)
  }

  async setActiveSubmission(submissionId: string, email: string) {
    return this.request("/api/set-active-submission", {
      method: "POST",
      body: JSON.stringify({ submissionId, email }),
    })
  }

  async deleteSubmission(submissionId: string, email: string) {
    return this.request("/api/delete-submission", {
      method: "DELETE",
      body: JSON.stringify({ submissionId, email }),
    })
  }
}

export const apiService = new ApiService()