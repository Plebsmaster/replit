"use client"

import type { FormData } from '@/lib/form/schema'

/**
 * Debug utility for testing database submissions during development
 * This bypasses form validation and submits current form data directly to the database
 */
export async function debugSubmitToDatabase(formData: FormData): Promise<{
  success: boolean
  message: string
  data?: any
  error?: string
}> {
  console.group('🔍 [DEBUG] Database Submission Test')
  
  try {
    // Log the form data being submitted
    console.log('📊 Form data being submitted:', {
      email: formData.email,
      firstName: formData.firstName, 
      lastName: formData.lastName,
      phone: formData.phone,
      style: formData.style,
      elegantStyle: formData.elegantStyle,
      modernStyle: formData.modernStyle,
      styleVariant: formData.styleVariant,
      colorScheme: formData.colorScheme,
      finalColorChoice: formData.finalColorChoice,
      colorPalette: formData.colorPalette,
      productColors: formData.productColors,
      textColor: formData.textColor,
      selectedIcon: formData.selectedIcon,
      ingredients: formData.ingredients,
      agreeTerms: formData.agreeTerms,
      subscribeNewsletter: formData.subscribeNewsletter,
    })

    // Check if we have minimal required data
    const hasBasicInfo = formData.email && formData.firstName && formData.lastName
    if (!hasBasicInfo) {
      console.warn('⚠️ Warning: Missing basic contact information (email, firstName, lastName)')
      console.log('📝 Current contact info:', {
        email: formData.email || '[MISSING]',
        firstName: formData.firstName || '[MISSING]',
        lastName: formData.lastName || '[MISSING]',
        phone: formData.phone || '[EMPTY]'
      })
    }

    // Check if we have any design choices
    const hasDesignChoices = formData.style || formData.colorScheme || formData.ingredients?.length > 0
    if (!hasDesignChoices) {
      console.warn('⚠️ Warning: No design choices detected - this submission may create an incomplete design record')
    }

    console.log('🚀 Sending request to /api/submit-form...')

    // Make the API call
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log('✅ Success! Database submission completed')
      console.log('📄 Response data:', result)
      console.log('💾 Data saved:', result.data)
      
      return {
        success: true,
        message: `Successfully submitted to database! ${result.message || ''}`,
        data: result.data
      }
    } else {
      // Handle API errors
      const errorMessage = result.message || result.error || 'Unknown error occurred'
      
      console.error('❌ API Error:', {
        status: response.status,
        message: errorMessage,
        full_response: result
      })

      // Check for specific error types
      if (result.locked) {
        console.error('🔒 Design is locked - cannot submit changes')
      }
      
      if (response.status === 423) {
        console.error('🚫 Resource locked - contact support')
      }

      return {
        success: false,
        message: `Database submission failed: ${errorMessage}`,
        error: errorMessage
      }
    }
  } catch (error) {
    // Handle network/fetch errors
    console.error('💥 Network/Fetch Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown network error'
    
    return {
      success: false,
      message: `Network error during database submission: ${errorMessage}`,
      error: errorMessage
    }
  } finally {
    console.groupEnd()
  }
}

/**
 * Helper function to validate if form data has enough information for a meaningful submission
 */
export function validateFormDataForSubmission(formData: FormData): {
  isValid: boolean
  warnings: string[]
  missingRequired: string[]
} {
  const warnings: string[] = []
  const missingRequired: string[] = []

  // Check required fields
  if (!formData.email) missingRequired.push('email')
  if (!formData.firstName) missingRequired.push('firstName') 
  if (!formData.lastName) missingRequired.push('lastName')

  // Check for design completeness (warnings, not blocking)
  if (!formData.style) warnings.push('No style selected')
  if (!formData.colorScheme && !formData.finalColorChoice) warnings.push('No color choices made')
  if (!formData.ingredients || formData.ingredients.length === 0) warnings.push('No ingredients selected')
  if (!formData.agreeTerms) warnings.push('Terms not agreed to')

  const isValid = missingRequired.length === 0

  return {
    isValid,
    warnings,
    missingRequired
  }
}