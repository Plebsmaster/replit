"use client"

import { useState, useCallback } from "react"
import { AppError, handleApiError, getErrorMessage } from "@/lib/utils/error-handling"

interface UseErrorHandlerReturn {
  error: AppError | null
  setError: (error: any) => void
  clearError: () => void
  handleError: (error: any) => AppError
  isRetryable: boolean
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setErrorState] = useState<AppError | null>(null)

  const setError = useCallback((error: any) => {
    const appError = handleApiError(error)
    setErrorState(appError)
    console.error("[v0] Error handled:", appError)
  }, [])

  const clearError = useCallback(() => {
    setErrorState(null)
  }, [])

  const handleError = useCallback((error: any): AppError => {
    const appError = handleApiError(error)
    setErrorState(appError)
    return appError
  }, [])

  return {
    error,
    setError,
    clearError,
    handleError,
    isRetryable: error?.retryable ?? false
  }
}