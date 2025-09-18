export const STEP_DEFINITIONS = [
  { id: 0, title: "Welkom", component: "welcome", required: false },
  { id: 1, title: "E-mail", component: "email", required: true },
  { id: 2, title: "Gegevens", component: "name-phone", required: true },
  { id: 3, title: "Verificatie", component: "otp", required: true },
  { id: 4, title: "Stijl Selectie", component: "style-selection", required: true },
  { id: 5, title: "Elegante Stijlen", component: "elegant-styles", required: false },
  { id: 6, title: "Elegante Variant 1", component: "elegant-variant-1", required: false },
  { id: 7, title: "Elegante Variant 2", component: "elegant-variant-2", required: false },
  { id: 8, title: "Kleur Selectie (2)", component: "color-selection-2", required: true },
  { id: 9, title: "Kleur Selectie (3)", component: "color-selection-3", required: true },
  { id: 10, title: "Kleur Palet", component: "color-palette", required: true },
  { id: 11, title: "Icoon Keuze", component: "icon-choice", required: true },
  { id: 12, title: "Icoon Selectie", component: "icon-selection", required: false },
  { id: 13, title: "Moderne Stijlen", component: "modern-styles", required: false },
  { id: 14, title: "Modern 1 Variant", component: "modern-1-variant", required: false },
  { id: 15, title: "Modern 2 Variant", component: "modern-2-variant", required: false },
  { id: 16, title: "Modern 3 Variant", component: "modern-3-variant", required: false },
  { id: 17, title: "Modern 6 Variant", component: "modern-6-variant", required: false },
  { id: 30, title: "Ingrediënten", component: "ingredients", required: true },
  { id: 55, title: "Dashboard", component: "dashboard-login", required: false },
] as const

export type StepId = typeof STEP_DEFINITIONS[number]['id']
export type StepComponent = typeof STEP_DEFINITIONS[number]['component']

export const getStepById = (id: StepId) => {
  return STEP_DEFINITIONS.find(step => step.id === id)
}

export const getRequiredSteps = () => {
  return STEP_DEFINITIONS.filter(step => step.required)
}