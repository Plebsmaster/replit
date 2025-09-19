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
  modernStyle: z.enum(['modern1', 'modern2', 'modern3', 'modern6'], {
    required_error: 'Kies een moderne stijl',
  }).optional(),
})

// Step 15: Ingredients Selection
export const ingredientsSchema = z.object({
  ingredients: z
    .array(z.string())
    .min(1, 'Selecteer minimaal één ingrediënt')
    .max(10, 'Selecteer maximaal 10 ingrediënten'),
})

// Step 16: Slide16 Color Selection (Kleur/Zwart/Wit)
export const slide16ColorSchema = z.object({
  kleurZwartWit: z.string().min(1, 'Kies een kleur'),
})

// Step 19: Slide19 Icon Selection (Icoon ja/nee)
export const slide19IconSchema = z.object({
  icoonJaNee: z.string().min(1, 'Kies een optie'),
})

// Step 20: Slide20 Icon Choice Selection
export const iconChoiceSchema = z.object({
  iconChoice: z.string().min(1, 'Kies een icoon'),
})

// Step 21: Product Naming Choice Selection
export const productNamingChoiceSchema = z.object({
  productNamingChoice: z.enum(['salonid', 'self'], {
    required_error: 'Kies een optie voor productnamen',
  }),
})

// Step 27: Haarserum Product Naming Selection
export const slide27HaarserumSchema = z.object({
  naamHaarserum: z.string().min(1, 'Selecteer een Haarserum productnaam'),
})

// Step 28: Styling Products Naming Selection (7 products)
export const slide28StylingProductsSchema = z.object({
  naamHaarlak: z.string().min(1, 'Selecteer een Haarspray productnaam'),
  naamMousse: z.string().min(1, 'Selecteer een Mousse productnaam'),
  naamDroogshampoo: z.string().min(1, 'Selecteer een Droogshampoo productnaam'),
  naamGel: z.string().min(1, 'Selecteer een Gel productnaam'),
  naamClayPaste: z.string().min(1, 'Selecteer een Clay Paste productnaam'),
  naamFiberPaste: z.string().min(1, 'Selecteer een Fiber Paste productnaam'),
  naamCreamPaste: z.string().min(1, 'Selecteer een Cream Paste productnaam'),
})

// Step 30: No Yellow Ingredients Selection
export const slide30NoYellowIngredientsSchema = z.object({
  noYellowIngredients: z.object({
    shampoo: z.string().min(1, 'Selecteer een ingrediënt voor No Yellow Shampoo'),
    conditioner: z.string().min(1, 'Selecteer een ingrediënt voor No Yellow Conditioner'),
  }),
  marketingIngredientenNoYellowShampoo: z.string().optional(),
  marketingIngredientenNoYellowConditioner: z.string().optional(),
})

// Step 31: Repair Ingredients Selection
export const slide31RepairIngredientsSchema = z.object({
  repairIngredients: z.object({
    shampoo: z.string().min(1, 'Selecteer een ingrediënt voor Repair Shampoo'),
    conditioner: z.string().min(1, 'Selecteer een ingrediënt voor Repair Conditioner'),
    mask: z.string().min(1, 'Selecteer een ingrediënt voor Repair Mask'),
  }),
  marketingIngredientenRepairShampoo: z.string().optional(),
  marketingIngredientenRepairConditioner: z.string().optional(),
  marketingIngredientenRepairMask: z.string().optional(),
})

// Step 32: Color Ingredients Selection
export const slide32ColorIngredientsSchema = z.object({
  colorIngredients: z.object({
    shampoo: z.string().min(1, 'Selecteer een ingrediënt voor Color Shampoo'),
    conditioner: z.string().min(1, 'Selecteer een ingrediënt voor Color Conditioner'),
    mask: z.string().min(1, 'Selecteer een ingrediënt voor Color Mask'),
  }),
  marketingIngredientenColorShampoo: z.string().optional(),
  marketingIngredientenColorConditioner: z.string().optional(),
  marketingIngredientenColorMask: z.string().optional(),
})

// Step 33: Curly Girl Ingredients Selection
export const slide33CurlyGirlIngredientsSchema = z.object({
  curlyGirlIngredients: z.object({
    shampoo: z.string().min(1, 'Selecteer een ingrediënt voor Curly Girl Shampoo'),
    conditioner: z.string().min(1, 'Selecteer een ingrediënt voor Curly Girl Conditioner'),
    mask: z.string().min(1, 'Selecteer een ingrediënt voor Curly Girl Mask'),
  }),
  marketingIngredientenCurlyGirlShampoo: z.string().optional(),
  marketingIngredientenCurlyGirlConditioner: z.string().optional(),
  marketingIngredientenCurlyGirlMask: z.string().optional(),
})

// Step 17: Terms and Newsletter
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
  modernStyle: z.enum(['modern1', 'modern2', 'modern3', 'modern6']).nullable().default(null),
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
  
  // Slide16 Color Selection
  kleurZwartWit: z.string().default(''),
  
  // Slide19 Icon Selection
  icoonJaNee: z.string().default(''),
  
  // Slide20 Icon Choice Selection
  iconChoice: z.string().default(''),
  
  // Product Naming Choice
  productNamingChoice: z.enum(['salonid', 'self']).nullable().default(null),
  
  // Product Names - Auto-fillable fields
  naamNoYellowShampoo: z.string().default(''),
  naamNoYellowConditioner: z.string().default(''),
  naamRepairShampoo: z.string().default(''),
  naamRepairConditioner: z.string().default(''),
  naamColorShampoo: z.string().default(''),
  naamColorConditioner: z.string().default(''),
  naamHaarlak: z.string().default(''),
  naamMousse: z.string().default(''),
  naamDroogshampoo: z.string().default(''),
  naamRepairMask: z.string().default(''),
  naamColorMask: z.string().default(''),
  naamCurlyGirlShampoo: z.string().default(''),
  naamCurlyGirlConditioner: z.string().default(''),
  naamCurlyGirlMask: z.string().default(''),
  
  // Curly Girl ingredient selections
  curlyGirlIngredients: z.object({
    shampoo: z.string().default('Hyaluronzuur'),
    conditioner: z.string().default('Vitamine E'),
    mask: z.string().default('Vitamine E'),
  }).default({ shampoo: 'Hyaluronzuur', conditioner: 'Vitamine E', mask: 'Vitamine E' }),
  marketingIngredientenCurlyGirlShampoo: z.string().default('Hyaluronzuur'),
  marketingIngredientenCurlyGirlConditioner: z.string().default('Vitamine E'),
  marketingIngredientenCurlyGirlMask: z.string().default('Vitamine E'),
  naamGel: z.string().default(''),
  naamClayPaste: z.string().default(''),
  naamFiberPaste: z.string().default(''),
  naamCreamPaste: z.string().default(''),
  naamMannenShampoo: z.string().default(''),
  naamHaarserum: z.string().default(''),
  
  // Ingredients
  ingredients: z.array(z.string()).default([]),
  
  // No Yellow Ingredients
  noYellowIngredients: z.object({
    shampoo: z.string(),
    conditioner: z.string(),
  }).default({ shampoo: '', conditioner: '' }),
  marketingIngredientenNoYellowShampoo: z.string().default(''),
  marketingIngredientenNoYellowConditioner: z.string().default(''),
  
  // Repair Ingredients
  repairIngredients: z.object({
    shampoo: z.string(),
    conditioner: z.string(),
    mask: z.string(),
  }).default({ shampoo: '', conditioner: '', mask: '' }),
  marketingIngredientenRepairShampoo: z.string().default(''),
  marketingIngredientenRepairConditioner: z.string().default(''),
  marketingIngredientenRepairMask: z.string().default(''),
  
  // Color Ingredients
  colorIngredients: z.object({
    shampoo: z.string(),
    conditioner: z.string(),
    mask: z.string(),
  }).default({ shampoo: '', conditioner: '', mask: '' }),
  marketingIngredientenColorShampoo: z.string().default(''),
  marketingIngredientenColorConditioner: z.string().default(''),
  marketingIngredientenColorMask: z.string().default(''),
  
  // Agreements
  agreeTerms: z.boolean().default(false),
  subscribeNewsletter: z.boolean().default(false),
  
  // Debug-only properties (development mode)
  __debugCurrentStep: z.string().optional(),
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
export type Slide16ColorData = z.infer<typeof slide16ColorSchema>
export type Slide19IconData = z.infer<typeof slide19IconSchema>
export type IconChoiceData = z.infer<typeof iconChoiceSchema>
export type ProductNamingChoiceData = z.infer<typeof productNamingChoiceSchema>
export type Slide27HaarserumData = z.infer<typeof slide27HaarserumSchema>
export type Slide28StylingProductsData = z.infer<typeof slide28StylingProductsSchema>
export type Slide30NoYellowIngredientsData = z.infer<typeof slide30NoYellowIngredientsSchema>
export type Slide31RepairIngredientsData = z.infer<typeof slide31RepairIngredientsSchema>
export type Slide32ColorIngredientsData = z.infer<typeof slide32ColorIngredientsSchema>
export type Slide33CurlyGirlIngredientsData = z.infer<typeof slide33CurlyGirlIngredientsSchema>
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
    modernStyle: null,
    styleVariant: '',
    variantNumber: '',
    textColor: '',
    colorScheme: '',
    finalColorChoice: '',
    colorPalette: '',
    productColors: {},
    colorMode: undefined,
    selectedIcon: false,
    kleurZwartWit: '',
    icoonJaNee: '',
    iconChoice: '',
    productNamingChoice: null,
    naamNoYellowShampoo: '',
    naamNoYellowConditioner: '',
    naamRepairShampoo: '',
    naamRepairConditioner: '',
    naamColorShampoo: '',
    naamColorConditioner: '',
    naamHaarlak: '',
    naamMousse: '',
    naamDroogshampoo: '',
    naamRepairMask: '',
    naamColorMask: '',
    naamCurlyGirlShampoo: '',
    naamCurlyGirlConditioner: '',
    naamCurlyGirlMask: '',
    
    // Curly Girl ingredient selections
    curlyGirlIngredients: { shampoo: 'Hyaluronzuur', conditioner: 'Vitamine E', mask: 'Vitamine E' },
    marketingIngredientenCurlyGirlShampoo: 'Hyaluronzuur',
    marketingIngredientenCurlyGirlConditioner: 'Vitamine E',
    marketingIngredientenCurlyGirlMask: 'Vitamine E',
    naamGel: '',
    naamClayPaste: '',
    naamFiberPaste: '',
    naamCreamPaste: '',
    naamMannenShampoo: '',
    naamHaarserum: '',
    ingredients: [],
    noYellowIngredients: { shampoo: '', conditioner: '' },
    marketingIngredientenNoYellowShampoo: '',
    marketingIngredientenNoYellowConditioner: '',
    repairIngredients: { shampoo: '', conditioner: '', mask: '' },
    marketingIngredientenRepairShampoo: '',
    marketingIngredientenRepairConditioner: '',
    marketingIngredientenRepairMask: '',
    colorIngredients: { shampoo: '', conditioner: '', mask: '' },
    marketingIngredientenColorShampoo: '',
    marketingIngredientenColorConditioner: '',
    marketingIngredientenColorMask: '',
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
  slide16Color: slide16ColorSchema,
  slide19Icon: slide19IconSchema,
  iconChoice: iconChoiceSchema,
  productNamingChoice: productNamingChoiceSchema,
  slide27Haarserum: slide27HaarserumSchema,
  slide28StylingProducts: slide28StylingProductsSchema,
  slide30NoYellowIngredients: slide30NoYellowIngredientsSchema,
  slide31RepairIngredients: slide31RepairIngredientsSchema,
  slide32ColorIngredients: slide32ColorIngredientsSchema,
  slide33CurlyGirlIngredients: slide33CurlyGirlIngredientsSchema,
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