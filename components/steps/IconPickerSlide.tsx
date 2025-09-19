"use client"

import { useState } from "react"
import { useWizard } from "@/lib/form/wizard-context"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import IconButton from "./IconButton"
import { getIconSet, navigationConfig } from "@/lib/slide-content-config"

interface IconPickerSlideProps {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
  goToStep?: (stepId: string) => void
  stepKey?: string // 'slide10' or 'slide20'
}

export default function IconPickerSlide({ 
  formData, 
  updateFormData, 
  onBack, 
  onNext,
  goToStep,
  stepKey 
}: IconPickerSlideProps) {
  // Determine which slide this is from the wizard context or props
  const actualStepKey = stepKey || 'slide10' // Default for backwards compatibility
  
  // Get the appropriate icon set based on user's path
  const icons = getIconSet(formData)
  
  // Determine field name based on which slide this is  
  const fieldName = actualStepKey === 'slide10' ? 'iconSelection' : 'icoonSelection'
  
  const [selectedIcon, setSelectedIcon] = useState<string | null>(formData[fieldName] || null)

  const handleIconSelect = (iconId: string) => {
    setSelectedIcon(iconId)
    
    // Find the icon name for database storage
    const icon = icons.find(i => i.id === iconId)
    const dbValue = icon?.name || iconId
    
    // Update form data
    updateFormData({ [fieldName]: dbValue })
    
    // Store in localStorage for resilience
    try {
      localStorage.setItem(`salonid:${fieldName}`, iconId)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    
    // Auto-advance to next slide
    queueMicrotask(() => {
      if (goToStep) {
        // Both slide10 and slide20 go to slide21
        goToStep('slide21')
      } else {
        onNext()
      }
    })
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h1 className={getTypographyClasses("title", { alignment: "left" })}>
          Selecteer jouw icoon
        </h1>

        {/* Description */}
        <div className="max-w-[760px] space-y-3 mb-10">
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Nu je hebt gekozen om een icoon aan je ontwerp toe te voegen, is het tijd om het perfecte icoon te
            selecteren dat het beste bij jou past.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "left" })}>
            Kies uit de onderstaande opties om je productlijn een extra visuele boost te geven en je merkidentiteit te
            versterken.
          </p>
        </div>

        {/* Desktop Icons - Elegant staggered grid layout */}
        <div className="hidden md:block">
          <div className="max-w-6xl mx-auto">
            {/* First row - show first 5 icons or fewer if less available */}
            {icons.length > 0 && (
              <div className="flex justify-center gap-6 mb-6">
                {icons.slice(0, Math.min(5, icons.length)).map((icon) => (
                  <div key={icon.id} className="transform hover:scale-110 transition-transform">
                    <IconButton
                      icon={icon}
                      isSelected={selectedIcon === icon.id}
                      onClick={() => handleIconSelect(icon.id)}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Second row - show next 5 icons if available */}
            {icons.length > 5 && (
              <div className="flex justify-center gap-6 mb-6">
                {icons.slice(5, Math.min(10, icons.length)).map((icon) => (
                  <div key={icon.id} className="transform hover:scale-110 transition-transform">
                    <IconButton
                      icon={icon}
                      isSelected={selectedIcon === icon.id}
                      onClick={() => handleIconSelect(icon.id)}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Third row - show remaining icons if available */}
            {icons.length > 10 && (
              <div className="flex justify-center gap-6">
                {icons.slice(10, Math.min(15, icons.length)).map((icon) => (
                  <div key={icon.id} className="transform hover:scale-110 transition-transform">
                    <IconButton
                      icon={icon}
                      isSelected={selectedIcon === icon.id}
                      onClick={() => handleIconSelect(icon.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Icons - Swipeable cards in rows */}
        <div className="md:hidden">
          <div className="space-y-4">
            {/* Group icons in rows of 3 for mobile */}
            {[0, 3, 6, 9, 12].map((startIdx) => {
              const rowIcons = icons.slice(startIdx, startIdx + 3)
              if (rowIcons.length === 0) return null
              
              return (
                <div key={startIdx} className="overflow-x-auto">
                  <div className="flex gap-3 px-4 pb-2">
                    {rowIcons.map((icon) => (
                      <div key={icon.id} className="flex-shrink-0">
                        <div className="transform active:scale-95 transition-transform">
                          <IconButton
                            icon={icon}
                            isSelected={selectedIcon === icon.id}
                            onClick={() => handleIconSelect(icon.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Mobile hint */}
          <p className="text-center mt-4 text-sm text-gray-500">
            Tik om een icoon te selecteren
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}