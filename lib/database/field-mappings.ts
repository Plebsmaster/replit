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
  'Met/zonder claim'?: string | null
  ingredients?: string[]
  product_colors?: Record<string, any>
  agree_terms?: boolean
  subscribe_newsletter?: boolean
  product_naming_choice?: string | null
  'Naam No Yellow Shampoo'?: string | null
  'Naam No Yellow Conditioner'?: string | null
  'Naam Repair Shampoo'?: string | null
  'Naam Repair Conditioner'?: string | null
  'Naam Color Shampoo'?: string | null
  'Naam Color Conditioner'?: string | null
  'Naam Haarlak'?: string | null
  'Naam Mousse'?: string | null
  'Naam Droogshampoo'?: string | null
  'Naam Repair Mask'?: string | null
  'Naam Color Mask'?: string | null
  'Naam Curly Girl Shampoo'?: string | null
  'Naam Curly Girl Conditioner'?: string | null
  'Naam Curly Girl Mask'?: string | null
  'Naam Gel'?: string | null
  'Naam Clay Paste'?: string | null
  'Naam Fiber Paste'?: string | null
  'Naam Cream Paste'?: string | null
  'Naam Mannen Shampoo'?: string | null
  'Naam Haarserum'?: string | null
  claim_choice?: string | null
  'Standaard Claim No Yellow Shampoo'?: string | null
  'Standaard Claim No Yellow Conditioner'?: string | null
  'Standaard Claim Repair Shampoo'?: string | null
  'Standaard Claim Repair Conditioner'?: string | null
  'Standaard Claim Repair Mask'?: string | null
  'Standaard Claim Color Shampoo'?: string | null
  'Standaard Claim Color Conditioner'?: string | null
  'Standaard Claim Color Mask'?: string | null
  'Standaard Claim Curly Girl Shampoo'?: string | null
  'Standaard Claim Curly Girl Conditioner'?: string | null
  'Standaard Claim Curly Girl Mask'?: string | null
  'Standaard Claim Mannen Shampoo'?: string | null
  'Standaard Claim Haarserum'?: string | null
  'Standaard Claim Haarlak'?: string | null
  'Standaard Claim Mousse'?: string | null
  'Standaard Claim Droog Shampoo'?: string | null
  no_yellow_claims?: Record<string, any>
  'Quote'?: string | null
  'Logo of merknaam'?: string | null
  'Merknaam'?: string | null
  'Naam logo'?: string | null
  'AfbeeldingsURL'?: string | null
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
  iconChoice: {
    dbField: 'Icoon',
    defaultValue: null,
    transform: toNullableString,
  },
  metZonderClaim: {
    dbField: 'Met/zonder claim',
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
  productNamingChoice: {
    dbField: 'product_naming_choice',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Country Selection (Slide 46)
  verkoopland: {
    dbField: 'Verkoopland',
    defaultValue: 'NL',
    transform: toNullableString,
  },
  
  // Quote/Slogan Input (Slide 49)
  quote: {
    dbField: 'Quote',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Logo/Merknaam Choice (Slide 51)
  logoOfMerknaam: {
    dbField: 'Logo of merknaam',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Merknaam Input (Slide 52)
  merknaam: {
    dbField: 'Merknaam',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Logo Upload (Slide 53)
  naamLogo: {
    dbField: 'Naam logo',
    defaultValue: null,
    transform: toNullableString,
  },
  
  afbeeldingsURL: {
    dbField: 'AfbeeldingsURL',
    defaultValue: null,
    transform: toNullableString,
  },
  
  naamNoYellowShampoo: {
    dbField: 'Naam No Yellow Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  naamNoYellowConditioner: {
    dbField: 'Naam No Yellow Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  naamRepairShampoo: {
    dbField: 'Naam Repair Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  naamRepairConditioner: {
    dbField: 'Naam Repair Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  naamColorShampoo: {
    dbField: 'Naam Color Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  naamColorConditioner: {
    dbField: 'Naam Color Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  naamHaarlak: {
    dbField: 'Naam Haarlak',
    defaultValue: null,
    transform: toNullableString,
  },
  naamMousse: {
    dbField: 'Naam Mousse',
    defaultValue: null,
    transform: toNullableString,
  },
  naamDroogshampoo: {
    dbField: 'Naam Droogshampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  naamRepairMask: {
    dbField: 'Naam Repair Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  naamColorMask: {
    dbField: 'Naam Color Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  naamCurlyGirlShampoo: {
    dbField: 'Naam Curly Girl Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  naamCurlyGirlConditioner: {
    dbField: 'Naam Curly Girl Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  naamCurlyGirlMask: {
    dbField: 'Naam Curly Girl Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  naamGel: {
    dbField: 'Naam Gel',
    defaultValue: null,
    transform: toNullableString,
  },
  naamClayPaste: {
    dbField: 'Naam Clay Paste',
    defaultValue: null,
    transform: toNullableString,
  },
  naamFiberPaste: {
    dbField: 'Naam Fiber Paste',
    defaultValue: null,
    transform: toNullableString,
  },
  naamCreamPaste: {
    dbField: 'Naam Cream Paste',
    defaultValue: null,
    transform: toNullableString,
  },
  naamMannenShampoo: {
    dbField: 'Naam Mannen Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  naamHaarserum: {
    dbField: 'Naam Haarserum',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Claim Choice (Step 38)
  claimChoice: {
    dbField: 'claim_choice',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // 16 Standard Claim fields (auto-filled when SalonID is chosen)
  standaardClaimNoYellowShampoo: {
    dbField: 'Standaard Claim No Yellow Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimNoYellowConditioner: {
    dbField: 'Standaard Claim No Yellow Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimRepairShampoo: {
    dbField: 'Standaard Claim Repair Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimRepairConditioner: {
    dbField: 'Standaard Claim Repair Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimRepairMask: {
    dbField: 'Standaard Claim Repair Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimColorShampoo: {
    dbField: 'Standaard Claim Color Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimColorConditioner: {
    dbField: 'Standaard Claim Color Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimColorMask: {
    dbField: 'Standaard Claim Color Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimCurlyGirlShampoo: {
    dbField: 'Standaard Claim Curly Girl Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimCurlyGirlConditioner: {
    dbField: 'Standaard Claim Curly Girl Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimCurlyGirlMask: {
    dbField: 'Standaard Claim Curly Girl Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimMannenShampoo: {
    dbField: 'Standaard Claim Mannen Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimHaarserum: {
    dbField: 'Standaard Claim Haarserum',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimHaarlak: {
    dbField: 'Standaard Claim Haarlak',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimMousse: {
    dbField: 'Standaard Claim Mousse',
    defaultValue: null,
    transform: toNullableString,
  },
  standaardClaimDroogShampoo: {
    dbField: 'Standaard Claim Droog Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Styling Products Claims Selection (Slide 45 - Self-determined claims)
  stylingClaims: {
    dbField: 'styling_claims',
    defaultValue: { haarlak: null, mousse: null, droogshampoo: null },
    transform: toObject,
  },
  
  // Custom Claims Selection (Slide 39 - Self-determined claims)
  // Note: When user selects custom claims, these will override the auto-filled standaard claim fields
  noYellowClaims: {
    dbField: 'no_yellow_claims',
    defaultValue: { shampoo: null, conditioner: null },
    transform: toObject,
  },
  // No Yellow Ingredient Selections
  noYellowIngredients: {
    dbField: 'no_yellow_ingredients',
    defaultValue: { shampoo: null, conditioner: null },
    transform: toObject,
  },
  marketingIngredientenNoYellowShampoo: {
    dbField: 'Marketing ingredienten No Yellow Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenNoYellowConditioner: {
    dbField: 'Marketing ingredienten No Yellow Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Repair Ingredients
  repairIngredients: {
    dbField: 'repair_ingredients',
    defaultValue: { shampoo: null, conditioner: null, mask: null },
    transform: toObject,
  },
  marketingIngredientenRepairShampoo: {
    dbField: 'Marketing ingredienten Repair Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenRepairConditioner: {
    dbField: 'Marketing ingredienten Repair Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenRepairMask: {
    dbField: 'Marketing ingredienten Repair Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Color Ingredients
  colorIngredients: {
    dbField: 'color_ingredients',
    defaultValue: { shampoo: null, conditioner: null, mask: null },
    transform: toObject,
  },

  // Color Claims Selection (Custom claims for self-determined users)
  colorClaims: {
    dbField: 'color_claims',
    defaultValue: { shampoo: null, conditioner: null, mask: null },
    transform: toObject,
  },

  // Curly Girl Claims Selection (Custom claims for self-determined users)
  curlyGirlClaims: {
    dbField: 'curly_girl_claims',
    defaultValue: { shampoo: null, conditioner: null, mask: null },
    transform: toObject,
  },

  // Mannen Shampoo Claims Selection (Custom claims for self-determined users)
  mannenClaims: {
    dbField: 'mannen_claims',
    defaultValue: { shampoo: null },
    transform: toObject,
  },

  // Hair Serum Claims Selection (Custom claims for self-determined users)
  haarseurumClaims: {
    dbField: 'haarserum_claims',
    defaultValue: { serum: null },
    transform: toObject,
  },
  marketingIngredientenColorShampoo: {
    dbField: 'Marketing ingredienten Color Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenColorConditioner: {
    dbField: 'Marketing ingredienten Color Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenColorMask: {
    dbField: 'Marketing ingredienten Color Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Curly Girl Ingredients
  curlyGirlIngredients: {
    dbField: 'curly_girl_ingredients',
    defaultValue: { shampoo: null, conditioner: null, mask: null },
    transform: toObject,
  },
  marketingIngredientenCurlyGirlShampoo: {
    dbField: 'Marketing ingredienten Curly Girl Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenCurlyGirlConditioner: {
    dbField: 'Marketing ingredienten Curly Girl Conditioner',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenCurlyGirlMask: {
    dbField: 'Marketing ingredienten Curly Girl Mask',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Mannen Shampoo Ingredients
  marketingIngredientenMannenShampoo: {
    dbField: 'Marketing ingredienten Mannen Shampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  haarserumIngredient: {
    dbField: 'Haarserum ingrediënt',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenHaarserum: {
    dbField: 'Marketing ingredienten Haarserum',
    defaultValue: null,
    transform: toNullableString,
  },
  
  // Styling Products Ingredients
  stylingProductsIngredients: {
    dbField: 'styling_products_ingredients',
    defaultValue: { haarlak: null, mousse: null, droogshampoo: null, gel: null, clayPaste: null, fiberPaste: null },
    transform: toObject,
  },
  marketingIngredientenHaarlak: {
    dbField: 'Marketing ingredienten Haarlak',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenMousse: {
    dbField: 'Marketing ingredienten Mousse',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenDroogshampoo: {
    dbField: 'Marketing ingredienten Droogshampoo',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenGel: {
    dbField: 'Marketing ingredienten Gel',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenClayPaste: {
    dbField: 'Marketing ingredienten Clay Paste',
    defaultValue: null,
    transform: toNullableString,
  },
  marketingIngredientenFiberPaste: {
    dbField: 'Marketing ingredienten Fiber Paste',
    defaultValue: null,
    transform: toNullableString,
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
    'colorPalette', 'colorMode', 'kleurZwartWit', 'icoonJaNee', 'iconChoice', 'ingredients', 'productColors', 
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