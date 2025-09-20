"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import IconButton from "./IconButton"

interface Slide20Props {
  formData: any
  updateFormData: (updates: any) => void
  onBack: () => void
  onNext: () => void
}

export default function Slide20({ formData, updateFormData, onBack, onNext }: Slide20Props) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(formData.iconChoice || null)

  const icons = [
    {
      id: "icon16",
      name: "Icoon 1",
      path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z",
    },
    {
      id: "icon17",
      name: "Icoon 2",
      path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z",
    },
    { id: "icon18", name: "Icoon 3", path: "M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" },
    {
      id: "icon19",
      name: "Icoon 4",
      path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
    },
    {
      id: "icon20",
      name: "Icoon 5",
      path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z",
    },
    {
      id: "icon21",
      name: "Icoon 6",
      path: "M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2Z",
    },
    {
      id: "icon22",
      name: "Icoon 7",
      path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z",
    },
    {
      id: "icon23",
      name: "Icoon 8",
      path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z",
    },
    {
      id: "icon24",
      name: "Icoon 9",
      path: "M12,2L2,7V12C2,16.5 4.23,20.68 7.62,23.15L12,26L16.38,23.15C19.77,20.68 22,16.5 22,12V7L12,2Z",
    },
    {
      id: "icon25",
      name: "Icoon 10",
      path: "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V22H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z",
    },
    {
      id: "icon26",
      name: "Icoon 11",
      path: "M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16C9,17.1 9.9,18 11,18V19.93Z",
    },
    {
      id: "icon27",
      name: "Icoon 12",
      path: "M12,2L1,21H23L12,2M12,6L19.53,19H4.47L12,6M11,10V14H13V10H11M11,16V18H13V16H11Z",
    },
    {
      id: "icon28",
      name: "Icoon 13",
      path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12L4.04,12.5L16.5,4.04C15.08,3.37 13.58,3 12,3Z",
    },
    {
      id: "icon29",
      name: "Icoon 14",
      path: "M12,2L2,12L12,22L22,12L12,2M12,5.8L18.2,12L12,18.2L5.8,12L12,5.8Z",
    },
    {
      id: "icon30",
      name: "Icoon 15",
      path: "M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z",
    },
  ]

  const handleIconSelect = (iconId: string) => {
    setSelectedIcon(iconId)
    updateFormData({ iconChoice: iconId })
    try {
      localStorage.setItem("salonid:selectedIcon", iconId)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
    // Auto-advance to next slide (slide21)
    queueMicrotask(() => {
      onNext()
    })
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