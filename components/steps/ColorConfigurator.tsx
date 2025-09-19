"use client"

import { useState, useEffect } from "react"
import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { getColorConfiguratorImages, getUserContext } from "@/lib/slide-content-config"

interface ColorConfiguratorProps {
  onBack: () => void
  onNext: () => void
  stepKey?: string // 'slide8' or 'slide18'
}

type ColorMode = 'kleur' | 'per_product'
type Color = 'Wit' | 'Grijs' | 'Groen' | 'Licht Blauw' | 'Donker Blauw' | 'Licht Roze' | 'Donker Roze' | 'Oranje'
type Product = 'shampoo' | 'conditioner' | 'mask' | 'oil' | 'serum'

const COLOR_OPTIONS: Color[] = ['Wit', 'Grijs', 'Groen', 'Licht Blauw', 'Donker Blauw', 'Licht Roze', 'Donker Roze', 'Oranje']
const PRODUCT_NAMES: Record<Product, string> = {
  shampoo: 'Shampoo',
  conditioner: 'Conditioner',
  mask: 'Mask',
  oil: 'Oil',
  serum: 'Serum'
}

// Color pairings for the "All Same Color" mode
const colorPairings: Record<string, Color[]> = {
  'Licht Blauw': ['Licht Blauw', 'Donker Roze'],
  'Donker Blauw': ['Donker Blauw', 'Licht Roze'],
  'Licht Roze': ['Licht Roze', 'Donker Blauw'],
  'Donker Roze': ['Donker Roze', 'Licht Blauw'],
  'Wit': ['Wit', 'Groen'],
  'Grijs': ['Grijs', 'Oranje'],
  'Groen': ['Groen', 'Wit'],
  'Oranje': ['Oranje', 'Grijs']
}

// Palette mapping
const paletteMapping: Record<string, Color[]> = {
  'Licht Blauw': ['Donker Blauw', 'Licht Blauw', 'Donker Roze', 'Licht Roze', 'Groen'],
  'Donker Blauw': ['Licht Blauw', 'Donker Blauw', 'Licht Roze', 'Donker Roze', 'Groen'],
  'Licht Roze': ['Donker Roze', 'Licht Roze', 'Donker Blauw', 'Licht Blauw', 'Oranje'],
  'Donker Roze': ['Licht Roze', 'Donker Roze', 'Licht Blauw', 'Donker Blauw', 'Oranje'],
  'Wit': ['Wit', 'Grijs', 'Groen', 'Licht Blauw', 'Donker Blauw'],
  'Grijs': ['Grijs', 'Wit', 'Oranje', 'Donker Roze', 'Licht Roze'],
  'Groen': ['Groen', 'Wit', 'Licht Blauw', 'Donker Blauw', 'Oranje'],
  'Oranje': ['Oranje', 'Grijs', 'Licht Roze', 'Donker Roze', 'Groen']
}

export default function ColorConfigurator({ onBack, onNext, stepKey }: ColorConfiguratorProps) {
  const { formData, updateFormData } = useWizard()
  const userContext = getUserContext(formData)
  const configImages = getColorConfiguratorImages(formData)
  
  // Determine if this is elegant or modern path
  const isElegantPath = userContext.style === 'elegant'
  
  const [colorMode, setColorMode] = useState<ColorMode>(formData.kleurVariatie || 'kleur')
  const [selectedColor, setSelectedColor] = useState<Color | null>((formData.kleur as Color) || null)
  const [productColors, setProductColors] = useState<Record<Product, Color>>(
    formData.productKleuren ? (formData.productKleuren as Record<Product, Color>) : {
      shampoo: 'Wit',
      conditioner: 'Wit', 
      mask: 'Wit',
      oil: 'Wit',
      serum: 'Wit'
    }
  )
  const [showWarning, setShowWarning] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>('shampoo')

  useEffect(() => {
    if (colorMode === 'kleur' && selectedColor) {
      const colors = colorPairings[selectedColor] || [selectedColor]
      const products: Product[] = ['shampoo', 'conditioner', 'mask', 'oil', 'serum']
      const newColors: Record<Product, Color> = {} as Record<Product, Color>
      
      products.forEach((product, index) => {
        newColors[product] = colors[index % colors.length]
      })
      
      setProductColors(newColors)
      updateFormData({ 
        kleurVariatie: 'kleur',
        kleur: selectedColor,
        productKleuren: newColors
      })
    } else if (colorMode === 'per_product') {
      updateFormData({ 
        kleurVariatie: 'per_product',
        productKleuren: productColors
      })
    }
  }, [colorMode, selectedColor, productColors, updateFormData])

  const handleColorModeChange = (mode: ColorMode) => {
    setColorMode(mode)
    setShowWarning(false)
    
    if (mode === 'kleur' && selectedColor) {
      const colors = colorPairings[selectedColor] || [selectedColor]
      const products: Product[] = ['shampoo', 'conditioner', 'mask', 'oil', 'serum']
      const newColors: Record<Product, Color> = {} as Record<Product, Color>
      
      products.forEach((product, index) => {
        newColors[product] = colors[index % colors.length]
      })
      
      setProductColors(newColors)
    }
  }

  const handleColorSelect = (color: Color) => {
    if (colorMode === 'kleur') {
      setSelectedColor(color)
      const colors = colorPairings[color] || [color]
      const products: Product[] = ['shampoo', 'conditioner', 'mask', 'oil', 'serum']
      const newColors: Record<Product, Color> = {} as Record<Product, Color>
      
      products.forEach((product, index) => {
        newColors[product] = colors[index % colors.length]
      })
      
      setProductColors(newColors)
      updateFormData({ 
        kleur: color,
        productKleuren: newColors
      })
    } else {
      const newProductColors = {
        ...productColors,
        [selectedProduct]: color
      }
      setProductColors(newProductColors)
      updateFormData({ 
        productKleuren: newProductColors
      })
    }
  }

  const handleContinue = () => {
    if (colorMode === 'kleur' && !selectedColor) {
      setShowWarning(true)
      return
    }
    onNext()
  }

  const availableColors = colorMode === 'per_product' && selectedColor 
    ? paletteMapping[selectedColor] || COLOR_OPTIONS
    : COLOR_OPTIONS

  return (
    <SlideContainer width="extraWide">
      <section>
        <h2 className={getTypographyClasses("title", { alignment: "left" })}>
          {isElegantPath ? "Elegante Kleurkeuze" : "Moderne Kleurkeuze"}
        </h2>

        <div className="max-w-[760px] space-y-4 mb-8">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Nu je een {isElegantPath ? 'elegant' : 'modern'} ontwerp hebt gekozen, is het tijd om de kleuren voor je producten te selecteren.
            Je kunt kiezen voor één kleurthema voor alle producten, of elk product een eigen kleur geven.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Options */}
          <div className="space-y-6">
            {/* Color Mode Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Kleurvariant Selectie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant={colorMode === 'kleur' ? "default" : "outline"}
                    onClick={() => handleColorModeChange('kleur')}
                    className="w-full justify-start"
                  >
                    Alles in één kleur
                  </Button>
                  <Button
                    variant={colorMode === 'per_product' ? "default" : "outline"}
                    onClick={() => handleColorModeChange('per_product')}
                    className="w-full justify-start"
                  >
                    Kleur per product
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product Selection (only for per-product mode) */}
            {colorMode === 'per_product' && (
              <Card>
                <CardHeader>
                  <CardTitle>Selecteer Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(PRODUCT_NAMES).map(([key, name]) => (
                      <Button
                        key={key}
                        variant={selectedProduct === key ? "default" : "outline"}
                        onClick={() => setSelectedProduct(key as Product)}
                        className="w-full"
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Color Palette */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {colorMode === 'kleur' ? 'Kies je kleur' : `Kies kleur voor ${PRODUCT_NAMES[selectedProduct]}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {availableColors.map((color) => (
                    <Button
                      key={color}
                      variant={
                        colorMode === 'kleur' 
                          ? selectedColor === color ? "default" : "outline"
                          : productColors[selectedProduct] === color ? "default" : "outline"
                      }
                      onClick={() => handleColorSelect(color)}
                      className="h-20 flex flex-col items-center justify-center text-xs"
                    >
                      <div 
                        className="w-12 h-12 rounded-full mb-1 border-2"
                        style={{ 
                          backgroundColor: getColorHex(color),
                          borderColor: color === 'Wit' ? '#e0e0e0' : 'transparent'
                        }}
                      />
                      <span>{color}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {showWarning && (
              <Card className="border-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <span>Selecteer eerst een kleur voordat je doorgaat.</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Productoverzicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(PRODUCT_NAMES).map(([key, name]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{name}</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full border-2"
                          style={{ 
                            backgroundColor: getColorHex(productColors[key as Product]),
                            borderColor: productColors[key as Product] === 'Wit' ? '#e0e0e0' : 'transparent'
                          }}
                        />
                        <span className="text-sm text-gray-600">{productColors[key as Product]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Kleurinformatie</h3>
              <p className="text-sm text-gray-600">
                {colorMode === 'kleur' 
                  ? "In de modus 'Alles in één kleur' worden je producten automatisch gekoppeld aan een kleurenpalet dat past bij je hoofdkleur."
                  : "In de modus 'Kleur per product' kun je voor elk product een eigen kleur kiezen uit een geselecteerd palet."
                }
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Vorige
          </Button>
          <Button onClick={handleContinue}>
            Volgende
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </SlideContainer>
  )
}

// Helper function to convert color names to hex values
function getColorHex(color: Color): string {
  const colorMap: Record<Color, string> = {
    'Wit': '#FFFFFF',
    'Grijs': '#808080',
    'Groen': '#4CAF50',
    'Licht Blauw': '#87CEEB',
    'Donker Blauw': '#1E3A8A',
    'Licht Roze': '#FFB6C1',
    'Donker Roze': '#C2185B',
    'Oranje': '#FF9800'
  }
  return colorMap[color] || '#FFFFFF'
}