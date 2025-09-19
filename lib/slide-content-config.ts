/**
 * Central configuration for all slide content
 * This makes it easy to manage images, icons, and text for different paths
 */

// ============================================
// VARIANT CONFIGURATIONS
// ============================================
export const variantContent: Record<string, any> = {
  // Alias entries for semantic IDs
  'elegant-styles': {
    title: 'Kies je template',
    description: 'Selecteer een elegant variant die het beste bij jouw salon past.',
    style: 'elegant',
    columns: 2,
    options: [
      { key: 'elegant', label: 'Elegant Template', dbValue: 'elegant', imageSrc: '/img/slide3/elegant-template.jpg' }
    ],
    nextStep: 'elegant-variant1'
  },
  'modern-styles': {
    title: 'Kies je template',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    style: 'modern',
    columns: 2,
    options: [
      { key: 'modern', label: 'Modern Template', dbValue: 'modern', imageSrc: '/img/slide11/modern-template.jpg' }
    ],
    nextStep: 'modern1-variant'
  },
  'slide3': {
    title: 'Kies je template',
    description: 'Selecteer een elegant variant die het beste bij jouw salon past.',
    style: 'elegant',
    columns: 2,
    options: [
      { key: 'elegant', label: 'Elegant Template', dbValue: 'elegant', imageSrc: '/img/slide3/elegant-template.jpg' }
    ],
    nextStep: 'elegant-variant1'
  },
  'slide11': {
    title: 'Kies je template',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    style: 'modern',
    columns: 2,
    options: [
      { key: 'modern', label: 'Modern Template', dbValue: 'modern', imageSrc: '/img/slide11/modern-template.jpg' }
    ],
    nextStep: 'modern1-variant'
  },
  'slide4': {
    title: 'Kies je Elegant template variant 1',
    description: 'Selecteer een van de twee elegant varianten die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'elegant-1-1', label: 'Elegant 1.1', dbValue: 'Elegant 1.1', imageSrc: '/img/slide4/elegant-1-1.jpg' },
      { key: 'elegant-1-2', label: 'Elegant 1.2', dbValue: 'Elegant 1.2', imageSrc: '/img/slide4/elegant-1-2.jpg' }
    ]
  },
  'slide5': {
    title: 'Kies je Elegant template variant 2',
    description: 'Selecteer een van de twee elegant varianten die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'elegant-2-1', label: 'Elegant 2.1', dbValue: 'Elegant 2.1', imageSrc: '/img/slide5/elegant-2-1.jpg' },
      { key: 'elegant-2-2', label: 'Elegant 2.2', dbValue: 'Elegant 2.2', imageSrc: '/img/slide5/elegant-2-2.jpg' }
    ]
  },
  'slide12': {
    title: 'Kies je Modern template variant',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    nextStep: 'modern2-variant',
    columns: 3,
    options: [
      { key: 'modern1', label: 'Modern 1.1', dbValue: 'modern1', imageSrc: '/img/slide12/modern1.jpg' },
      { key: 'modern2', label: 'Modern 1.2', dbValue: 'modern2', imageSrc: '/img/slide12/modern2.jpg' },
      { key: 'modern3', label: 'Modern 1.3', dbValue: 'modern3', imageSrc: '/img/slide12/modern3.jpg' }
    ]
  },
  'slide13': {
    title: 'Kies je Modern template variant 2',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'modern6', label: 'Modern 2.1', dbValue: 'modern6', imageSrc: '/img/slide13/modern6.jpg' }
    ]
  },
  'slide15': {
    title: 'Kies je Modern template variant 3',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'modern3-1', label: 'Modern 3.1', dbValue: 'Modern 3.1', imageSrc: '/img/slide15/modern-3-1.jpg' },
      { key: 'modern3-2', label: 'Modern 3.2', dbValue: 'Modern 3.2', imageSrc: '/img/slide15/modern-3-2.jpg' }
    ]
  },
  'elegant-variant1': {
    title: 'Kies je Elegant template variant 1',
    description: 'Selecteer een van de twee elegant varianten die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'elegant-1-1', label: 'Elegant 1.1', dbValue: 'Elegant 1.1', imageSrc: '/img/slide4/elegant-1-1.jpg' },
      { key: 'elegant-1-2', label: 'Elegant 1.2', dbValue: 'Elegant 1.2', imageSrc: '/img/slide4/elegant-1-2.jpg' }
    ]
  },
  'elegant-variant2': {
    title: 'Kies je Elegant template variant 2',
    description: 'Selecteer een van de twee elegant varianten die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'elegant-2-1', label: 'Elegant 2.1', dbValue: 'Elegant 2.1', imageSrc: '/img/slide5/elegant-2-1.jpg' },
      { key: 'elegant-2-2', label: 'Elegant 2.2', dbValue: 'Elegant 2.2', imageSrc: '/img/slide5/elegant-2-2.jpg' }
    ]
  },
  'modern-variant1': {
    title: 'Kies je Modern template variant',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 3,
    options: [
      { key: 'modern1', label: 'Modern 1.1', dbValue: 'modern1', imageSrc: '/img/slide12/modern1.jpg' },
      { key: 'modern2', label: 'Modern 1.2', dbValue: 'modern2', imageSrc: '/img/slide12/modern2.jpg' },
      { key: 'modern3', label: 'Modern 1.3', dbValue: 'modern3', imageSrc: '/img/slide12/modern3.jpg' }
    ]
  },
  'modern-variant2': {
    title: 'Kies je Modern template variant 2',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'modern6', label: 'Modern 2.1', dbValue: 'modern6', imageSrc: '/img/slide13/modern6.jpg' }
    ]
  },
  'modern-variant3': {
    title: 'Kies je Modern template variant 3',
    description: 'Selecteer een modern variant die het beste bij jouw salon past.',
    nextStep: 'color-scheme',
    columns: 2,
    options: [
      { key: 'modern3-1', label: 'Modern 3.1', dbValue: 'Modern 3.1', imageSrc: '/img/slide15/modern-3-1.jpg' },
      { key: 'modern3-2', label: 'Modern 3.2', dbValue: 'Modern 3.2', imageSrc: '/img/slide15/modern-3-2.jpg' }
    ]
  }
}

// ============================================
// COLOR CHOICE CONFIGURATIONS
// ============================================
export const colorChoiceContent: Record<string, any> = {
  'color-scheme': {
    title: 'Kies je kleurenschema',
    description: 'Wil je een zwart-wit schema of liever met kleur?',
    columns: 2,
    options: [
      { key: 'zwart-wit', label: 'Zwart-wit', dbValue: 'Zwart-wit', imageSrc: '/img/slide6/zwart-wit.jpg', nextStep: 'final-color' },
      { key: 'kleur', label: 'Kleur', dbValue: 'Kleur', imageSrc: '/img/slide6/kleur.jpg', nextStep: 'final-color' }
    ]
  },
  'slide6': {
    title: 'Kies je kleurenschema',
    description: 'Wil je een zwart-wit schema of liever met kleur?',
    columns: 2,
    options: [
      { key: 'zwart-wit', label: 'Zwart-wit', dbValue: 'Zwart-wit', imageSrc: '/img/slide6/zwart-wit.jpg', nextStep: 'final-color' },
      { key: 'kleur', label: 'Kleur', dbValue: 'Kleur', imageSrc: '/img/slide6/kleur.jpg', nextStep: 'final-color' }
    ]
  },
  'slide16': {
    title: 'Kies je kleurenschema',
    description: 'Wil je een zwart-wit schema of liever met kleur?',
    columns: 2,
    options: [
      { key: 'zwart-wit', label: 'Zwart-wit', dbValue: 'Zwart-wit', imageSrc: '/img/slide16/zwart-wit.jpg', nextStep: 'final-color' },
      { key: 'kleur', label: 'Kleur', dbValue: 'Kleur', imageSrc: '/img/slide16/kleur.jpg', nextStep: 'final-color' }
    ]
  },
  'slide7': {
    title: 'Bepaal je kleurenpalet',
    description: 'Kies het kleurenpalet dat past bij jouw salon.',
    columns: 3,
    options: [
      { key: 'soft-tones', label: 'Soft Tones', dbValue: 'Soft Tones', imageSrc: '/img/slide7/soft-tones.jpg', nextStep: 'color-palette' },
      { key: 'warm-naturals', label: 'Warm Naturals', dbValue: 'Warm Naturals', imageSrc: '/img/slide7/warm-naturals.jpg', nextStep: 'color-palette' },
      { key: 'deep-elegance', label: 'Deep Elegance', dbValue: 'Deep Elegance', imageSrc: '/img/slide7/deep-elegance.jpg', nextStep: 'color-palette' }
    ]
  },
  'slide17': {
    title: 'Bepaal je kleurenpalet',
    description: 'Kies het kleurenpalet dat past bij jouw salon.',
    columns: 3,
    options: [
      { key: 'soft-tones', label: 'Soft Tones', dbValue: 'Soft Tones', imageSrc: '/img/slide17/soft-tones.jpg', nextStep: 'color-palette' },
      { key: 'warm-naturals', label: 'Warm Naturals', dbValue: 'Warm Naturals', imageSrc: '/img/slide17/warm-naturals.jpg', nextStep: 'color-palette' },
      { key: 'deep-elegance', label: 'Deep Elegance', dbValue: 'Deep Elegance', imageSrc: '/img/slide17/deep-elegance.jpg', nextStep: 'color-palette' }
    ]
  }
}

// ============================================
// PRODUCT NAME CONFIGURATIONS
// ============================================
export const productNameContent: Record<string, any> = {
  'slide22': {
    title: 'No Yellow - Kies je productnamen',
    description: 'Kies de namen voor je No Yellow producten.',
    instructions: 'Selecteer één optie voor elk product.',
    sections: [
      {
        key: 'shampoo',
        title: 'No Yellow Shampoo',
        fieldName: 'naamNoYellowShampoo',
        options: [
          '1. No Yellow Shampoo',
          '2. Anti-Yellow Shampoo',
          '3. Goodbye Yellow Shampoo',
          '4. Silver Shampoo',
          '5. Cool Blonde Shampoo'
        ]
      },
      {
        key: 'conditioner',
        title: 'No Yellow Conditioner',
        fieldName: 'naamNoYellowConditioner',
        options: [
          '1. No Yellow Conditioner',
          '2. Anti-Yellow Conditioner',
          '3. Goodbye Yellow Conditioner',
          '4. Silver Conditioner',
          '5. Cool Blonde Conditioner'
        ]
      }
    ]
  },
  'slide23': {
    title: 'Repair - Kies je productnamen',
    description: 'Kies de namen voor je Repair producten.',
    instructions: 'Selecteer één optie voor elk product.',
    sections: [
      {
        key: 'shampoo',
        title: 'Repair Shampoo',
        fieldName: 'naamRepairShampoo',
        options: [
          '1. Repair Shampoo',
          '2. Restore Shampoo',
          '3. Recovery Shampoo',
          '4. Damage Repair Shampoo',
          '5. Intensive Repair Shampoo'
        ]
      },
      {
        key: 'conditioner',
        title: 'Repair Conditioner',
        fieldName: 'naamRepairConditioner',
        options: [
          '1. Repair Conditioner',
          '2. Restore Conditioner',
          '3. Recovery Conditioner',
          '4. Damage Repair Conditioner',
          '5. Intensive Repair Conditioner'
        ]
      }
    ]
  },
  'slide24': {
    title: 'Color - Kies je productnamen',
    description: 'Kies de namen voor je Color producten.',
    instructions: 'Selecteer één optie voor elk product.',
    sections: [
      {
        key: 'shampoo',
        title: 'Color Shampoo',
        fieldName: 'naamColorShampoo',
        options: [
          '1. Color Shampoo',
          '2. Color Protect Shampoo',
          '3. Color Care Shampoo',
          '4. Color Preserve Shampoo',
          '5. Color Guard Shampoo'
        ]
      },
      {
        key: 'conditioner',
        title: 'Color Conditioner',
        fieldName: 'naamColorConditioner',
        options: [
          '1. Color Conditioner',
          '2. Color Protect Conditioner',
          '3. Color Care Conditioner',
          '4. Color Preserve Conditioner',
          '5. Color Guard Conditioner'
        ]
      }
    ]
  },
  'slide25': {
    title: 'Curly - Kies je productnamen',
    description: 'Kies de namen voor je Curly producten.',
    instructions: 'Selecteer één optie voor elk product.',
    sections: [
      {
        key: 'shampoo',
        title: 'Curly Shampoo',
        fieldName: 'naamCurlyShampoo',
        options: [
          '1. Curly Shampoo',
          '2. Curl Define Shampoo',
          '3. Curl Care Shampoo',
          '4. Curl Boost Shampoo',
          '5. Curl Enhance Shampoo'
        ]
      },
      {
        key: 'conditioner',
        title: 'Curly Conditioner',
        fieldName: 'naamCurlyConditioner',
        options: [
          '1. Curly Conditioner',
          '2. Curl Define Conditioner',
          '3. Curl Care Conditioner',
          '4. Curl Boost Conditioner',
          '5. Curl Enhance Conditioner'
        ]
      }
    ]
  },
  'slide26': {
    title: 'Sulfaatvrij - Kies je productnamen',
    description: 'Kies de namen voor je Sulfaatvrije producten.',
    instructions: 'Selecteer één optie voor elk product.',
    sections: [
      {
        key: 'shampoo',
        title: 'Sulfaatvrij Shampoo',
        fieldName: 'naamSulfaatvrijShampoo',
        options: [
          '1. Sulfate Free Shampoo',
          '2. Gentle Shampoo',
          '3. Pure Shampoo',
          '4. Mild Shampoo',
          '5. Natural Shampoo'
        ]
      },
      {
        key: 'conditioner',
        title: 'Sulfaatvrij Conditioner',
        fieldName: 'naamSulfaatvrijConditioner',
        options: [
          '1. Sulfate Free Conditioner',
          '2. Gentle Conditioner',
          '3. Pure Conditioner',
          '4. Mild Conditioner',
          '5. Natural Conditioner'
        ]
      }
    ]
  },
  'slide27': {
    title: 'Men - Kies je productnaam',
    description: 'Kies de naam voor je Men product.',
    instructions: 'Selecteer één optie.',
    sections: [
      {
        key: 'shampoo',
        title: 'Men Shampoo',
        fieldName: 'naamMenShampoo',
        options: [
          '1. Men Shampoo',
          '2. For Men Shampoo',
          '3. Mens Care Shampoo',
          '4. Power Shampoo',
          '5. Active Shampoo'
        ]
      }
    ]
  },
  'slide28': {
    title: 'Stylingproducten - Kies je productnamen',
    description: 'Kies de namen voor je stylingproducten.',
    instructions: 'Selecteer één optie voor elk product.',
    sections: [
      {
        key: 'hairspray',
        title: 'Hairspray',
        fieldName: 'naamHairspray',
        options: ['1. Hairspray', '2. Finishing Spray', '3. Hold Spray', '4. Style Spray', '5. Fix Spray']
      },
      {
        key: 'volumeMousse',
        title: 'Volume Mousse',
        fieldName: 'naamVolumeMousse',
        options: ['1. Volume Mousse', '2. Lift Mousse', '3. Body Mousse', '4. Boost Mousse', '5. Full Mousse']
      },
      {
        key: 'dryShampoo',
        title: 'Dry Shampoo',
        fieldName: 'naamDryShampoo',
        options: ['1. Dry Shampoo', '2. Refresh Shampoo', '3. Instant Shampoo', '4. Quick Shampoo', '5. Fresh Shampoo']
      },
      {
        key: 'volumeGel',
        title: 'Volume Gel',
        fieldName: 'naamVolumeGel',
        options: ['1. Volume Gel', '2. Styling Gel', '3. Hold Gel', '4. Shape Gel', '5. Define Gel']
      },
      {
        key: 'fiberPaste',
        title: 'Fiber Paste',
        fieldName: 'naamFiberPaste',
        options: ['1. Fiber Paste', '2. Texture Paste', '3. Matte Paste', '4. Clay Paste', '5. Shaping Paste']
      },
      {
        key: 'texturePaste',
        title: 'Texture Paste',
        fieldName: 'naamTexturePaste',
        options: ['1. Texture Paste', '2. Define Paste', '3. Style Paste', '4. Sculpt Paste', '5. Form Paste']
      },
      {
        key: 'controlCream',
        title: 'Control Cream',
        fieldName: 'naamControlCream',
        options: ['1. Control Cream', '2. Smooth Cream', '3. Taming Cream', '4. Sleek Cream', '5. Polish Cream']
      }
    ]
  }
}

// ============================================
// INGREDIENTS CONFIGURATIONS
// ============================================
const commonIngredients = [
  { name: 'Aloë Vera', description: 'Kalmeert de hoofdhuid en geeft het haar een natuurlijke, stralende glans.', icon: 'Leaf' },
  { name: 'Arganolie', description: 'Bevat essentiële vetzuren die zorgen voor diepe hydratie en verhoogde vitaliteit.', icon: 'Droplets' },
  { name: 'Biotine', description: 'Versterkt het haar van wortel tot punt, waardoor het krachtiger en elastischer wordt.', icon: 'Shield' },
  { name: 'Druivenpit Extract', description: 'Bevat krachtige antioxidanten die het haar voeden en beschermen.', icon: 'Grape' },
  { name: 'Gehydrolyseerd Tarweproteïne', description: 'Versterkt elke haarlok van binnenuit voor sterker en gezonder haar.', icon: 'Wheat' },
  { name: 'Jojoba-olie', description: 'Biedt intensieve hydratie zonder het haar zwaar te maken, voor een licht en luchtig gevoel.', icon: 'Circle' },
  { name: 'Hyaluronzuur', description: 'Zorgt voor een intensieve hydratatieboost, waardoor het haar luxueus zacht en soepel aanvoelt.', icon: 'Circle' },
  { name: 'Vitamine B5', description: 'Behoudt vocht in het haar en biedt bescherming tegen haarbreuk, voor gezond en sterk haar.', icon: 'Moon' },
  { name: 'Vitamine C', description: 'Stimuleert de collageenproductie en verbetert de natuurlijke elasticiteit, voor veerkrachtiger haar.', icon: 'Zap' },
  { name: 'Vitamine E', description: 'Bevordert de haargroei en geeft het haar een natuurlijke, gezonde glans.', icon: 'Square' }
]

export const ingredientsContent: Record<string, any> = {
  'slide30': {
    title: 'No Yellow - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënten voor je No Yellow producten.',
    instructions: 'Kies één ingrediënt per product.',
    ingredients: commonIngredients,
    products: [
      { key: 'NoYellowShampoo', title: 'No Yellow Shampoo', fieldName: 'marketingIngredientenNoYellowShampoo', defaultIngredient: 'Hyaluronzuur' },
      { key: 'NoYellowConditioner', title: 'No Yellow Conditioner', fieldName: 'marketingIngredientenNoYellowConditioner', defaultIngredient: 'Jojoba-olie' }
    ]
  },
  'slide31': {
    title: 'Repair - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënten voor je Repair producten.',
    instructions: 'Kies één ingrediënt per product.',
    ingredients: commonIngredients,
    products: [
      { key: 'RepairShampoo', title: 'Repair Shampoo', fieldName: 'marketingIngredientenRepairShampoo', defaultIngredient: 'Arganolie' },
      { key: 'RepairConditioner', title: 'Repair Conditioner', fieldName: 'marketingIngredientenRepairConditioner', defaultIngredient: 'Biotine' }
    ]
  },
  'slide32': {
    title: 'Color - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënten voor je Color producten.',
    instructions: 'Kies één ingrediënt per product.',
    ingredients: commonIngredients,
    products: [
      { key: 'ColorShampoo', title: 'Color Shampoo', fieldName: 'marketingIngredientenColorShampoo', defaultIngredient: 'Vitamine E' },
      { key: 'ColorConditioner', title: 'Color Conditioner', fieldName: 'marketingIngredientenColorConditioner', defaultIngredient: 'Druivenpit Extract' }
    ]
  },
  'slide33': {
    title: 'Curly - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënten voor je Curly producten.',
    instructions: 'Kies één ingrediënt per product.',
    ingredients: commonIngredients,
    products: [
      { key: 'CurlyShampoo', title: 'Curly Shampoo', fieldName: 'marketingIngredientenCurlyShampoo', defaultIngredient: 'Aloë Vera' },
      { key: 'CurlyConditioner', title: 'Curly Conditioner', fieldName: 'marketingIngredientenCurlyConditioner', defaultIngredient: 'Jojoba-olie' }
    ]
  },
  'slide34': {
    title: 'Sulfaatvrij - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënten voor je Sulfaatvrije producten.',
    instructions: 'Kies één ingrediënt per product.',
    ingredients: commonIngredients,
    products: [
      { key: 'SulfaatvrijShampoo', title: 'Sulfaatvrij Shampoo', fieldName: 'marketingIngredientenSulfaatvrijShampoo', defaultIngredient: 'Aloë Vera' },
      { key: 'SulfaatvrijConditioner', title: 'Sulfaatvrij Conditioner', fieldName: 'marketingIngredientenSulfaatvrijConditioner', defaultIngredient: 'Arganolie' }
    ]
  },
  'slide35': {
    title: 'Men - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënt voor je Men product.',
    instructions: 'Kies één ingrediënt.',
    ingredients: commonIngredients,
    products: [
      { key: 'MenShampoo', title: 'Men Shampoo', fieldName: 'marketingIngredientenMenShampoo', defaultIngredient: 'Vitamine B5' }
    ]
  },
  'slide36': {
    title: 'Stylingproducten - Kies je ingrediënten',
    description: 'Selecteer de marketing ingrediënten voor je stylingproducten.',
    instructions: 'Kies één ingrediënt per product.',
    ingredients: commonIngredients,
    products: [
      { key: 'Hairspray', title: 'Hairspray', fieldName: 'marketingIngredientenHairspray', defaultIngredient: 'Vitamine E' },
      { key: 'VolumeMousse', title: 'Volume Mousse', fieldName: 'marketingIngredientenVolumeMousse', defaultIngredient: 'Biotine' },
      { key: 'DryShampoo', title: 'Dry Shampoo', fieldName: 'marketingIngredientenDryShampoo', defaultIngredient: 'Aloë Vera' },
      { key: 'VolumeGel', title: 'Volume Gel', fieldName: 'marketingIngredientenVolumeGel', defaultIngredient: 'Hyaluronzuur' },
      { key: 'FiberPaste', title: 'Fiber Paste', fieldName: 'marketingIngredientenFiberPaste', defaultIngredient: 'Gehydrolyseerd Tarweproteïne' },
      { key: 'TexturePaste', title: 'Texture Paste', fieldName: 'marketingIngredientenTexturePaste', defaultIngredient: 'Arganolie' },
      { key: 'ControlCream', title: 'Control Cream', fieldName: 'marketingIngredientenControlCream', defaultIngredient: 'Jojoba-olie' }
    ]
  }
}

// ============================================
// ICON SETS - Easy to add new icons here
// ============================================
// ============================================
// BINARY CHOICE CONFIGURATIONS
// ============================================
export const binaryChoiceContent: Record<string, any> = {
  'slide37': {
    title: 'Kies jouw claim voorkeur',
    description: 'Nu is het tijd om te bepalen hoe je jouw productlijn wilt positioneren.',
    fieldName: 'metZonderClaim',
    instructions: 'Klik op Met claim of Zonder claim om je keuze te maken.',
    options: [
      {
        key: 'met-claim',
        label: 'Met claim',
        dbValue: 'met-claim',
        explanation: 'Producten met duidelijke beloftes en specifieke voordelen die worden gecommuniceerd naar je klanten.',
        imageSrc: '/icon-with.png',
        nextStep: 'source-shampoo'
      },
      {
        key: 'zonder-claim',
        label: 'Zonder claim',
        dbValue: 'zonder-claim',
        explanation: 'Neutrale producten zonder specifieke beloftes, gericht op basis haarverzorging en styling.',
        imageSrc: '/icon-without.png',
        nextStep: 'slide46'
      }
    ]
  },
  'slide48': {
    title: 'Wil je een slogan toevoegen?',
    description: 'Een slogan kan je merk versterken en je boodschap kracht bijzetten.',
    fieldName: 'sloganJaNee',
    options: [
      { key: 'met-slogan', label: 'Met slogan', dbValue: 'Ja', imageSrc: '/img/slide48/met-slogan.png', nextStep: 'slide49' },
      { key: 'zonder-slogan', label: 'Zonder slogan', dbValue: 'Nee', imageSrc: '/img/slide48/zonder-slogan.png', nextStep: 'slide50' }
    ]
  },
  'slide50': {
    title: 'Wil je een QR-code op de verpakking?',
    description: 'Een QR-code kan klanten naar je website of social media leiden.',
    fieldName: 'qrCode',
    options: [
      { key: 'met-qr', label: 'Met QR-code', dbValue: 'Ja', imageSrc: '/img/slide50/met-qr.png', nextStep: 'slide51' },
      { key: 'zonder-qr', label: 'Zonder QR-code', dbValue: 'Nee', imageSrc: '/img/slide50/zonder-qr.png', nextStep: 'slide51' }
    ]
  },
  'slide51': {
    title: 'Logo of merknaam?',
    description: 'Kies hoe je merk wordt weergegeven op de verpakking.',
    fieldName: 'logoOfMerknaam',
    options: [
      { key: 'logo', label: 'Logo', dbValue: 'Logo', imageSrc: '/img/slide51/logo.png', nextStep: 'slide53' },
      { key: 'merknaam', label: 'Merknaam', dbValue: 'Merknaam', imageSrc: '/img/slide51/merknaam.png', nextStep: 'slide52' }
    ]
  }
}

// ============================================
// TEXT INPUT CONFIGURATIONS
// ============================================
export const textInputContent: Record<string, any> = {
  'slide49': {
    title: 'Voeg je persoonlijke slogan toe',
    description: 'Een krachtige slogan blijft hangen en versterkt je merkidentiteit.',
    helperText: 'Bijvoorbeeld: "Your hair, your crown" of "Natuurlijke schoonheid"',
    fieldName: 'quote',
    storageKey: 'personalQuote',
    placeholder: 'Typ hier je slogan...',
    maxLength: 100,
    multiline: true,
    required: true,
    showContinue: true,
    errorMessage: 'Voer een slogan in'
  },
  'slide52': {
    title: 'Wat is je merknaam?',
    description: 'Voer de naam in die op je producten moet komen.',
    fieldName: 'merknaam',
    storageKey: 'brandName',
    placeholder: 'Typ hier je merknaam...',
    maxLength: 50,
    multiline: false,
    required: true,
    showContinue: true,
    errorMessage: 'Voer een merknaam in'
  }
}

// ============================================
// SOURCE CHOICE CONFIGURATIONS
// ============================================
export const sourceChoiceContent: Record<string, any> = {
  'slide21': {
    title: 'Kies je werkwijze voor productnamen',
    description: 'Bepaal hoe je de namen voor je producten wilt selecteren.',
    fieldName: 'namenBron',
    options: [
      {
        key: 'salonid',
        label: 'SalonID Suggesties',
        dbValue: 'SalonID',
        description: 'Kies uit professionele naam suggesties die wij voor je hebben samengesteld.',
        icon: '💡',
        features: [
          'Professionele naamgeving',
          'Bewezen marketingformules',
          'Direct toepasbaar',
          'Consistent over hele lijn'
        ],
        nextStep: 'slide22'
      },
      {
        key: 'zelf',
        label: 'Eigen Namen',
        dbValue: 'Zelf',
        description: 'Bedenk je eigen unieke productnamen.',
        icon: '✏️',
        features: [
          'Volledig gepersonaliseerd',
          'Unieke merkidentiteit',
          'Creatieve vrijheid',
          'Eigen visie'
        ],
        nextStep: 'slide29'
      }
    ]
  },
  'slide29': {
    title: 'Kies je werkwijze voor ingrediënten',
    description: 'Bepaal hoe je de marketing ingrediënten wilt selecteren.',
    fieldName: 'ingredientenBron',
    options: [
      {
        key: 'salonid',
        label: 'SalonID Selectie',
        dbValue: 'SalonID',
        description: 'Kies uit premium ingrediënten die wij hebben geselecteerd.',
        nextStep: 'slide30'
      },
      {
        key: 'zelf',
        label: 'Eigen Ingrediënten',
        dbValue: 'Zelf',
        description: 'Selecteer je eigen ingrediënten.',
        nextStep: 'slide37'
      }
    ]
  },
  'slide38': {
    title: 'Kies je werkwijze voor claims',
    description: 'Bepaal hoe je de product claims wilt opstellen.',
    fieldName: 'claimsBron',
    options: [
      {
        key: 'salonid',
        label: 'SalonID Claims',
        dbValue: 'SalonID',
        description: 'Gebruik professionele claims die wij hebben opgesteld.',
        nextStep: 'slide39'
      },
      {
        key: 'zelf',
        label: 'Eigen Claims',
        dbValue: 'Zelf',
        description: 'Schrijf je eigen product claims.',
        nextStep: 'slide46'
      }
    ]
  }
}

export const iconSets = {
  // Icons for Elegant path
  elegant: {
    default: [
      { id: "icon16", name: "Icoon 16", path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" },
      { id: "icon17", name: "Icoon 17", path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" },
      { id: "icon18", name: "Icoon 18", path: "M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" },
      { id: "icon19", name: "Icoon 19", path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" },
      { id: "icon20", name: "Icoon 20", path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" },
      { id: "icon21", name: "Icoon 21", path: "M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2Z" },
      { id: "icon22", name: "Icoon 22", path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" },
      { id: "icon23", name: "Icoon 23", path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" }
    ],
    // Add variant-specific icon sets here as needed
    'Elegant 1.1': [
      // Can have different icons for Elegant 1.1 if needed
      // For now, using default set
    ]
  },
  
  // Icons for Modern path
  modern: {
    default: [
      { id: "icon16", name: "Icoon 16", path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" },
      { id: "icon17", name: "Icoon 17", path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" },
      { id: "icon18", name: "Icoon 18", path: "M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" },
      { id: "icon19", name: "Icoon 19", path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" },
      { id: "icon20", name: "Icoon 20", path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" },
      { id: "icon21", name: "Icoon 21", path: "M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2Z" },
      { id: "icon22", name: "Icoon 22", path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" },
      { id: "icon23", name: "Icoon 23", path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" }
    ],
    // Add variant-specific icon sets here as needed
    'Modern 1.1': [
      // Can have different icons for Modern 1.1 if needed
    ]
  }
}

// ============================================
// CLAIMS CONFIGURATIONS
// ============================================
export const claimsContent: Record<string, any> = {
  'slide39': {
    title: 'No Yellow - Kies je standaard claims',
    description: 'Selecteer de claims voor je No Yellow producten.',
    instructions: 'Kies één claim per product.',
    sections: [
      {
        key: 'NoYellowShampoo',
        title: 'No Yellow Shampoo',
        fieldName: 'standaardClaimNoYellowShampoo',
        claims: [
          'Reinigt, hydrateert en verheldert geblondeerd, blond en grijs haar',
          'Verhelderende en neutraliserende shampoo speciaal voor blond en grijs haar',
          'Toningshampoo voor grijs, blond en geblondeerd haar',
          'Milde reiniging en verheldering van blonde en grijze tinten',
          'Reinigt en hydrateert het haar, terwijl het warme tinten in blond en grijs haar elimineert',
          'Reinigt het haar en verwijdert onmiddellijk gele tinten uit blond en grijs haar',
          'Vermindert de warme, gele tinten in blond haar en biedt milde reiniging',
          'Reinigt, verbetert de elasticiteit en behoudt de koele tint en glans van blond en grijs haar',
          'Reinigt het haar, beschermt tegen externe schade en behoudt de koele tint',
          'Biedt een langdurige, stralende kleur zonder gele ondertonen'
        ]
      },
      {
        key: 'NoYellowConditioner',
        title: 'No Yellow Conditioner',
        fieldName: 'standaardClaimNoYellowConditioner',
        claims: [
          'Hydrateert, herstelt en verheldert blond, grijs en geblondeerd haar',
          'Neutraliserende en verhelderende conditioner voor blond en grijs haar',
          'Toningsconditioner voor grijs, blond en geblondeerd haar',
          'Verzacht het haar en verheldert blonde en grijze tinten',
          'Hydrateert het haar en elimineert gele tinten in blond en grijs haar',
          'Biedt zachte verzorging en vermindert warme gele tonen in blond haar',
          'Zorgt voor een langdurige, stralende kleur zonder gele ondertonen',
          'Conditioneert en verbetert de elasticiteit, terwijl het de koele tint en glans behoudt',
          'Verzorgt het haar, beschermt tegen externe schade en behoudt de koele tint',
          'Behoudt de kleurdiepte en voorkomt verkleuring voor langdurig mooie resultaten'
        ]
      }
    ]
  },
  'slide40': {
    title: 'Repair - Kies je standaard claims',
    description: 'Selecteer de claims voor je Repair producten.',
    instructions: 'Kies één claim per product.',
    sections: [
      {
        key: 'RepairShampoo',
        title: 'Repair Shampoo',
        fieldName: 'standaardClaimRepairShampoo',
        claims: [
          'Herstelt en versterkt beschadigd haar van binnenuit',
          'Intensieve herstellende shampoo voor zwaar beschadigd haar',
          'Repareert haarschade en voorkomt toekomstige breuk',
          'Diepe reiniging en herstel voor gezond uitziend haar',
          'Versterkt de haarstructuur en herstelt elasticiteit'
        ]
      },
      {
        key: 'RepairConditioner',
        title: 'Repair Conditioner',
        fieldName: 'standaardClaimRepairConditioner',
        claims: [
          'Intensief herstel en voeding voor beschadigd haar',
          'Herstelt en verzacht droog, beschadigd haar',
          'Diepe conditionering voor sterker en gezonder haar',
          'Repareert gespleten punten en voorkomt haarbreuk',
          'Geeft glans en zachtheid aan beschadigd haar'
        ]
      }
    ]
  },
  // Add similar configurations for slides 41-45
  'slide41': {
    title: 'Color - Kies je standaard claims',
    description: 'Selecteer de claims voor je Color producten.',
    instructions: 'Kies één claim per product.',
    sections: [
      {
        key: 'ColorShampoo',
        title: 'Color Shampoo',
        fieldName: 'standaardClaimColorShampoo',
        claims: [
          'Beschermt en behoudt de kleurintensiteit van gekleurd haar',
          'Kleurbesch ermende shampoo voor langdurige glans',
          'Milde reiniging die de kleur niet uitwast',
          'Verlengt de houdbaarheid van je haarkleur',
          'Reinigt zacht en behoudt kleurbriljantie'
        ]
      },
      {
        key: 'ColorConditioner',
        title: 'Color Conditioner',
        fieldName: 'standaardClaimColorConditioner',
        claims: [
          'Voedt en beschermt gekleurd haar',
          'Intensieve verzorging voor kleurbehandeld haar',
          'Verzegelt de kleur en geeft intense glans',
          'Hydrateert zonder de kleur te vervagen',
          'Beschermt tegen verkleuring en vervagging'
        ]
      }
    ]
  }
}

// ============================================
// SINGLE CHOICE CONFIGURATIONS
// ============================================
export const singleChoiceContent: Record<string, any> = {
  'slide46': {
    title: 'Selecteer je land',
    description: 'Kies het land waar je producten verkocht worden.',
    helperText: 'Dit bepaalt de taal op je verpakkingen.',
    fieldName: 'land',
    defaultValue: 'Nederland',
    autoAdvance: true,
    options: [
      { value: 'Nederland', label: 'Nederland' },
      { value: 'België', label: 'België' },
      { value: 'Duitsland', label: 'Duitsland' },
      { value: 'Frankrijk', label: 'Frankrijk' },
      { value: 'Verenigd Koninkrijk', label: 'Verenigd Koninkrijk' },
      { value: 'Spanje', label: 'Spanje' },
      { value: 'Italië', label: 'Italië' }
    ]
  }
}

// ============================================
// FILE UPLOAD CONFIGURATIONS
// ============================================
export const fileUploadContent: Record<string, any> = {
  'slide53': {
    title: 'Upload je logo',
    description: 'Upload het logo dat op je producten moet komen.',
    instructions: 'Zorg voor een hoge resolutie afbeelding (minimaal 300 DPI).',
    fieldName: 'logo',
    placeholder: 'Klik hier om je logo te uploaden',
    acceptedTypes: ['image/png', 'image/jpeg', 'image/svg+xml'],
    maxSize: 5 * 1024 * 1024, // 5MB
    required: true,
    showContinue: true,
    errorMessage: 'Alleen PNG, JPG of SVG bestanden zijn toegestaan'
  }
}

// ============================================
// CONFIRMATION CONFIGURATIONS
// ============================================
export const confirmationContent: Record<string, any> = {
  'slide54': {
    title: 'Controleer je keuzes',
    description: 'Bekijk een overzicht van al je selecties.',
    showContinue: true,
    continueText: 'Bevestigen en doorgaan',
    sections: [
      {
        title: 'Stijl & Design',
        fields: [
          { label: 'Template', fieldName: 'style' },
          { label: 'Variant', fieldName: 'elegantStyle' },
          { label: 'Kleurschema', fieldName: 'colorScheme' },
          { label: 'Icoon keuze', fieldName: 'iconChoice' }
        ]
      },
      {
        title: 'Productnamen',
        fields: [
          { label: 'No Yellow Shampoo', fieldName: 'naamNoYellowShampoo' },
          { label: 'No Yellow Conditioner', fieldName: 'naamNoYellowConditioner' }
        ]
      },
      {
        title: 'Branding',
        fields: [
          { label: 'Slogan', fieldName: 'quote' },
          { label: 'QR Code', fieldName: 'qrCode' },
          { label: 'Logo/Merknaam', fieldName: 'logoOfMerknaam' }
        ]
      }
    ],
    message: 'Controleer alle gegevens zorgvuldig. Na bevestiging worden je keuzes verwerkt.'
  }
}

// ============================================
// IMAGE CONFIGURATIONS - Organized by slide and template
// ============================================
export const slideImages = {
  // Color Configurator Images (Slide 8 & 18)
  colorConfigurator: {
    elegant: {
      default: {
        products: [
          { id: 'shampoo', image: '/img/slide8/elegant/shampoo.jpg', label: 'Shampoo' },
          { id: 'conditioner', image: '/img/slide8/elegant/conditioner.jpg', label: 'Conditioner' },
          { id: 'mask', image: '/img/slide8/elegant/mask.jpg', label: 'Mask' },
          { id: 'oil', image: '/img/slide8/elegant/oil.jpg', label: 'Oil' },
          { id: 'serum', image: '/img/slide8/elegant/serum.jpg', label: 'Serum' }
        ],
        colorPalette: '/img/slide8/elegant/palette.jpg'
      },
      'Elegant 1.1': {
        // Override images for Elegant 1.1 if different
        products: [
          { id: 'shampoo', image: '/img/slide8/elegant-1-1/shampoo.jpg', label: 'Shampoo' },
          // ... add all products
        ]
      },
      'Elegant 1.2': {
        // Override images for Elegant 1.2 if different
      },
      'Elegant 2.1': {
        // Override images for Elegant 2.1 if different
      },
      'Elegant 2.2': {
        // Override images for Elegant 2.2 if different
      },
      'Elegant 3.': {
        // Override images for Elegant 3 if different
      },
      'Elegant 4.': {
        // Override images for Elegant 4 if different
      },
      'Elegant 5.': {
        // Override images for Elegant 5 if different
      }
    },
    modern: {
      default: {
        products: [
          { id: 'shampoo', image: '/img/slide18/modern/shampoo.jpg', label: 'Shampoo' },
          { id: 'conditioner', image: '/img/slide18/modern/conditioner.jpg', label: 'Conditioner' },
          { id: 'mask', image: '/img/slide18/modern/mask.jpg', label: 'Mask' },
          { id: 'oil', image: '/img/slide18/modern/oil.jpg', label: 'Oil' },
          { id: 'serum', image: '/img/slide18/modern/serum.jpg', label: 'Serum' }
        ],
        colorPalette: '/img/slide18/modern/palette.jpg'
      },
      'Modern 1.1': {
        // Override images for Modern 1.1 if different
      },
      'Modern 1.2': {
        // Override images for Modern 1.2 if different
      },
      'Modern 2.1': {
        // Override images for Modern 2.1 if different
      },
      'Modern 2.2': {
        // Override images for Modern 2.2 if different
      },
      'Modern 3.1': {
        // Override images for Modern 3.1 if different
      },
      'Modern 3.2': {
        // Override images for Modern 3.2 if different
      },
      'Modern 4.': {
        // Override images for Modern 4 if different
      },
      'Modern 5.': {
        // Override images for Modern 5 if different
      },
      'Modern 6.1': {
        // Override images for Modern 6.1 if different
      },
      'Modern 6.2': {
        // Override images for Modern 6.2 if different
      }
    }
  },

  // Icon Yes/No Images (Slide 9 & 19)
  iconYesNo: {
    elegant: {
      withIcon: '/img/slide9/icon-with.png',
      withoutIcon: '/img/slide9/icon-without.png'
    },
    modern: {
      withIcon: '/img/slide19/icon-with.png',
      withoutIcon: '/img/slide19/icon-without.png'
    }
  },

  // Color Choice Images (Slides 6, 7, 16, 17)
  colorChoice: {
    // Slide 6 & 16 (2 options)
    twoOptions: {
      elegant: {
        zwart: '/img/slide6/black.jpg',
        kleur: '/img/slide6/color.jpg'
      },
      modern: {
        zwart: '/img/slide16/black.jpg',
        kleur: '/img/slide16/color.jpg'
      }
    },
    // Slide 7 & 17 (3 options)
    threeOptions: {
      elegant: {
        zwart: '/img/slide7/black.jpg',
        kleur: '/img/slide7/color.jpg',
        wit: '/img/slide7/white.jpg'
      },
      modern: {
        zwart: '/img/slide17/black.jpg',
        kleur: '/img/slide17/color.jpg',
        wit: '/img/slide17/white.jpg'
      }
    }
  }
}

// ============================================
// NAVIGATION CONFIGURATIONS
// ============================================
export const navigationConfig = {
  // Icon Yes/No Navigation
  iconYesNo: {
    slide9: {
      withIcon: 'slide10',
      withoutIcon: 'slide21'
    },
    slide19: {
      withIcon: 'slide20',
      withoutIcon: 'slide21'
    }
  },
  
  // Color Choice Navigation
  colorChoice: {
    slide6: {
      zwart: 'slide9',
      kleur: 'slide8'
    },
    slide7: {
      zwart: 'slide9',
      kleur: 'slide8',
      wit: 'slide9'
    },
    slide16: {
      zwart: 'slide19',
      kleur: 'slide18'
    },
    slide17: {
      zwart: 'slide19',
      kleur: 'slide18',
      wit: 'slide19'
    }
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the appropriate icon set based on user's path
 */
export function getIconSet(formData: any) {
  const style = formData.style === 'elegant' ? 'elegant' : 'modern';
  const variant = formData.elegantStyle || formData.modernStyle || 'default';
  
  // Try to get variant-specific icons first, fall back to default
  const styleIcons = iconSets[style as keyof typeof iconSets];
  const variantIcons = styleIcons?.[variant as keyof typeof styleIcons];
  if (variantIcons && variantIcons.length > 0) {
    return variantIcons;
  }
  
  return styleIcons?.default || [];
}

/**
 * Get the appropriate images for color configurator
 */
export function getColorConfiguratorImages(formData: any) {
  const userContext = getUserContext(formData);
  const isElegantPath = userContext.style === 'elegant';
  const slideNumber = isElegantPath ? 'slide8' : 'slide18';
  
  // For now, use the available variant images
  // variant1 for combined view, variant2 for per-product view
  return {
    products: {
      shampoo: `/img/${slideNumber}/variant1.jpg`,
      conditioner: `/img/${slideNumber}/variant1.jpg`,
      mask: `/img/${slideNumber}/variant2.jpg`,
      oil: `/img/${slideNumber}/variant2.jpg`,
      serum: `/img/${slideNumber}/variant2.jpg`,
    },
    combined: `/img/${slideNumber}/variant1.jpg`
  };
}

/**
 * Get the appropriate navigation for a slide
 */
export function getNavigation(slideId: string, choice: string) {
  const colorNav = navigationConfig.colorChoice[slideId as keyof typeof navigationConfig.colorChoice];
  const iconNav = navigationConfig.iconYesNo[slideId as keyof typeof navigationConfig.iconYesNo];
  
  return colorNav?.[choice as keyof typeof colorNav] || 
         iconNav?.[choice as keyof typeof iconNav];
}

/**
 * Determine the user's current path context
 */
export function getUserContext(formData: any) {
  return {
    style: formData.style,
    templateVariant: formData.elegantStyle || formData.modernStyle,
    colorChoice: formData.kleurZwartWit || formData.colorScheme || formData.finalColorChoice,
    hasIcon: formData.iconChoice === 'Met icoon' || formData.icoonJaNee === 'Met icoon',
    selectedIcon: formData.iconSelection
  };
}