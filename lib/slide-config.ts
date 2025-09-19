export const SLIDE_WIDTHS = {
  narrow: "max-w-md mx-auto px-4 sm:px-6", // 448px - Forms, simple content
  standard: "max-w-2xl mx-auto px-4 sm:px-6", // 672px - Most slides
  wide: "max-w-4xl mx-auto px-4 sm:px-6", // 896px - Image grids, choices
  ultraWide: "max-w-5xl mx-auto px-4 sm:px-6", // 1024px - Spacious layouts
  extraWide: "max-w-6xl mx-auto px-4 sm:px-6", // 1152px - Complex layouts
  superWide: "max-w-7xl mx-auto px-4 sm:px-6", // 1280px - Very complex layouts with many elements
} as const

export type SlideWidth = keyof typeof SLIDE_WIDTHS

// Content section widths for nested containers
export const CONTENT_WIDTHS = {
  narrow: "max-w-sm mx-auto", // 384px
  standard: "max-w-xl mx-auto", // 576px
  wide: "max-w-3xl mx-auto", // 768px
  extraWide: "max-w-5xl mx-auto", // 1024px
  superWide: "max-w-6xl mx-auto", // 1152px
} as const

export type ContentWidth = keyof typeof CONTENT_WIDTHS
