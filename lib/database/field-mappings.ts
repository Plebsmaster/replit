import { FormData } from '@/lib/form/schema'

// ===== Type Definitions =====

/**
 * Transformation function type for converting form values to database values
 */
export type TransformFunction<T = any, U = any> = (value: T) => U

/**
 * Field mapping configuration interface
 */
export interface FieldMapping {
  /** The database column name */
  dbField: string
  /** The form field name (optional if it matches the key) */
  formField?: string
  /** Whether this field is required */
  required?: boolean
  /** Default value if the form field is missing or null/undefined */
  defaultValue?: any
  /** Transformation function to apply to the value */
  transform?: TransformFunction
  /** Whether this field should be included in the mapping */
  include?: boolean
}

/**
 * Complete field mappings configuration
 */
export type FieldMappings = Record<string, FieldMapping>

/**
 * Database record type (snake_case fields)
 */
export interface DatabaseRecord {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string | null
  style?: string | null
  text_color?: string | null
  color_palette?: string | null
  color_mode?: string | null
  'Kleur/Zwart/Wit'?: string | null
  'Icoon ja/nee'?: string | null
  ingredients?: string[]
  product_colors?: Record<string, any>
  agree_terms?: boolean
  subscribe_newsletter?: boolean
}

// ===== Transformation Functions =====

/**
 * Converts a value to string or null if empty/undefined
 */
export const toNullableString: TransformFunction<any, string | null> = (value) => {
  return value && value !== '' ? String(value) : null
}

/**
 * Converts a value to an array, with default empty array
 */
export const toArray: TransformFunction<any, any[]> = (value) => {
  if (Array.isArray(value)) return value
  return []
}

/**
 * Converts a value to an object, with default empty object
 */
export const toObject: TransformFunction<any, Record<string, any>> = (value) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value
  return {}
}

/**
 * Converts a value to boolean, with default false
 */
export const toBoolean: TransformFunction<any, boolean> = (value) => {
  return Boolean(value)
}

// ===== Field Mappings Configuration =====

/**
 * Centralized field mappings configuration
 * Maps form fields (camelCase) to database fields (snake_case)
 */
export const FIELD_MAPPINGS: FieldMappings = {
  firstName: {
    dbField: 'first_name',
    required: false, // Handle validation at API level if needed
  },
  lastName: {
    dbField: 'last_name',
    required: false,
  },
  email: {
    dbField: 'email',
    required: false,
  },
  phone: {
    dbField: 'phone',
    defaultValue: null,
    transform: toNullableString,
  },
  style: {
    dbField: 'style',
    defaultValue: null,
    transform: toNullableString,
  },
  textColor: {
    dbField: 'text_color',
    defaultValue: null,
    transform: toNullableString,
  },
  colorPalette: {
    dbField: 'color_palette',
    defaultValue: null,
    transform: toNullableString,
  },
  colorMode: {
    dbField: 'color_mode',
    defaultValue: null,
    transform: toNullableString,
  },
  kleurZwartWit: {
    dbField: 'Kleur/Zwart/Wit',
    defaultValue: null,
    transform: toNullableString,
  },
  icoonJaNee: {
    dbField: 'Icoon ja/nee',
    defaultValue: null,
    transform: toNullableString,
  },
  ingredients: {
    dbField: 'ingredients',
    defaultValue: [],
    transform: toArray,
  },
  productColors: {
    dbField: 'product_colors',
    defaultValue: {},
    transform: toObject,
  },
  agreeTerms: {
    dbField: 'agree_terms',
    defaultValue: false,
    transform: toBoolean,
  },
  subscribeNewsletter: {
    dbField: 'subscribe_newsletter',
    defaultValue: false,
    transform: toBoolean,
  },
}

// ===== Utility Functions =====

/**
 * Transforms form data to database format using the field mappings
 */
export function transformFormToDatabase<T = Partial<FormData>>(
  formData: T,
  mappings: FieldMappings = FIELD_MAPPINGS,
  includeFields?: string[]
): DatabaseRecord {
  const result: DatabaseRecord = {}
  
  for (const [formFieldKey, mapping] of Object.entries(mappings)) {
    // Skip if field is explicitly excluded or not in includeFields list
    if (mapping.include === false) continue
    if (includeFields && !includeFields.includes(formFieldKey)) continue
    
    const formField = mapping.formField || formFieldKey
    const rawValue = (formData as any)[formField]
    
    // Apply transformation or use raw value
    let finalValue = mapping.transform ? mapping.transform(rawValue) : rawValue
    
    // Use default value if final value is null/undefined
    if (finalValue === null || finalValue === undefined) {
      finalValue = mapping.defaultValue
    }
    
    // Set the database field
    ;(result as any)[mapping.dbField] = finalValue
  }
  
  return result
}

/**
 * Creates database record for design data (used in RPC calls)
 */
export function createDesignData(formData: Partial<FormData>): DatabaseRecord {
  // Exclude email from design data as it's passed separately to RPC
  return transformFormToDatabase(formData, FIELD_MAPPINGS, [
    'firstName', 'lastName', 'phone', 'style', 'textColor', 
    'colorPalette', 'colorMode', 'kleurZwartWit', 'icoonJaNee', 'ingredients', 'productColors', 
    'agreeTerms', 'subscribeNewsletter'
  ])
}

/**
 * Creates database record for form submissions (includes email)
 */
export function createSubmissionData(formData: Partial<FormData>): DatabaseRecord {
  return transformFormToDatabase(formData, FIELD_MAPPINGS)
}

/**
 * Validates required fields based on mapping configuration
 */
export function validateRequiredFields(
  formData: Partial<FormData>,
  mappings: FieldMappings = FIELD_MAPPINGS
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = []
  
  for (const [formFieldKey, mapping] of Object.entries(mappings)) {
    if (mapping.required) {
      const formField = mapping.formField || formFieldKey
      const value = (formData as any)[formField]
      
      if (value === null || value === undefined || value === '') {
        missingFields.push(formField)
      }
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  }
}

/**
 * Gets the database field name for a given form field
 */
export function getDbFieldName(formField: string, mappings: FieldMappings = FIELD_MAPPINGS): string | null {
  const mapping = mappings[formField]
  return mapping ? mapping.dbField : null
}

/**
 * Adds a new field mapping (useful for extending the system)
 */
export function addFieldMapping(formField: string, mapping: FieldMapping): void {
  FIELD_MAPPINGS[formField] = mapping
}

/**
 * Removes a field mapping
 */
export function removeFieldMapping(formField: string): void {
  delete FIELD_MAPPINGS[formField]
}