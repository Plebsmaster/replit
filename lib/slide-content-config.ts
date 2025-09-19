/**
 * Central configuration for all slide content
 * This makes it easy to manage images, icons, and text for different paths
 */

// ============================================
// ICON SETS - Easy to add new icons here
// ============================================
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