export const typography = {
  // Main titles (slide headings)
  title: {
    className: "text-3xl font-bold leading-tight tracking-tight text-foreground mb-10",
    mobile: "text-2xl mb-8 font-bold text-foreground",
  },

  // Subtitle text (descriptions under titles)
  subtitle: {
    className: "text-lg text-foreground/80 leading-relaxed mb-8",
    mobile: "text-base mb-6 text-foreground/80",
  },

  // Choice card titles
  cardTitle: {
    className: "text-lg font-semibold leading-normal text-foreground mb-2",
    mobile: "text-base mb-1 font-semibold text-foreground",
  },

  // Choice card descriptions
  cardDescription: {
    className: "text-sm text-foreground/70 leading-relaxed mb-3",
    mobile: "text-xs mb-2 text-foreground/70",
  },

  // Button text
  button: {
    className: "text-base font-medium leading-none text-foreground",
    mobile: "text-sm font-medium text-foreground",
  },

  // Form labels
  label: {
    className: "text-sm font-medium leading-normal text-foreground mb-2",
  },

  // Input text
  input: {
    className: "text-base leading-normal text-foreground",
    mobile: "text-sm",
  },

  paragraph: {
    className: "text-base text-foreground/80 leading-relaxed mb-4",
    mobile: "text-sm mb-3",
  },

  section: {
    className: "mb-8",
    mobile: "mb-6",
  },
} as const

// Helper function to combine typography classes with responsive variants
export function getTypographyClasses(
  variant: keyof typeof typography,
  options: {
    includeResponsive?: boolean
    alignment?: "left" | "center" | "right"
    color?: string
    removeSpacing?: boolean
  } = {},
) {
  const { includeResponsive = true, alignment = "left", color, removeSpacing = false } = options
  const config = typography[variant]

  // Declare baseClasses as mutable string type to allow string manipulation
  let baseClasses: string = config.className

  if (removeSpacing) {
    // Fix removeSpacing parameter to properly handle string replacement
    baseClasses = baseClasses.replace(/mb-\d+/g, "").trim()
  }

  // Add alignment class
  const alignmentClass = `text-${alignment}`
  baseClasses = `${baseClasses} ${alignmentClass}`

  // Add custom color if provided
  if (color) {
    baseClasses = baseClasses.replace(/text-foreground\/?\d*/g, "").replace(/text-muted-foreground/g, "")
    baseClasses = `${baseClasses} ${color}`.trim()
  }

  // Safely check for mobile property existence
  if (!includeResponsive || !('mobile' in config)) {
    return baseClasses
  }

  // Handle responsive classes with alignment
  const mobileClasses = `${config.mobile} ${alignmentClass}`
  const desktopClasses = baseClasses
    .split(" ")
    .map((cls) => `md:${cls}`)
    .join(" ")

  return `${mobileClasses} ${desktopClasses}`
}
