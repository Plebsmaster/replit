export const STEPS = [
  { id: 0, title: "Welkom", component: "welcome" },
  { id: 1, title: "Gegevens", component: "client-details" },
  { id: 2, title: "Verificatie", component: "otp" },
  { id: 3, title: "Ingrediënten", component: "ingredients" },
  { id: 4, title: "Stijl", component: "style" },
  { id: 5, title: "Kleuren", component: "colors" },
] as const

export const COUNTRY_CODES = [
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
] as const

export const STYLE_OPTIONS = {
  elegant: "Elegant",
  modern: "Modern",
} as const

export const TEXT_COLOR_OPTIONS = {
  white: "Witte tekst",
  black: "Zwarte tekst",
} as const
