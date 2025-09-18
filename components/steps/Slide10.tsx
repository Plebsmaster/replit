"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import { getTypographyClasses } from "@/lib/typography"
import IconButton from "./IconButton" // Assuming IconButton is in the same directory

interface Slide10Props {
  onBack: () => void
  onNext: () => void
}

export default function Slide10({ onBack, onNext }: Slide10Props) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const icons = [
    {
      id: "icon16",
      name: "Icoon 16",
      path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z",
    },
    {
      id: "icon17",
      name: "Icoon 17",
      path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z",
    },
    { id: "icon18", name: "Icoon 18", path: "M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" },
    {
      id: "icon19",
      name: "Icoon 19",
      path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
    },
    {
      id: "icon20",
      name: "Icoon 20",
      path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z",
    },
    {
      id: "icon21",
      name: "Icoon 21",
      path: "M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2Z",
    },
    {
      id: "icon22",
      name: "Icoon 22",
      path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z",
    },
    {
      id: "icon23",
      name: "Icoon 23",
      path: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z",
    },
  ]

  const handleIconSelect = (iconId: string) => {
    setSelectedIcon(iconId)
    try {
      localStorage.setItem("salonid:selectedIcon", iconId)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      console.log("localStorage not available")
    }
  }

  const handleNext = () => {
    if (selectedIcon) {
      onNext()
    }
  }

  return (
    <SlideContainer width="extraWide">
      <section className="text-center">
        {/* Avatar */}
        <div className="mt-5 mb-5">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className={getTypographyClasses("title", { alignment: "center" })}>Selecteer jouw icoon</h1>

        {/* Description */}
        <div className="max-w-[600px] mx-auto mb-10 space-y-3">
          <p className={getTypographyClasses("paragraph", { alignment: "center" })}>
            Nu je hebt gekozen om een icoon aan je ontwerp toe te voegen, is het tijd om het perfecte icoon te
            selecteren dat het beste bij jou past.
          </p>
          <p className={getTypographyClasses("paragraph", { alignment: "center" })}>
            Kies uit de onderstaande opties om je productlijn een extra visuele boost te geven en je merkidentiteit te
            versterken.
          </p>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-5 gap-6 max-w-[600px] mx-auto mb-10">
          {icons.slice(0, 5).map((icon) => (
            <IconButton
              key={icon.id}
              icon={icon}
              isSelected={selectedIcon === icon.id}
              onClick={() => handleIconSelect(icon.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-[360px] mx-auto mb-10">
          {icons.slice(5, 8).map((icon) => (
            <IconButton
              key={icon.id}
              icon={icon}
              isSelected={selectedIcon === icon.id}
              onClick={() => handleIconSelect(icon.id)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={handleNext}
            disabled={!selectedIcon}
            className={`px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2 ${
              selectedIcon ? "bg-black text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Doorgaan
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <p className={getTypographyClasses("cardDescription", { alignment: "center" })}>
            BEGIN YOUR TAILORED JOURNEY — UPLOAD YOUR LOGO OR EMBARK ON CREATING ONE.
          </p>
        </div>
      </section>
    </SlideContainer>
  )
}
