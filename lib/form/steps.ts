// No component imports needed - all components loaded via lazy-step-loader
import { z } from 'zod'
import {
  welcomeSchema,
  emailStepSchema,
  namePhoneSchema,
  otpSchema,
  styleSelectionSchema,
  elegantStyleSchema,
  styleVariantSchema,
  colorSchemeSchema,
  finalColorSchema,
  colorPaletteSchema,
  textColorSchema,
  iconSelectionSchema,
  modernStyleSchema,
  slide16ColorSchema,
  slide19IconSchema,
  iconChoiceSchema,
  productNamingChoiceSchema,
  slide27HaarserumSchema,
  slide28StylingProductsSchema,
  slide30NoYellowIngredientsSchema,
  slide31RepairIngredientsSchema,
  slide32ColorIngredientsSchema,
  slide33CurlyGirlIngredientsSchema,
  slide34MannenShampooIngredientsSchema,
  slide35HaarserumIngredientsSchema,
  slide36StylingProductsIngredientsSchema,
  slide37MetZonderClaimSchema,
  claimChoiceSchema,
  slide39NoYellowClaimsSchema,
  slide40RepairClaimsSchema,
  slide41ColorClaimsSchema,
  slide42CurlyGirlClaimsSchema,
  slide43MannenClaimsSchema,
  slide44HaarseurumClaimsSchema,
  slide45StylingClaimsSchema,
  slide46CountrySelectionSchema,
  slide49QuoteSchema,
  slide51LogoMerknaamSchema,
  ingredientsSchema,
  agreementsSchema,
  FormData,
} from './schema'

// ===== Types =====
// Shared base interface that all step components must accept
export interface StepProps {
  onNext: () => void
  onBack: () => void
  goToStep: (stepId: string) => void
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onSubmit?: () => Promise<void>
  
  // Optional props for specific steps
  email?: string
  onVerified?: () => void
  verifyOtp?: () => void
  sendOtp?: (email: string) => void
  selectedStyle?: string | null
  onSelectionChange?: (style: string | null) => void
}

// Legacy interface for backward compatibility
export interface WizardStepProps extends StepProps {
}

// Legacy interface for backward compatibility
export interface StepComponentProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
  onSubmit?: () => Promise<void>
}

export interface StepDefinition {
  id: string
  key: string
  title: string
  // Remove Component property - will be loaded via lazy-step-loader
  schema?: z.ZodSchema<Partial<FormData>>
  componentFile?: string  // TSX filename for debug navigation
  guards?: {
    canEnter?: (formData: Partial<FormData>) => boolean
    canLeave?: (formData: Partial<FormData>) => boolean
  }
  onEnter?: (formData: Partial<FormData>) => void
  onLeave?: (formData: Partial<FormData>) => void
  skipIf?: (formData: Partial<FormData>) => boolean
  nextStep?: (formData: Partial<FormData>) => string | null
  // Navigation button visibility controls
  showGlobalNext?: boolean  // Show "Doorgaan" button (default: true for manual steps)
  showGlobalPrev?: boolean  // Show "Terug" button (default: true)
}

// ===== Step Components Removed =====
// Components are now loaded exclusively via lazy-step-loader.ts
// This ensures true code-splitting and reduces initial bundle size

// ===== Step Registry =====
export const stepRegistry: Map<string, StepDefinition> = new Map([
  // Welcome Flow
  ['welcome', {
    id: 'welcome',
    key: 'welcome',
    title: 'Welkom',
    schema: welcomeSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'style-selection',
  }],
  
  // Authentication Flow
  ['email', {
    id: 'email',
    key: 'email',
    title: 'E-mail',
    schema: emailStepSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // If existing user, skip name-phone and go directly to OTP
      if (formData.isExistingUser) {
        return 'otp-verification'
      }
      // If new user, proceed to name-phone collection
      return 'name-phone'
    },
  }],
  
  ['name-phone', {
    id: 'name-phone',
    key: 'namePhone',
    title: 'Gegevens',
    schema: namePhoneSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // For new users, go to welcome after collecting name/phone
      return 'welcome'
    },
  }],
  
  ['otp-verification', {
    id: 'otp-verification',
    key: 'otp',
    title: 'Verificatie',
    schema: otpSchema,
    showGlobalNext: false, // Has own button
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.isExistingUser === true,
    },
    skipIf: (formData: Partial<FormData>) => formData.isExistingUser !== true,
    nextStep: (formData: Partial<FormData>): string => {
      // Both existing and new users go to welcome after OTP verification
      return 'welcome'
    },
  }],
  
  // Style Selection Flow
  ['style-selection', {
    id: 'style-selection',
    key: 'styleSelection',
    title: 'Stijl Selectie',
    schema: styleSelectionSchema,
    componentFile: 'Slide2.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string | null => {
      if (formData.style === 'elegant') return 'elegant-styles'
      if (formData.style === 'modern') return 'modern-styles'
      return null
    },
  }],
  
  // Elegant Style Flow
  ['elegant-styles', {
    id: 'elegant-styles',
    key: 'elegantStyle',
    title: 'Elegante Stijlen',
    schema: elegantStyleSchema,
    componentFile: 'Slide3.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'elegant',
    },
    nextStep: (formData: Partial<FormData>): string => {
      // Based on selection, go to appropriate variant
      if (formData.elegantStyle === 'elegant1') return 'elegant-variant1'
      if (formData.elegantStyle === 'elegant2') return 'elegant-variant2'
      return 'elegant-variant1' // default
    },
  }],
  
  ['elegant-variant1', {
    id: 'elegant-variant1',
    key: 'styleVariant',
    title: 'Elegante Variant 1',
    schema: styleVariantSchema,
    componentFile: 'Slide4.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'elegant',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['elegant-variant2', {
    id: 'elegant-variant2',
    key: 'styleVariant',
    title: 'Elegante Variant 2',
    schema: styleVariantSchema,
    componentFile: 'Slide5.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'elegant',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  // Modern Style Flow
  ['modern-styles', {
    id: 'modern-styles',
    key: 'modernStyle',
    title: 'Moderne Stijlen',
    schema: modernStyleSchema,
    componentFile: 'Slide11.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => {
      // Based on selection, go to appropriate modern variant
      if (formData.modernStyle === 'modern1') return 'modern1-variant'
      if (formData.modernStyle === 'modern2') return 'modern2-variant'
      if (formData.modernStyle === 'modern3') return 'modern3-variant'
      if (formData.modernStyle === 'modern6') return 'modern6-variant'
      return 'modern1-variant' // default
    },
  }],
  
  ['modern1-variant', {
    id: 'modern1-variant',
    key: 'styleVariant',
    title: 'Modern 1 Variant',
    schema: styleVariantSchema,
    componentFile: 'Slide12.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['modern2-variant', {
    id: 'modern2-variant',
    key: 'styleVariant',
    title: 'Modern 2 Variant',
    schema: styleVariantSchema,
    componentFile: 'Slide13.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  ['modern3-variant', {
    id: 'modern3-variant',
    key: 'styleVariant',
    title: 'Modern 3 Variant',
    schema: styleVariantSchema,
    componentFile: 'Slide14.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  ['modern6-variant', {
    id: 'modern6-variant',
    key: 'styleVariant',
    title: 'Modern 6 Variant',
    schema: styleVariantSchema,
    componentFile: 'Slide15.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    guards: {
      canEnter: (formData: Partial<FormData>) => formData.style === 'modern',
    },
    nextStep: (formData: Partial<FormData>): string => 'color-scheme',
  }],
  
  // Color Configuration Flow
  ['color-scheme', {
    id: 'color-scheme',
    key: 'colorScheme',
    title: 'Kleur Selectie',
    schema: colorSchemeSchema,
    componentFile: 'Slide6.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'final-color',
  }],
  
  ['final-color', {
    id: 'final-color',
    key: 'finalColor',
    title: 'Finale Kleur',
    schema: finalColorSchema,
    componentFile: 'Slide7.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'color-palette',
  }],
  
  ['color-palette', {
    id: 'color-palette',
    key: 'colorPalette',
    title: 'Kleur Palet',
    schema: colorPaletteSchema,
    componentFile: 'Slide8.tsx',
    showGlobalNext: true,  // Manual continue - SPECIAL CASE: Slide8 requires manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'icon-choice',
  }],
  
  // Icon Flow
  ['icon-choice', {
    id: 'icon-choice',
    key: 'iconChoice',
    title: 'Icoon Keuze',
    componentFile: 'Slide9.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'icon-selection',
  }],
  
  ['icon-selection', {
    id: 'icon-selection',
    key: 'iconSelection',
    title: 'Icoon Selectie',
    schema: iconSelectionSchema,
    componentFile: 'Slide10.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'ingredients',
  }],
  
  // Additional Slides
  ['slide16', {
    id: 'slide16',
    key: 'slide16Color',
    title: 'Kleur Selectie',
    schema: slide16ColorSchema,
    componentFile: 'Slide16.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      if (formData.kleurZwartWit === 'Zwart') {
        return 'slide19'
      } else if (formData.kleurZwartWit === 'Kleur') {
        return 'slide18'
      }
      return 'ingredients' // fallback
    },
  }],

  ['slide17', {
    id: 'slide17',
    key: 'slide17Color',
    title: 'Kleurselectie',
    schema: slide16ColorSchema, // Reuse same schema as it uses kleurZwartWit field
    componentFile: 'Slide17.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      if (formData.kleurZwartWit === 'Zwart') {
        return 'slide19'
      } else if (formData.kleurZwartWit === 'Kleur') {
        return 'slide18'
      } else if (formData.kleurZwartWit === 'Wit') {
        return 'slide19'
      }
      return 'ingredients' // fallback
    },
  }],

  ['slide18', {
    id: 'slide18',
    key: 'colorPalette',
    title: 'Kleur Palet (Slide 18)',
    schema: colorPaletteSchema,
    componentFile: 'Slide18.tsx',
    showGlobalNext: true,  // Manual continue - SPECIAL CASE: Slide18 requires manual continue like Slide8
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide19',
  }],

  ['slide19', {
    id: 'slide19',
    key: 'slide19Icon',
    title: 'Icoon Keuze (Slide 19)',
    schema: slide19IconSchema,
    componentFile: 'Slide19.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Conditional navigation based on icon choice
      if (formData.icoonJaNee === 'met-icoon') {
        return 'slide20'
      } else if (formData.icoonJaNee === 'zonder-icoon') {
        return 'slide21'
      }
      return 'ingredients' // Default fallback
    },
  }],

  ['slide20', {
    id: 'slide20',
    key: 'iconChoice',
    title: 'Icoon Selectie (Slide 20)',
    schema: iconChoiceSchema,
    componentFile: 'Slide20.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide21',
  }],

  ['slide21', {
    id: 'slide21',
    key: 'productNamingChoice',
    title: 'Product Namen Selectie',
    schema: productNamingChoiceSchema,
    componentFile: 'Slide21.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Conditional navigation based on product naming choice
      if (formData.productNamingChoice === 'salonid') {
        return 'slide29'
      } else if (formData.productNamingChoice === 'self') {
        return 'slide22'
      }
      return 'ingredients' // Default fallback
    },
  }],

  // Custom naming flow (when user chooses "Ik bepaal zelf")
  ['slide22', {
    id: 'slide22',
    key: 'slide22',
    title: 'No Yellow Product Namen',
    componentFile: 'Slide22.tsx',
    showGlobalNext: true, // Manual continue - user needs to select custom names
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide23',
  }],

  // Continue custom naming flow - Repair products
  ['slide23', {
    id: 'slide23',
    key: 'slide23',
    title: 'Repair Product Namen',
    componentFile: 'Slide23.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide24',
  }],

  // Color product naming
  ['slide24', {
    id: 'slide24',
    key: 'slide24',
    title: 'Color - Kies de benaming',
    componentFile: 'Slide24.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide25',
  }],

  // Curly Girl products naming
  ['slide25', {
    id: 'slide25',
    key: 'slide25',
    title: 'Curly Girl Product Namen',
    componentFile: 'Slide25.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide26',
  }],

  // Mannen Shampoo product naming
  ['slide26', {
    id: 'slide26',
    key: 'slide26',
    title: 'Mannen Shampoo - Kies de benaming',
    componentFile: 'Slide26.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide27',
  }],

  // Haarserum product naming
  ['slide27', {
    id: 'slide27',
    key: 'slide27Haarserum',
    title: 'Haarserum - Kies de benaming',
    schema: slide27HaarserumSchema,
    componentFile: 'Slide27.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide28',
  }],

  // Styling Products naming (7 products)
  ['slide28', {
    id: 'slide28',
    key: 'slide28StylingProducts',
    title: 'Styling Producten - Kies de benaming',
    schema: slide28StylingProductsSchema,
    componentFile: 'Slide28.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'slide29',
  }],

  // SalonID naming flow (when user chooses "Keuze door SalonID")
  ['slide29', {
    id: 'slide29',
    key: 'slide29',
    title: 'SalonID Product Namen',
    componentFile: 'Slide29.tsx',
    showGlobalNext: false, // Auto-continue - names are pre-filled
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => 'ingredients',
  }],

  // Final Steps
  ['ingredients', {
    id: 'ingredients',
    key: 'ingredients',
    title: 'No Yellow - Ingrediënten',
    schema: slide30NoYellowIngredientsSchema,
    componentFile: 'Slide30.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide31',
  }],
  
  ['slide31', {
    id: 'slide31',
    key: 'slide31RepairIngredients',
    title: 'Repair - Ingrediënten',
    schema: slide31RepairIngredientsSchema,
    componentFile: 'Slide31.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide32',
  }],
  
  ['slide32', {
    id: 'slide32',
    key: 'slide32ColorIngredients',
    title: 'Color - Ingrediënten',
    schema: slide32ColorIngredientsSchema,
    componentFile: 'Slide32.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide33',
  }],
  
  ['slide33', {
    id: 'slide33',
    key: 'slide33CurlyGirlIngredients',
    title: 'Curly Girl - Kies de ingrediënten',
    schema: slide33CurlyGirlIngredientsSchema,
    componentFile: 'Slide33.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide34',
  }],
  
  ['slide34', {
    id: 'slide34',
    key: 'slide34MannenShampooIngredients',
    title: 'Mannen - Kies de ingrediënten',
    schema: slide34MannenShampooIngredientsSchema,
    componentFile: 'Slide34.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide35',
  }],
  
  ['slide35', {
    id: 'slide35',
    key: 'slide35HaarserumIngredients',
    title: 'Haarserum - Kies de ingrediënten',
    schema: slide35HaarserumIngredientsSchema,
    componentFile: 'Slide35.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide36',
  }],
  
  ['slide36', {
    id: 'slide36',
    key: 'slide36StylingProductsIngredients',
    title: 'Styling Products - Kies de ingrediënten',
    schema: slide36StylingProductsIngredientsSchema,
    componentFile: 'Slide36.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide37',
  }],
  
  ['slide37', {
    id: 'slide37',
    key: 'slide37MetZonderClaim',
    title: 'Met/Zonder Claim Keuze',
    schema: slide37MetZonderClaimSchema,
    componentFile: 'Slide37.tsx',
    showGlobalNext: false, // Auto-continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Conditional navigation based on claim choice
      if (formData.metZonderClaim === 'met-claim') {
        return 'slide38'
      } else if (formData.metZonderClaim === 'zonder-claim') {
        return 'slide46'
      }
      return 'dashboard-login' // Default fallback
    },
  }],
  
  ['slide38', {
    id: 'slide38',
    key: 'slide38ClaimChoice',
    title: 'Claim Keuze',
    schema: claimChoiceSchema,
    componentFile: 'Slide38.tsx',
    showGlobalNext: false, // Auto-advance on selection
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Navigation based on claim choice
      if (formData.claimChoice === 'SalonID') {
        return 'slide46'
      } else if (formData.claimChoice === 'self') {
        return 'slide39'
      }
      return 'dashboard-login' // Default fallback
    },
  }],
  
  ['slide39', {
    id: 'slide39',
    key: 'slide39NoYellowClaims',
    title: 'No Yellow Claims Selectie',
    schema: slide39NoYellowClaimsSchema,
    componentFile: 'Slide39.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide40',
  }],
  
  ['slide40', {
    id: 'slide40',
    key: 'slide40RepairClaims',
    title: 'Repair Claims Selectie',
    schema: slide40RepairClaimsSchema,
    componentFile: 'Slide40.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide41',
  }],
  
  ['slide41', {
    id: 'slide41',
    key: 'slide41ColorClaims',
    title: 'Color - Kies de claims',
    schema: slide41ColorClaimsSchema,
    componentFile: 'Slide41.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide42',
  }],

  ['slide42', {
    id: 'slide42',
    key: 'slide42CurlyGirlClaims',
    title: 'Curly Girl - Kies de claims',
    schema: slide42CurlyGirlClaimsSchema,
    componentFile: 'Slide42.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide43',
  }],

  ['slide43', {
    id: 'slide43',
    key: 'slide43MannenClaims',
    title: 'Mannen - Kies de claims',
    schema: slide43MannenClaimsSchema,
    componentFile: 'Slide43.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide44',
  }],

  ['slide44', {
    id: 'slide44',
    key: 'slide44HaarseurumClaims',
    title: 'Haarserum - Kies de claims',
    schema: slide44HaarseurumClaimsSchema,
    componentFile: 'Slide44.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide45',
  }],

  ['slide45', {
    id: 'slide45',
    key: 'slide45',
    title: 'Styling - Kies de claims',
    schema: slide45StylingClaimsSchema,
    componentFile: 'Slide45.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'slide46',
  }],
  
  ['slide46', {
    id: 'slide46',
    key: 'slide46CountrySelection',
    title: 'Land Selectie',
    schema: slide46CountrySelectionSchema,
    componentFile: 'Slide46.tsx',
    showGlobalNext: false, // Auto-progress after selection
    showGlobalPrev: true,
    nextStep: (): string => 'slide48',
  }],
  
  ['slide48', {
    id: 'slide48',
    key: 'slide48',
    title: 'Slogan Keuze',
    componentFile: 'Slide48.tsx',
    showGlobalNext: false, // Auto-continue after selection
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Direct navigation - no database storage needed
      // Navigation logic handled in component via goToStep()
      return 'dashboard-login' // Fallback (should not be reached)
    },
  }],
  
  ['slide49', {
    id: 'slide49',
    key: 'slide49Quote',
    title: 'Met Slogan',
    schema: slide49QuoteSchema,
    componentFile: 'Slide49.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'dashboard-login',
  }],
  
  ['slide50', {
    id: 'slide50',
    key: 'slide50',
    title: 'QR-Code Keuze',
    componentFile: 'Slide50.tsx',
    showGlobalNext: false, // Auto-continue after selection
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Direct navigation - no database storage needed
      // Navigation logic handled in component via goToStep()
      return 'dashboard-login' // Fallback (should not be reached)
    },
  }],
  
  ['slide51', {
    id: 'slide51',
    key: 'slide51',
    title: 'Merkidentiteit Keuze',
    schema: slide51LogoMerknaamSchema,
    componentFile: 'Slide51.tsx',
    showGlobalNext: false, // Auto-advance after selection
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): string => {
      // Conditional navigation based on logoOfMerknaam choice
      return formData.logoOfMerknaam === 'merknaam' ? 'slide52' : 'slide53'
    },
  }],
  
  ['slide52', {
    id: 'slide52',
    key: 'slide52',
    title: 'Merknaam Gekozen',
    componentFile: 'Slide52.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'dashboard-login',
  }],
  
  ['slide53', {
    id: 'slide53',
    key: 'slide53',
    title: 'Logo Gekozen',
    componentFile: 'Slide53.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'dashboard-login',
  }],
  
  ['slide55', {
    id: 'slide55',
    key: 'slide55',
    title: 'Met QR-Code',
    componentFile: 'Slide55.tsx',
    showGlobalNext: true, // Manual continue
    showGlobalPrev: true,
    nextStep: (): string => 'dashboard-login',
  }],
  
  ['dashboard-login', {
    id: 'dashboard-login',
    key: 'dashboardLogin',
    title: 'Dashboard',
    schema: agreementsSchema,
    showGlobalNext: true,  // Manual continue
    showGlobalPrev: true,
    nextStep: (formData: Partial<FormData>): null => null, // End of flow
  }],
])

// ===== Helper Functions =====

/**
 * Get step definition by ID
 */
export function getStep(stepId: string): StepDefinition | undefined {
  return stepRegistry.get(stepId)
}

/**
 * Get all steps in order
 */
export function getAllSteps(): StepDefinition[] {
  return Array.from(stepRegistry.values())
}

/**
 * Get the next step ID based on current step and form data
 */
export function getNextStepId(
  currentStepId: string,
  formData: Partial<FormData>
): string | null {
  const currentStep = getStep(currentStepId)
  if (!currentStep) return null
  
  if (typeof currentStep.nextStep === 'function') {
    return currentStep.nextStep(formData)
  }
  
  return null
}

/**
 * Get the previous step ID in the flow
 */
export function getPreviousStepId(
  currentStepId: string,
  visitedSteps: string[]
): string | null {
  const currentIndex = visitedSteps.indexOf(currentStepId)
  if (currentIndex <= 0) return null
  
  return visitedSteps[currentIndex - 1]
}

/**
 * Check if a step can be entered based on guards
 */
export function canEnterStep(
  stepId: string,
  formData: Partial<FormData>
): boolean {
  const step = getStep(stepId)
  if (!step) return false
  
  if (step.guards?.canEnter) {
    return step.guards.canEnter(formData)
  }
  
  return true
}

/**
 * Check if a step should be skipped
 */
export function shouldSkipStep(
  stepId: string,
  formData: Partial<FormData>
): boolean {
  const step = getStep(stepId)
  if (!step) return false
  
  if (step.skipIf) {
    return step.skipIf(formData)
  }
  
  return false
}

/**
 * Validate step data
 */
export function validateStepData(
  stepId: string,
  formData: Partial<FormData>
): { isValid: boolean; errors?: z.ZodError } {
  const step = getStep(stepId)
  if (!step || !step.schema) {
    return { isValid: true }
  }
  
  // Pass the entire formData to the schema - each schema knows which fields to validate
  const result = step.schema.safeParse(formData)
  
  if (!result.success) {
    return { isValid: false, errors: result.error }
  }
  
  return { isValid: true }
}

/**
 * Get linear flow path based on form data
 */
export function getFlowPath(formData: Partial<FormData>): string[] {
  const path: string[] = []
  let currentStepId: string | null = 'email'  // Start with email first
  const visited = new Set<string>()
  const maxSteps = 1000 // Support up to 1000 steps
  let stepCount = 0
  
  while (currentStepId && stepCount < maxSteps) {
    // Break on cycles - if we've seen this step before, stop
    if (visited.has(currentStepId)) {
      break
    }
    
    visited.add(currentStepId)
    
    if (!shouldSkipStep(currentStepId, formData)) {
      path.push(currentStepId)
    }
    
    currentStepId = getNextStepId(currentStepId, formData)
    stepCount++
  }
  
  return path
}

/**
 * Add a new step to the registry
 * This makes adding new steps trivial - just call this function
 */
export function registerStep(step: StepDefinition): void {
  stepRegistry.set(step.id, step)
}

/**
 * Remove a step from the registry
 */
export function unregisterStep(stepId: string): void {
  stepRegistry.delete(stepId)
}

// Types are already exported above with their definitions