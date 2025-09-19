"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import IconButton from "./IconButton"

interface Slide10Props {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
  goToStep?: (stepId: string) => void
}

export default function Slide10({ formData, updateFormData, onBack, onNext, goToStep }: Slide10Props) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(formData.iconSelection || null)

  const answers = [
    { text: 'Icoon 16', nextSlide: 'slide21', dbValue: 'Icoon 16', id: "icon16", name: "Icoon 16", path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" },
    { text: 'Icoon 17', nextSlide: 'slide21', dbValue: 'Icoon 17', id: "icon17", name: "Icoon 17", path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" },
    { text: 'Icoon 18', nextSlide: 'slide21', dbValue: 'Icoon 18', id: "icon18", name: "Icoon 18", path: "M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" },
    { text: 'Icoon 19', nextSlide: 'slide21', dbValue: 'Icoon 19', id: "icon19", name: "Icoon 19", path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" },
    { text: 'Icoon 20', nextSlide: 'slide21', dbValue: 'Icoon 20', id: "icon20", name: "Icoon 20", path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" },
    { text: 'Icoon 21', nextSlide: 'slide21', dbValue: 'Icoon 21', id: "icon21", name: "Icoon 21", path: "M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2Z" },
    { text: 'Icoon 22', nextSlide: 'slide21', dbValue: 'Icoon 22', id: "icon22", name: "Icoon 22", path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" },
    { text: 'Icoon 23', nextSlide: 'slide21', dbValue: 'Icoon 23', id: "icon23", name: "Icoon 23", path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" }
  ]

  // Map to the icon objects for the UI
  const icons = answers.map(answer => ({
    id: answer.id,
    name: answer.name,
    path: answer.path
  }))

  const handleAnswer = (answer: any) => {
    setSelectedIcon(answer.id)
    // Store database value in 'Icoon' column
    updateFormData({ iconSelection: answer.dbValue })
    
    try {
      localStorage.setItem("salonid:selectedIcon", answer.id)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    
    // Navigate to specified slide
    if (goToStep) {
      queueMicrotask(() => {
        goToStep(answer.nextSlide)
      })
    }
  }

  const handleIconSelect = (iconId: string) => {
    const answer = answers.find(a => a.id === iconId)
    if (answer) {
      handleAnswer(answer)
    }
  }


  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h1 className={getTypographyClasses("title", { alignment: "left" })}>Selecteer jouw icoon</h1>

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
            {/* First row - 5 icons */}
            <div className="flex justify-center gap-6 mb-6">
              {icons.slice(0, 5).map((icon) => (
                <div key={icon.id} className="transform hover:scale-110 transition-transform">
                  <IconButton
                    icon={icon}
                    isSelected={selectedIcon === icon.id}
                    onClick={() => handleIconSelect(icon.id)}
                  />
                </div>
              ))}
            </div>
            {/* Second row - 5 icons */}
            <div className="flex justify-center gap-6 mb-6">
              {icons.slice(5, 10).map((icon) => (
                <div key={icon.id} className="transform hover:scale-110 transition-transform">
                  <IconButton
                    icon={icon}
                    isSelected={selectedIcon === icon.id}
                    onClick={() => handleIconSelect(icon.id)}
                  />
                </div>
              ))}
            </div>
            {/* Third row - 5 icons */}
            <div className="flex justify-center gap-6">
              {icons.slice(10, 15).map((icon) => (
                <div key={icon.id} className="transform hover:scale-110 transition-transform">
                  <IconButton
                    icon={icon}
                    isSelected={selectedIcon === icon.id}
                    onClick={() => handleIconSelect(icon.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Icons - Swipeable cards in rows */}
        <div className="md:hidden">
          <div className="space-y-4">
            {/* Group icons in rows of 3 for mobile */}
            {[0, 3, 6, 9, 12].map((startIdx) => (
              <div key={startIdx} className="overflow-x-auto">
                <div className="flex gap-3 px-4 pb-2">
                  {icons.slice(startIdx, startIdx + 3).map((icon) => (
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
            ))}
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
