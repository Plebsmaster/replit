"use client"

import { useState, useCallback } from "react"

interface UseRetryOptions {
  maxRetries?: number
  retryDelay?: number
  onError?: (error: Error, retryCount: number) => void
  onSuccess?: () => void
}

interface UseRetryReturn<T> {
  execute: (...args: any[]) => Promise<T>
  isLoading: boolean
  error: Error | null
  retryCount: number
  canRetry: boolean
  reset: () => void
}

export function useRetry<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseRetryOptions = {},
): UseRetryReturn<T> {
  const { maxRetries = 3, retryDelay = 1000, onError, onSuccess } = options

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      setIsLoading(true)
      setError(null)

      let currentRetry = 0

      while (currentRetry <= maxRetries) {
        try {
          const result = await asyncFunction(...args)
          setRetryCount(0)
          setIsLoading(false)
          onSuccess?.()
          return result
        } catch (err) {
          const error = err instanceof Error ? err : new Error("Unknown error")

          if (currentRetry === maxRetries) {
            setError(error)
            setRetryCount(currentRetry)
            setIsLoading(false)
            onError?.(error, currentRetry)
            throw error
          }

          currentRetry++
          setRetryCount(currentRetry)
          onError?.(error, currentRetry)

          if (retryDelay > 0) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay))
          }
        }
      }

      throw new Error("Max retries exceeded")
    },
    [asyncFunction, maxRetries, retryDelay, onError, onSuccess],
  )

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setRetryCount(0)
  }, [])

  return {
    execute,
    isLoading,
    error,
    retryCount,
    canRetry: retryCount < maxRetries,
    reset,
  }
}
