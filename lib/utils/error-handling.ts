export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class NetworkError extends AppError {
  constructor(message: string = "Network connection failed") {
    super(message, "NETWORK_ERROR", 0, true)
    this.name = "NetworkError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, "VALIDATION_ERROR", 400, false)
    this.name = "ValidationError"
  }
}

export class APIError extends AppError {
  constructor(message: string, statusCode: number, retryable: boolean = false) {
    super(message, "API_ERROR", statusCode, retryable)
    this.name = "APIError"
  }
}

export function handleApiError(error: any): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return new NetworkError("Unable to connect to server. Please check your internet connection.")
  }

  if (error.status) {
    const isRetryable = error.status >= 500 || error.status === 429
    return new APIError(
      error.message || `Server error (${error.status})`,
      error.status,
      isRetryable
    )
  }

  return new AppError(error.message || "An unexpected error occurred")
}

export function getErrorMessage(error: any): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  if (error?.message) {
    return error.message
  }

  return "An unexpected error occurred"
}