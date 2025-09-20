import { z } from 'zod'
import {
  FormData,
  FormDataSchema,
  stepSchemas,
  StepId,
  validateStep as validateStepSchema,
} from './schema'

// ===== Validation Result Types =====
export interface ValidationResult<T = unknown> {
  success: boolean
  data?: T
  errors?: ValidationError[]
}

export interface ValidationError {
  field: string
  message: string
  code?: string
}

export interface FieldValidationState {
  state: 'idle' | 'valid' | 'invalid'
  error?: string
}

// ===== Field-level Validation =====
export const validateField = (
  fieldName: keyof FormData,
  value: unknown
): FieldValidationState => {
  try {
    // Get the field schema from the main schema
    const fieldSchema = FormDataSchema.shape[fieldName]
    
    if (!fieldSchema) {
      return { state: 'idle' }
    }

    // Validate the single field
    const result = fieldSchema.safeParse(value)
    
    if (!result.success) {
      const error = result.error.errors[0]
      return {
        state: 'invalid',
        error: error?.message || `${fieldName} is invalid`,
      }
    }
    
    return { state: 'valid' }
  } catch (error) {
    return { state: 'idle' }
  }
}

// ===== Step-level Validation =====
export const validateStepData = <T extends StepId>(
  stepId: T,
  data: Partial<FormData>
): ValidationResult => {
  const schema = stepSchemas[stepId]
  
  if (!schema) {
    return { success: true }
  }

  const result = validateStepSchema(schema, data)
  
  if (!result.success) {
    const errors: ValidationError[] = result.errors?.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    })) || []
    
    return { success: false, errors }
  }
  
  return { success: true, data: result.data }
}

// ===== Full Form Validation =====
export const validateForm = (
  formData: Partial<FormData>
): ValidationResult<FormData> => {
  const result = FormDataSchema.safeParse(formData)
  
  if (!result.success) {
    const errors: ValidationError[] = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }))
    
    return { success: false, errors }
  }
  
  return { success: true, data: result.data }
}

// ===== Partial Form Validation =====
export const validatePartialForm = (
  formData: Partial<FormData>,
  requiredFields: Array<keyof FormData>
): ValidationResult<Partial<FormData>> => {
  // Create a partial schema with only required fields
  const partialSchemaShape = requiredFields.reduce((acc, field) => {
    acc[field] = FormDataSchema.shape[field]
    return acc
  }, {} as Record<string, z.ZodTypeAny>)
  
  const partialSchema = z.object(partialSchemaShape)
  const result = partialSchema.safeParse(formData)
  
  if (!result.success) {
    const errors: ValidationError[] = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }))
    
    return { success: false, errors }
  }
  
  return { success: true, data: result.data }
}

// ===== Validation State Management =====
export interface ValidationStateMap {
  [key: string]: FieldValidationState
}

export const createValidationState = (
  fields: Array<keyof FormData>
): ValidationStateMap => {
  return fields.reduce((acc, field) => {
    acc[field as string] = { state: 'idle' }
    return acc
  }, {} as ValidationStateMap)
}

export const updateValidationState = (
  currentState: ValidationStateMap,
  field: keyof FormData,
  value: unknown
): ValidationStateMap => {
  const fieldState = validateField(field, value)
  return {
    ...currentState,
    [field]: fieldState,
  }
}

// ===== Error Message Helpers =====
export const getFieldError = (
  errors: ValidationError[],
  fieldName: string
): string | undefined => {
  const error = errors.find((err) => err.field === fieldName)
  return error?.message
}

export const hasFieldError = (
  errors: ValidationError[],
  fieldName: string
): boolean => {
  return errors.some((err) => err.field === fieldName)
}

export const getErrorSummary = (errors: ValidationError[]): string => {
  if (errors.length === 0) return ''
  if (errors.length === 1) return errors[0].message
  return `Er zijn ${errors.length} fouten gevonden. Controleer de gemarkeerde velden.`
}

// ===== Step Completion Helpers =====
export const getRequiredFieldsForStep = (stepId: StepId): Array<keyof FormData> => {
  const stepFieldMap: Record<StepId, Array<keyof FormData>> = {
    welcome: [],
    email: ['email'],
    namePhone: ['firstName', 'lastName', 'phone'],
    otp: [],
    styleSelection: ['style'],
    elegantStyle: ['elegantStyle'],
    styleVariant: ['styleVariant'],
    colorScheme: ['colorScheme'],
    finalColor: ['finalColorChoice'],
    colorPalette: ['colorPalette', 'productColors'],
    textColor: ['textColor'],
    iconSelection: ['selectedIcon'],
    modernStyle: ['modernStyle'],
    slide16Color: ['kleurZwartWit'],
    slide19Icon: ['icoonJaNee'],
    iconChoice: ['iconChoice'],
    productNamingChoice: ['productNamingChoice'],
    slide27Haarserum: ['naamHaarserum'],
    slide28StylingProducts: ['naamHaarlak', 'naamMousse', 'naamDroogshampoo', 'naamGel', 'naamClayPaste', 'naamFiberPaste', 'naamCreamPaste'],
    slide30NoYellowIngredients: ['noYellowIngredients'],
    slide31RepairIngredients: ['repairIngredients'],
    slide32ColorIngredients: ['colorIngredients'],
    slide33CurlyGirlIngredients: ['curlyGirlIngredients'],
    slide34MannenShampooIngredients: ['mannenShampooIngredient'],
    slide35HaarserumIngredients: ['haarserumIngredient'],
    slide36StylingProductsIngredients: ['stylingProductsIngredients'],
    slide37MetZonderClaim: ['metZonderClaim'],
    claimChoice: ['claimChoice'],
    slide39NoYellowClaims: ['noYellowClaims'],
    slide40RepairClaims: ['repairClaims'],
    slide41ColorClaims: ['colorClaims'],
    slide42CurlyGirlClaims: ['curlyGirlClaims'],
    slide43MannenClaims: ['mannenClaims'],
    slide44HaarseurumClaims: ['haarseurumClaims'],
    slide45StylingClaims: ['stylingClaims'],
    ingredients: ['ingredients'],
    agreements: ['agreeTerms', 'subscribeNewsletter'],
  }
  
  return stepFieldMap[stepId] || []
}

export const isStepComplete = (
  stepId: StepId,
  formData: Partial<FormData>
): boolean => {
  const result = validateStepData(stepId, formData)
  return result.success
}

export const getIncompleteSteps = (
  formData: Partial<FormData>
): StepId[] => {
  const incompleteSteps: StepId[] = []
  
  Object.keys(stepSchemas).forEach((stepId) => {
    if (!isStepComplete(stepId as StepId, formData)) {
      incompleteSteps.push(stepId as StepId)
    }
  })
  
  return incompleteSteps
}

// ===== Form Submission Validation =====
export const canSubmitForm = (formData: Partial<FormData>): boolean => {
  // Check required steps for submission
  const requiredSteps: StepId[] = [
    'email',
    'namePhone',
    'styleSelection',
    'ingredients',
    'agreements',
  ]
  
  return requiredSteps.every((step) => isStepComplete(step, formData))
}

export const getSubmissionErrors = (
  formData: Partial<FormData>
): ValidationError[] => {
  const errors: ValidationError[] = []
  
  if (!formData.email) {
    errors.push({ field: 'email', message: 'E-mailadres is verplicht' })
  }
  
  if (!formData.firstName) {
    errors.push({ field: 'firstName', message: 'Voornaam is verplicht' })
  }
  
  if (!formData.lastName) {
    errors.push({ field: 'lastName', message: 'Achternaam is verplicht' })
  }
  
  if (!formData.style) {
    errors.push({ field: 'style', message: 'Kies een stijl' })
  }
  
  if (!formData.ingredients || formData.ingredients.length === 0) {
    errors.push({
      field: 'ingredients',
      message: 'Selecteer minimaal één ingrediënt',
    })
  }
  
  if (!formData.agreeTerms) {
    errors.push({
      field: 'agreeTerms',
      message: 'U moet akkoord gaan met de voorwaarden',
    })
  }
  
  return errors
}

// ===== Re-export Schema Types =====
export type { FormData, StepId } from './schema'
export { FormDataSchema, getDefaultFormData } from './schema'