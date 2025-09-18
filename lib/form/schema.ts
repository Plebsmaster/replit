import { z } from 'zod'

// ===== Base Field Schemas =====
// These are reusable field schemas used across different steps

const emailSchema = z
  .string()
  .email('Voer een geldig e-mailadres in')
  .min(1, 'E-mailadres is verplicht')

const phoneSchema = z
  .string()
  .regex(/^[\d\s\-+()]*$/, 'Voer een geldig telefoonnummer in')
  .optional()
  .refine(
    (val) => !val || val.replace(/\D/g, '').length >= 8,
    'Telefoonnummer moet minimaal 8 cijfers bevatten'
  )

const nameSchema = z
  .string()
  .min(2, 'Moet minimaal 2 karakters bevatten')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Naam mag alleen letters bevatten')

// ===== Step-specific Schemas =====
// These schemas validate individual form steps

// Step 1: Welcome (no validation needed)
export const welcomeSchema = z.object({})

// Step 2: Email
export const emailStepSchema = z.object({
  email: emailSchema,
})

// Step 3: Name and Phone
export const namePhoneSchema = z.object({
  firstName: nameSchema.min(1, 'Voornaam is verplicht'),
  lastName: nameSchema.min(1, 'Achternaam is verplicht'),
  phone: phoneSchema,
})

// Step 4: OTP Verification (handled separately through state machine, no form data required)
export const otpSchema = z.object({})

// Step 5: Style Selection
export const styleSelectionSchema = z.object({
  style: z.enum(['elegant', 'modern'], {
    required_error: 'Kies een stijl',
  }),
})

// Step 6: Elegant Style Selection
export const elegantStyleSchema = z.object({
  elegantStyle: z.string().min(1, 'Kies een elegante stijl'),
})

// Step 7-8: Style Variant Selection
export const styleVariantSchema = z.object({
  styleVariant: z.string().min(1, 'Kies een variant'),
  variantNumber: z.string().optional(),
})

// Step 9: Color Scheme Selection
export const colorSchemeSchema = z.object({
  colorScheme: z.string().min(1, 'Kies een kleurschema'),
})

// Step 10: Final Color Choice
export const finalColorSchema = z.object({
  finalColorChoice: z.string().min(1, 'Kies een kleur'),
})

// Step 11: Color Palette and Product Colors
export const colorPaletteSchema = z.object({
  colorPalette: z.string().min(1, 'Kies een kleurenpalet'),
  productColors: z.record(z.string()).default({}),
  colorMode: z.enum(['variation', 'uniform']).optional(),
})

// Step 12: Text Color Selection
export const textColorSchema = z.object({
  textColor: z.enum(['black', 'white', ''], {
    errorMap: () => ({ message: 'Kies een tekstkleur' })
  }),
})

// Step 13: Icon Selection
export const iconSelectionSchema = z.object({
  selectedIcon: z.boolean().optional(),
})

// Step 14: Modern Style Selection
export const modernStyleSchema = z.object({
  modernStyle: z.string().optional(),
})

// Step 15: Ingredients Selection
export const ingredientsSchema = z.object({
  ingredients: z
    .array(z.string())
    .min(1, 'Selecteer minimaal één ingrediënt')
    .max(10, 'Selecteer maximaal 10 ingrediënten'),
})

// Step 16: Terms and Newsletter
export const agreementsSchema = z.object({
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'U moet akkoord gaan met de voorwaarden',
  }),
  subscribeNewsletter: z.boolean().default(false),
})

// ===== Complete Form Schema =====
// This is the comprehensive schema with all fields
export const FormDataSchema = z.object({
  // Contact Information - with defaults
  email: z.string().email('Voer een geldig e-mailadres in').default(''),
  firstName: z.string().default(''),
  lastName: z.string().default(''),
  phone: z.string().default(''),
  
  // User Type and Status
  isExistingUser: z.boolean().optional().default(false),
  userId: z.string().optional().default(''),
  
  // Style Selection
  style: z.enum(['elegant', 'modern']).nullable().default(null),
  elegantStyle: z.string().default(''),
  modernStyle: z.string().optional().default(''),
  styleVariant: z.string().default(''),
  variantNumber: z.string().default(''),
  
  // Color Configuration
  textColor: z.enum(['black', 'white', '']).default(''),
  colorScheme: z.string().default(''),
  finalColorChoice: z.string().optional().default(''),
  colorPalette: z.string().default(''),
  productColors: z.record(z.string()).default({}),
  colorMode: z.enum(['variation', 'uniform']).optional(),
  
  // Icon Selection
  selectedIcon: z.boolean().optional().default(false),
  
  // Ingredients
  ingredients: z.array(z.string()).default([]),
  
  // Agreements
  agreeTerms: z.boolean().default(false),
  subscribeNewsletter: z.boolean().default(false),
})

// ===== Type Exports =====
// Export the inferred TypeScript type from the schema
export type FormData = z.infer<typeof FormDataSchema>

// Export partial schemas for step validation
export type EmailStepData = z.infer<typeof emailStepSchema>
export type NamePhoneData = z.infer<typeof namePhoneSchema>
export type StyleSelectionData = z.infer<typeof styleSelectionSchema>
export type ElegantStyleData = z.infer<typeof elegantStyleSchema>
export type StyleVariantData = z.infer<typeof styleVariantSchema>
export type ColorSchemeData = z.infer<typeof colorSchemeSchema>
export type FinalColorData = z.infer<typeof finalColorSchema>
export type ColorPaletteData = z.infer<typeof colorPaletteSchema>
export type TextColorData = z.infer<typeof textColorSchema>
export type IconSelectionData = z.infer<typeof iconSelectionSchema>
export type ModernStyleData = z.infer<typeof modernStyleSchema>
export type IngredientsData = z.infer<typeof ingredientsSchema>
export type AgreementsData = z.infer<typeof agreementsSchema>

// ===== Validation Helpers =====
// Helper functions to validate partial form data

export const validateStep = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: boolean; errors?: z.ZodError; data?: T } => {
  const result = schema.safeParse(data)
  if (!result.success) {
    return { success: false, errors: result.error }
  }
  return { success: true, data: result.data }
}

export const getDefaultFormData = (): FormData => {
  return {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    isExistingUser: false,
    userId: '',
    style: null,
    elegantStyle: '',
    modernStyle: '',
    styleVariant: '',
    variantNumber: '',
    textColor: '',
    colorScheme: '',
    finalColorChoice: '',
    colorPalette: '',
    productColors: {},
    colorMode: undefined,
    selectedIcon: false,
    ingredients: [],
    agreeTerms: false,
    subscribeNewsletter: false,
  }
}

// ===== Step Validation Map =====
// Maps step IDs to their corresponding validation schemas
export const stepSchemas = {
  welcome: welcomeSchema,
  email: emailStepSchema,
  namePhone: namePhoneSchema,
  otp: otpSchema,
  styleSelection: styleSelectionSchema,
  elegantStyle: elegantStyleSchema,
  styleVariant: styleVariantSchema,
  colorScheme: colorSchemeSchema,
  finalColor: finalColorSchema,
  colorPalette: colorPaletteSchema,
  textColor: textColorSchema,
  iconSelection: iconSelectionSchema,
  modernStyle: modernStyleSchema,
  ingredients: ingredientsSchema,
  agreements: agreementsSchema,
} as const

export type StepId = keyof typeof stepSchemas

// Helper to check if a step is complete
export const isStepComplete = (
  stepId: StepId,
  formData: Partial<FormData>
): boolean => {
  const schema = stepSchemas[stepId]
  const result = schema.safeParse(formData)
  return result.success
}