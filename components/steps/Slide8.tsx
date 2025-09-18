"use client"

import { useState, useRef } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { useFormData } from "@/contexts/FormDataContext"

// Interfaces voor datastructuur
interface Color {
  code: string
  name: string
  hex: string
}
interface Product {
  id: string
  name: string
}
type ColorMode = "variation" | "uniform"

// Interface voor de props
interface Slide8Props {
  onBack: () => void
  onNext: () => void
}

const pairings: Record<string, string> = {
  "repair-conditioner": "repair-shampoo",
  "color-conditioner": "color-shampoo",
  "no-yellow-conditioner": "no-yellow-shampoo",
  "curly-conditioner": "curly-shampoo",
  "sulfaatvrij-conditioner": "sulfaatvrij-shampoo",
}
const paletteMapping = {
  "signature-intense": "elevated-classics",
  "dynamic-deep": "vibrant-bold",
  "earthen-rich": "organic-warm",
  "prestige-dark": "modern-luxury",
  "classic-light": "elevated-classics",
  "vibrant-pop": "vibrant-bold",
  "natural-soft": "organic-warm",
  "luxe-glow": "modern-luxury",
}

export default function Slide8({ onBack, onNext }: Slide8Props) {
  // === STATE MANAGEMENT ===
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null)
  const [productColors, setProductColors] = useState<any>({})
  const [variationColors, setVariationColors] = useState<any>({})
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [colorMode, setColorMode] = useState<ColorMode>("variation")
  const pickerRef = useRef<HTMLDivElement | null>(null)

  const { formData, updateFormData } = useFormData()

  // === DATA DEFINITIONS ===
  const whiteTextPalettes = {
    "elevated-classics": {
      name: "Signature Intense",
      colors: [
        { code: "PANTONE 316 C", name: "Rich Teal", hex: "#00A0B0" },
        { code: "PANTONE 303 C", name: "Lighter Teal", hex: "#4ECDC4" },
        { code: "PANTONE 188 C", name: "Classic Red", hex: "#C8102E" },
        { code: "PANTONE 187 C", name: "Bright Red", hex: "#A6192E" },
        { code: "PANTONE 2695 C", name: "Deep Violet", hex: "#663399" },
        { code: "PANTONE 2685 C", name: "Violet", hex: "#8A2BE2" },
        { code: "PANTONE 476 C", name: "Copper Brown", hex: "#B87333" },
        { code: "PANTONE 7589 C", name: "Bronze", hex: "#CD7F32" },
        { code: "PANTONE 282 C", name: "Classic Navy", hex: "#002F5F" },
        { code: "PANTONE 288 C", name: "Royal Blue", hex: "#4169E1" },
        { code: "PANTONE 440 C", name: "Steel Green", hex: "#4F7942" },
        { code: "PANTONE 431 C", name: "Slate Gray", hex: "#5D5D5D" },
        { code: "PANTONE 432 C", name: "Charcoal", hex: "#414141" },
      ],
    },
    "vibrant-bold": {
      name: "Dynamic Deep",
      colors: [
        { code: "PANTONE 3292 C", name: "Deep Aqua", hex: "#00B5CC" },
        { code: "PANTONE 3282 C", name: "Aqua", hex: "#00CED1" },
        { code: "PANTONE 235 C", name: "Deep Berry", hex: "#C21807" },
        { code: "PANTONE 234 C", name: "Berry", hex: "#E91E63" },
        { code: "PANTONE 2607 C", name: "Vibrant Purple", hex: "#8B008B" },
        { code: "PANTONE 2597 C", name: "Bright Purple", hex: "#9932CC" },
        { code: "PANTONE 174 C", name: "Vibrant Orange", hex: "#FF6600" },
        { code: "PANTONE 173 C", name: "Orange", hex: "#FF7F00" },
        { code: "PANTONE 3015 C", name: "Ocean Blue", hex: "#0077BE" },
        { code: "PANTONE 3005 C", name: "Bright Blue", hex: "#0080FF" },
        { code: "PANTONE 296 C", name: "Deep Navy", hex: "#003366" },
        { code: "PANTONE 187 C", name: "Bright Red", hex: "#A6192E" },
      ],
    },
    "organic-warm": {
      name: "Earthen Rich",
      colors: [
        { code: "PANTONE 448 C", name: "Dark Olive", hex: "#6B5B73" },
        { code: "PANTONE 7764 C", name: "Olive", hex: "#808000" },
        { code: "PANTONE 7623 C", name: "Terracotta", hex: "#E2725B" },
        { code: "PANTONE 7595 C", name: "Spice", hex: "#D2691E" },
        { code: "PANTONE 5115 C", name: "Aubergine", hex: "#614051" },
        { code: "PANTONE 5125 C", name: "Plum", hex: "#8E4585" },
        { code: "PANTONE 4975 C", name: "Dark Chocolate", hex: "#7B3F00" },
        { code: "PANTONE 1817 C", name: "Sienna", hex: "#A0522D" },
        { code: "PANTONE 357 C", name: "Forest Green", hex: "#355E3B" },
        { code: "PANTONE 349 C", name: "Rich Green", hex: "#00A86B" },
        { code: "PANTONE 476 C", name: "Copper Brown", hex: "#B87333" },
      ],
    },
    "modern-luxury": {
      name: "Prestige Dark",
      colors: [
        { code: "PANTONE 5467 C", name: "Slate Green", hex: "#708090" },
        { code: "PANTONE 5477 C", name: "Muted Slate", hex: "#6A5ACD" },
        { code: "PANTONE 209 C", name: "Wine Red", hex: "#722F37" },
        { code: "PANTONE 208 C", name: "Muted Wine", hex: "#8B1538" },
        { code: "PANTONE 2767 C", name: "Midnight Blue", hex: "#191970" },
        { code: "PANTONE 534 C", name: "Indigo Gray", hex: "#4B0082" },
        { code: "PANTONE Warm Gray 11 C", name: "Dark Taupe", hex: "#8B7D6B" },
        { code: "PANTONE Warm Gray 10 C", name: "Taupe", hex: "#A0958A" },
        { code: "PANTONE 432 C", name: "Charcoal Gray", hex: "#414141" },
        { code: "PANTONE 431 C", name: "Slate Gray", hex: "#5D5D5D" },
        { code: "PANTONE Black 6 C", name: "Matte Black", hex: "#1C1C1C" },
        { code: "PANTONE Cool Gray 11 C", name: "Gunmetal", hex: "#36454F" },
      ],
    },
  }
  const blackTextPalettes = {
    "elevated-classics": {
      name: "Classic Light",
      colors: [
        { code: "PANTONE 3375 C", name: "Aqua Mint", hex: "#7FFFD4" },
        { code: "PANTONE 9443 C", name: "Pale Mint", hex: "#F0FFF0" },
        { code: "PANTONE 692 C", name: "Soft Pink", hex: "#FFB6C1" },
        { code: "PANTONE 9260 C", name: "Pale Pink", hex: "#FADADD" },
        { code: "PANTONE 652 C", name: "Cool Lilac", hex: "#E6E6FA" },
        { code: "PANTONE 651 C", name: "Pale Lilac", hex: "#DDA0DD" },
        { code: "PANTONE 7502 C", name: "Warm Sand", hex: "#F5DEB3" },
        { code: "PANTONE 9163 C", name: "Ivory", hex: "#FFFFF0" },
        { code: "PANTONE 5513 C", name: "Sky Blue", hex: "#87CEEB" },
        { code: "PANTONE 5523 C", name: "Pale Blue", hex: "#B0E0E6" },
        { code: "PANTONE Cool Gray 5 C", name: "Classic Gray", hex: "#D3D3D3" },
        { code: "PANTONE Cool Gray 3 C", name: "Light Gray", hex: "#E5E5E5" },
        { code: "PANTONE 7527 C", name: "Clean Stone", hex: "#F8F8FF" },
      ],
    },
    "vibrant-bold": {
      name: "Vibrant Pop",
      colors: [
        { code: "PANTONE 375 C", name: "Lime Green", hex: "#32CD32" },
        { code: "PANTONE 373 C", name: "Pale Lime", hex: "#90EE90" },
        { code: "PANTONE 219 C", name: "Hot Pink", hex: "#FF69B4" },
        { code: "PANTONE 218 C", name: "Bright Pink", hex: "#FF1493" },
        { code: "PANTONE 2655 C", name: "Bright Lavender", hex: "#E0B0FF" },
        { code: "PANTONE 2582 C", name: "Lavender", hex: "#E6E6FA" },
        { code: "PANTONE 137 C", name: "Golden Yellow", hex: "#FFD700" },
        { code: "PANTONE 1205 C", name: "Pale Yellow", hex: "#FFFFE0" },
        { code: "PANTONE 306 C", name: "Vibrant Aqua", hex: "#00FFFF" },
        { code: "PANTONE 3105 C", name: "Light Aqua", hex: "#AFEEEE" },
        { code: "PANTONE 291 C", name: "Ice Blue", hex: "#B0E0E6" },
        { code: "PANTONE 1777 C", name: "Coral Pink", hex: "#FF7F50" },
        { code: "PANTONE 108 C", name: "Bright Yellow", hex: "#FFFF00" },
      ],
    },
    "organic-warm": {
      name: "Natural Soft",
      colors: [
        { code: "PANTONE 5773 C", name: "Sage Green", hex: "#9CAF88" },
        { code: "PANTONE 5793 C", name: "Pale Sage", hex: "#C8D5B9" },
        { code: "PANTONE 7514 C", name: "Warm Peach", hex: "#FFDAB9" },
        { code: "PANTONE 7506 C", name: "Light Peach", hex: "#FFEBCD" },
        { code: "PANTONE 245 C", name: "Warm Lilac", hex: "#E6E6FA" },
        { code: "PANTONE 243 C", name: "Pale Warm Lilac", hex: "#F0E6FF" },
        { code: "PANTONE 157 C", name: "Terracotta", hex: "#DEB887" },
        { code: "PANTONE 155 C", name: "Light Terracotta", hex: "#F5DEB3" },
        { code: "PANTONE 5855 C", name: "Soft Olive", hex: "#BDB76B" },
        { code: "PANTONE 5875 C", name: "Pale Olive", hex: "#EEE8AA" },
      ],
    },
    "modern-luxury": {
      name: "Luxe Glow",
      colors: [
        { code: "PANTONE 9161 C", name: "Champagne", hex: "#F7E7CE" },
        { code: "PANTONE 9160 C", name: "Light Champagne", hex: "#FFF8DC" },
        { code: "PANTONE 488 C", name: "Rose Gold Sim.", hex: "#E8B4B8" },
        { code: "PANTONE 9282 C", name: "Pale Rose Gold", hex: "#F5E6E8" },
        { code: "PANTONE Warm Gray 3 C", name: "Warm Taupe", hex: "#E5D5C8" },
        { code: "PANTONE Warm Gray 1 C", name: "Light Taupe", hex: "#F0E6D2" },
        { code: "PANTONE 9020 C", name: "Pale Gold Sim.", hex: "#FFF8DC" },
        { code: "PANTONE 9060 C", name: "Lighter Gold/Ivory", hex: "#FFFACD" },
        { code: "PANTONE 7527 C", name: "Clean Stone", hex: "#F8F8FF" },
        { code: "White**", name: "Minimalist White", hex: "#FFFFFF" },
        { code: "PANTONE 7535 C", name: "Warm Stone Gray", hex: "#F5F5DC" },
      ],
    },
  }
  const allColorPalettes: Record<string, { name: string; colors: Color[] }> = {
    "signature-intense": whiteTextPalettes["elevated-classics"],
    "dynamic-deep": whiteTextPalettes["vibrant-bold"],
    "earthen-rich": whiteTextPalettes["organic-warm"],
    "prestige-dark": whiteTextPalettes["modern-luxury"],
    "classic-light": blackTextPalettes["elevated-classics"],
    "vibrant-pop": blackTextPalettes["vibrant-bold"],
    "natural-soft": blackTextPalettes["organic-warm"],
    "luxe-glow": blackTextPalettes["modern-luxury"],
  }
  const whiteTextDefaults = {
    "elevated-classics": {
      "repair-shampoo": "PANTONE 316 C",
      "repair-conditioner": "PANTONE 303 C",
      "color-shampoo": "PANTONE 188 C",
      "color-conditioner": "PANTONE 187 C",
      "no-yellow-shampoo": "PANTONE 2695 C",
      "no-yellow-conditioner": "PANTONE 2685 C",
      "curly-shampoo": "PANTONE 476 C",
      "curly-conditioner": "PANTONE 7589 C",
      "sulfaatvrij-shampoo": "PANTONE 282 C",
      "sulfaatvrij-conditioner": "PANTONE 288 C",
      "men-shampoo": "PANTONE 440 C",
      hairspray: "PANTONE 431 C",
      "volume-mousse": "PANTONE 288 C",
      "dry-shampoo": "PANTONE 2685 C",
      "volume-gel": "PANTONE 303 C",
      "fiber-paste": "PANTONE 432 C",
      "texture-paste": "PANTONE 282 C",
      "control-cream": "PANTONE 187 C",
    },
    "vibrant-bold": {
      "repair-shampoo": "PANTONE 3292 C",
      "repair-conditioner": "PANTONE 3282 C",
      "color-shampoo": "PANTONE 235 C",
      "color-conditioner": "PANTONE 234 C",
      "no-yellow-shampoo": "PANTONE 2607 C",
      "no-yellow-conditioner": "PANTONE 2597 C",
      "curly-shampoo": "PANTONE 174 C",
      "curly-conditioner": "PANTONE 173 C",
      "sulfaatvrij-shampoo": "PANTONE 3015 C",
      "sulfaatvrij-conditioner": "PANTONE 3005 C",
      "men-shampoo": "PANTONE 296 C",
      hairspray: "PANTONE 187 C",
      "volume-mousse": "PANTONE 3005 C",
      "dry-shampoo": "PANTONE 3282 C",
      "volume-gel": "PANTONE 234 C",
      "fiber-paste": "PANTONE 174 C",
      "texture-paste": "PANTONE 2607 C",
      "control-cream": "PANTONE 3015 C",
    },
    "organic-warm": {
      "repair-shampoo": "PANTONE 448 C",
      "repair-conditioner": "PANTONE 7764 C",
      "color-shampoo": "PANTONE 7623 C",
      "color-conditioner": "PANTONE 7595 C",
      "no-yellow-shampoo": "PANTONE 5115 C",
      "no-yellow-conditioner": "PANTONE 5125 C",
      "curly-shampoo": "PANTONE 4975 C",
      "curly-conditioner": "PANTONE 1817 C",
      "sulfaatvrij-shampoo": "PANTONE 357 C",
      "sulfaatvrij-conditioner": "PANTONE 349 C",
      "men-shampoo": "PANTONE 4975 C",
      hairspray: "PANTONE 1817 C",
      "volume-mousse": "PANTONE 7595 C",
      "dry-shampoo": "PANTONE 7764 C",
      "volume-gel": "PANTONE 349 C",
      "fiber-paste": "PANTONE 476 C",
      "texture-paste": "PANTONE 448 C",
      "control-cream": "PANTONE 7623 C",
    },
    "modern-luxury": {
      "repair-shampoo": "PANTONE 5467 C",
      "repair-conditioner": "PANTONE 5477 C",
      "color-shampoo": "PANTONE 209 C",
      "color-conditioner": "PANTONE 208 C",
      "no-yellow-shampoo": "PANTONE 2767 C",
      "no-yellow-conditioner": "PANTONE 534 C",
      "curly-shampoo": "PANTONE Warm Gray 11 C",
      "curly-conditioner": "PANTONE Warm Gray 10 C",
      "sulfaatvrij-shampoo": "PANTONE 432 C",
      "sulfaatvrij-conditioner": "PANTONE 431 C",
      "men-shampoo": "PANTONE Black 6 C",
      hairspray: "PANTONE Black 6 C",
      "volume-mousse": "PANTONE Warm Gray 10 C",
      "dry-shampoo": "PANTONE 432 C",
      "volume-gel": "PANTONE 5477 C",
      "fiber-paste": "PANTONE Cool Gray 11 C",
      "texture-paste": "PANTONE Black 6 C",
      "control-cream": "PANTONE 209 C",
    },
  }
  const blackTextDefaults = {
    "elevated-classics": {
      "repair-shampoo": "PANTONE 3375 C",
      "repair-conditioner": "PANTONE 9443 C",
      "color-shampoo": "PANTONE 692 C",
      "color-conditioner": "PANTONE 9260 C",
      "no-yellow-shampoo": "PANTONE 652 C",
      "no-yellow-conditioner": "PANTONE 651 C",
      "curly-shampoo": "PANTONE 7502 C",
      "curly-conditioner": "PANTONE 9163 C",
      "sulfaatvrij-shampoo": "PANTONE 5513 C",
      "sulfaatvrij-conditioner": "PANTONE 5523 C",
      "men-shampoo": "PANTONE Cool Gray 5 C",
      hairspray: "PANTONE Cool Gray 3 C",
      "volume-mousse": "PANTONE 5513 C",
      "dry-shampoo": "PANTONE 651 C",
      "volume-gel": "PANTONE 3375 C",
      "fiber-paste": "PANTONE Cool Gray 5 C",
      "texture-paste": "PANTONE 7527 C",
      "control-cream": "PANTONE 692 C",
    },
    "vibrant-bold": {
      "repair-shampoo": "PANTONE 375 C",
      "repair-conditioner": "PANTONE 373 C",
      "color-shampoo": "PANTONE 219 C",
      "color-conditioner": "PANTONE 218 C",
      "no-yellow-shampoo": "PANTONE 2655 C",
      "no-yellow-conditioner": "PANTONE 2582 C",
      "curly-shampoo": "PANTONE 137 C",
      "curly-conditioner": "PANTONE 1205 C",
      "sulfaatvrij-shampoo": "PANTONE 306 C",
      "sulfaatvrij-conditioner": "PANTONE 3105 C",
      "men-shampoo": "PANTONE 291 C",
      hairspray: "PANTONE 1777 C",
      "volume-mousse": "PANTONE 306 C",
      "dry-shampoo": "PANTONE 108 C",
      "volume-gel": "PANTONE 375 C",
      "fiber-paste": "PANTONE 137 C",
      "texture-paste": "PANTONE 2655 C",
      "control-cream": "PANTONE 218 C",
    },
    "organic-warm": {
      "repair-shampoo": "PANTONE 5773 C",
      "repair-conditioner": "PANTONE 5793 C",
      "color-shampoo": "PANTONE 7514 C",
      "color-conditioner": "PANTONE 7506 C",
      "no-yellow-shampoo": "PANTONE 245 C",
      "no-yellow-conditioner": "PANTONE 243 C",
      "curly-shampoo": "PANTONE 157 C",
      "curly-conditioner": "PANTONE 155 C",
      "sulfaatvrij-shampoo": "PANTONE 5855 C",
      "sulfaatvrij-conditioner": "PANTONE 5875 C",
      "men-shampoo": "PANTONE 7502 C",
      hairspray: "PANTONE 157 C",
      "volume-mousse": "PANTONE 7514 C",
      "dry-shampoo": "PANTONE 5793 C",
      "volume-gel": "PANTONE 5773 C",
      "fiber-paste": "PANTONE 7502 C",
      "texture-paste": "PANTONE 155 C",
      "control-cream": "PANTONE 5855 C",
    },
    "modern-luxury": {
      "repair-shampoo": "PANTONE 9161 C",
      "repair-conditioner": "PANTONE 9160 C",
      "color-shampoo": "PANTONE 488 C",
      "color-conditioner": "PANTONE 9282 C",
      "no-yellow-shampoo": "PANTONE Warm Gray 3 C",
      "no-yellow-conditioner": "PANTONE Warm Gray 1 C",
      "curly-shampoo": "PANTONE 9020 C",
      "curly-conditioner": "PANTONE 9060 C",
      "sulfaatvrij-shampoo": "PANTONE 7527 C",
      "sulfaatvrij-conditioner": "White**",
      "men-shampoo": "PANTONE 7535 C",
      hairspray: "White**",
      "volume-mousse": "PANTONE Warm Gray 1 C",
      "dry-shampoo": "PANTONE 9161 C",
      "volume-gel": "PANTONE 7527 C",
      "fiber-paste": "PANTONE 9020 C",
      "texture-paste": "PANTONE Warm Gray 3 C",
      "control-cream": "PANTONE 488 C",
    },
  }
  const productCategories: { name: string; products: Product[] }[] = [
    {
      name: "Shampoo",
      products: [
        { id: "repair-shampoo", name: "Repair Shampoo" },
        { id: "color-shampoo", name: "Color Shampoo" },
        { id: "no-yellow-shampoo", name: "No Yellow Shampoo" },
        { id: "curly-shampoo", name: "Curly Shampoo" },
        { id: "sulfaatvrij-shampoo", name: "Sulfaatvrij Shampoo" },
        { id: "men-shampoo", name: "Men Shampoo" },
      ],
    },
    {
      name: "Conditioner / Mask",
      products: [
        { id: "repair-conditioner", name: "Repair Conditioner / Mask" },
        { id: "color-conditioner", name: "Color Conditioner / Mask" },
        { id: "no-yellow-conditioner", name: "No Yellow Conditioner / Mask" },
        { id: "curly-conditioner", name: "Curly Conditioner / Mask" },
        { id: "sulfaatvrij-conditioner", name: "Sulfaatvrij Conditioner / Mask" },
      ],
    },
    {
      name: "Styling Aerosol",
      products: [
        { id: "hairspray", name: "Hairspray" },
        { id: "volume-mousse", name: "Volume Mousse" },
        { id: "dry-shampoo", name: "Dry Shampoo" },
      ],
    },
    {
      name: "Styling",
      products: [
        { id: "volume-gel", name: "Volume Gel" },
        { id: "fiber-paste", name: "Fiber Paste" },
        { id: "texture-paste", name: "Texture Paste" },
        { id: "control-cream", name: "Control Cream" },
      ],
    },
  ]

  // === HELPER FUNCTIES ===
  const getProductColor = (productId: string): Color | null => {
    const colorCode = productColors[productId]
    if (!colorCode) return null
    for (const palette of Object.values(allColorPalettes)) {
      const color = palette.colors.find((c) => c.code === colorCode)
      if (color) return color
    }
    return null
  }

  const syncUniformColors = (currentColors: any) => {
    const syncedColors = { ...currentColors }
    Object.entries(pairings).forEach(([conditionerId, shampooId]) => {
      if (syncedColors[shampooId]) {
        syncedColors[conditionerId] = syncedColors[shampooId]
      }
    })
    return syncedColors
  }

  // === HANDLERS ===
  const handlePaletteSelect = (paletteId: string) => {
    console.log("[v0] Palette selected:", paletteId)
    setSelectedPalette(paletteId)
    setExpandedProduct(null)

    const mappingKey = paletteMapping[paletteId as keyof typeof paletteMapping]
    if (!mappingKey) {
      console.error("Geen mapping gevonden voor palet:", paletteId)
      return
    }
    const isLightPalette = ["classic-light", "vibrant-pop", "natural-soft", "luxe-glow"].includes(paletteId)
    const defaults = isLightPalette
      ? blackTextDefaults[mappingKey as keyof typeof blackTextDefaults]
      : whiteTextDefaults[mappingKey as keyof typeof whiteTextDefaults]

    if (defaults) {
      let finalDefaults = { ...defaults }
      if (colorMode === "uniform") {
        finalDefaults = syncUniformColors(finalDefaults)
      }
      // Set both states to the new palette's defaults
      setProductColors(finalDefaults)
      setVariationColors(defaults) // Store the clean, original variation

      console.log("[v0] Updating form data with both colorPalette and productColors:", paletteId)
      updateFormData({
        colorPalette: paletteId,
        productColors: finalDefaults,
      })
    } else {
      console.error("Geen defaults gevonden voor mapping key:", mappingKey)
      setProductColors({})
      setVariationColors({})
      updateFormData({
        colorPalette: paletteId,
        productColors: {},
      })
    }
  }

  const handleColorModeChange = (mode: ColorMode) => {
    if (mode === colorMode) return
    setColorMode(mode)
    setExpandedProduct(null)

    if (mode === "uniform") {
      // 1. Save the current colors as the 'variation' snapshot
      setVariationColors(productColors)
      // 2. Apply the uniform logic to the displayed colors
      setProductColors((currentColors) => syncUniformColors(currentColors))
    } else {
      // Switching back to 'variation'
      // 1. Restore the displayed colors from our snapshot
      setProductColors(variationColors)
    }
  }

  const handleProductClick = (productId: string) => {
    const isLocked = colorMode === "uniform" && pairings.hasOwnProperty(productId)
    if (isLocked) return
    setExpandedProduct((current) => (current === productId ? null : productId))
  }

  const handleColorChange = (productId: string, colorCode: string) => {
    const newProductColors = { ...productColors, [productId]: colorCode }

    if (colorMode === "uniform") {
      const correspondingConditioner = Object.keys(pairings).find((key) => pairings[key] === productId)
      if (correspondingConditioner) {
        newProductColors[correspondingConditioner] = colorCode
      }
    }

    // Set the displayed colors
    setProductColors(newProductColors)

    updateFormData({ productColors: newProductColors })

    // If we are in variation mode, we MUST also update our snapshot.
    if (colorMode === "variation") {
      setVariationColors(newProductColors)
    }

    setExpandedProduct(null)
  }

  // === RENDER FUNCTIES ===
  const ColorPicker = ({ productId }: { productId: string }) => {
    if (!selectedPalette) return null
    const availableColors = allColorPalettes[selectedPalette]?.colors || []
    const productName = productCategories.flatMap((cat) => cat.products).find((p) => p.id === productId)?.name || ""
    const useDarkText = ["classic-light", "vibrant-pop", "natural-soft", "luxe-glow"].includes(selectedPalette!)

    return (
      <div className="p-4 sm:p-5 bg-white rounded-xl shadow-2xl border border-gray-200 z-20">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
            Kies een kleur voor <span className="font-bold">{productName}</span>
          </h4>
          <button
            onClick={() => setExpandedProduct(null)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Sluiten"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availableColors.map((color) => {
            const isSelected = productColors[productId] === color.code
            const textColor = useDarkText ? "text-gray-800" : "text-white"
            return (
              <button
                key={color.code}
                onClick={() => handleColorChange(productId, color.code)}
                className={`relative flex flex-col justify-center items-center p-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 min-h-[80px] ${isSelected ? "border-gray-800 ring-2 ring-gray-800 ring-offset-1 shadow-lg" : "border-gray-200 hover:border-gray-400"}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                <span className={`font-medium text-sm text-center ${textColor}`}>{color.name}</span>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div
                      className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${textColor === "text-gray-800" ? "border-gray-800" : "border-white"}`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${textColor === "text-gray-800" ? "bg-gray-800" : "bg-white"}`}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <SlideContainer width="ultraWide">
      <section>
        {/* --- STAP 1: KIES EEN KLEURENPALET --- */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </span>
            <h2 className="font-semibold text-base leading-tight mb-1">Kies een Kleurenpalet</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(allColorPalettes).map(([paletteId, palette]) => {
              const isSelected = selectedPalette === paletteId
              const isLightPalette = ["classic-light", "vibrant-pop", "natural-soft", "luxe-glow"].includes(paletteId)
              return (
                <div
                  key={paletteId}
                  onClick={() => handlePaletteSelect(paletteId)}
                  className={`relative p-6 rounded-xl border cursor-pointer transition-all ${isSelected ? (isLightPalette ? "bg-white border-gray-900 ring-2 ring-gray-900" : "bg-gray-900 border-gray-900 text-white") : "bg-white border-gray-200 text-gray-800 hover:border-gray-400"}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-base leading-tight mb-1">{palette.name}</h3>
                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-current">
                        <div className="w-3 h-3 rounded-full bg-current"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      {palette.colors.slice(0, 5).map((c) => (
                        <div
                          key={c.hex}
                          className="w-7 h-7 rounded border"
                          style={{
                            backgroundColor: c.hex,
                            borderColor: isSelected ? (isLightPalette ? "#000" : "#4b5563") : "#f3f4f6",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className={`py-1 px-3 rounded-full text-sm leading-tight ${isLightPalette ? "bg-gray-100 text-gray-800" : "bg-white text-gray-800"}`}
                    >
                      {isLightPalette ? "Zwarte tekst" : "Witte tekst"}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* --- STAP 2: PAS PRODUCTEN AAN --- */}
        {selectedPalette && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <h2 className="font-semibold text-base leading-tight mb-1">Pas Producten aan (Optioneel)</h2>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
                <button
                  onClick={() => handleColorModeChange("variation")}
                  className={`px-4 py-1.5 text-sm leading-tight rounded-full ${colorMode === "variation" ? "bg-white text-black shadow" : "text-gray-500"}`}
                >
                  Variatie
                </button>
                <button
                  onClick={() => handleColorModeChange("uniform")}
                  className={`px-4 py-1.5 text-sm leading-tight rounded-full ${colorMode === "uniform" ? "bg-white text-black shadow" : "text-gray-500"}`}
                >
                  Uniform
                </button>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-700 rounded-lg p-4 text-center mb-8 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm leading-tight">
                {colorMode === "variation"
                  ? "Standaardkleuren zijn toegepast. Klik op een product als je de kleur wilt wijzigen."
                  : "Standaardkleuren zijn toegepast. In Uniform modus nemen conditioners de kleur van de shampoo over (vergrendeld)."}
              </p>
            </div>

            {productCategories.map((category) => (
              <div key={category.name} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="uppercase tracking-wider text-sm leading-tight"> {category.name}</h3>
                  <span className={`bg-gray-200 text-gray-600 text-sm leading-tight px-2 py-0.5 rounded-full`}>
                    {category.products.length} PRODUCTEN
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {category.products.map((product) => {
                    const color = getProductColor(product.id)
                    const isLocked = colorMode === "uniform" && pairings.hasOwnProperty(product.id)
                    const isWhiteTextPalette = [
                      "signature-intense",
                      "dynamic-deep",
                      "earthen-rich",
                      "prestige-dark",
                    ].includes(selectedPalette!)

                    const textColorClass = isWhiteTextPalette ? "text-white" : "text-black"
                    const gearIconColorClass = isWhiteTextPalette ? "text-black" : "text-white"
                    const gearCircleColorClass = isWhiteTextPalette ? "bg-white" : "bg-black"
                    const lockIconColorClass = isWhiteTextPalette ? "text-black" : "text-white"
                    const lockCircleColorClass = isWhiteTextPalette ? "bg-white" : "bg-black"

                    return (
                      <div key={product.id} className="relative">
                        <div
                          onClick={() => handleProductClick(product.id)}
                          className={`min-h-[180px] w-full rounded-xl flex items-center justify-center p-5 shadow-lg transition-all transform relative ${
                            isLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:scale-105"
                          }`}
                          style={{ backgroundColor: color?.hex || "#e5e7eb" }}
                        >
                          <div className="absolute top-3 right-3">
                            {isLocked ? (
                              <div className={`p-1.5 rounded-full ${lockCircleColorClass}`}>
                                <svg
                                  className={`w-4 h-4 ${lockIconColorClass}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className={`p-1.5 rounded-full ${gearCircleColorClass}`}>
                                <svg
                                  className={`w-4 h-4 ${gearIconColorClass}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372-.836 2.942.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          <div className="text-center">
                            <h4 className={`font-semibold text-base leading-tight mb-1 ${textColorClass}`}>
                              {product.name}
                            </h4>
                            <p className={`text-sm leading-tight ${textColorClass}`}>{color?.name || "Geen kleur"}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {expandedProduct && category.products.some((p) => p.id === expandedProduct) && (
                  <div className="mt-6 col-span-full" ref={pickerRef}>
                    <ColorPicker productId={expandedProduct} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </SlideContainer>
  )
}
