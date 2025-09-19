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
}

export default function Slide10({ formData, updateFormData, onBack, onNext }: Slide10Props) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(formData.iconSelection || null)

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
    // Add more icons to demonstrate the scrolling functionality
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
  ]

  const handleIconSelect = (iconId: string) => {
    setSelectedIcon(iconId)
    updateFormData({ iconSelection: iconId })
    try {
      localStorage.setItem("salonid:selectedIcon", iconId)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch (error) {
      // localStorage not available, continue silently
    }
  }

  const handleContinue = () => {
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

        {/* Desktop Icons Grid - 4 columns */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
          {icons.map((icon) => (
            <IconButton
              key={icon.id}
              icon={icon}
              isSelected={selectedIcon === icon.id}
              onClick={() => handleIconSelect(icon.id)}
            />
          ))}
        </div>

        {/* Mobile Icons - Horizontal Scrolling */}
        <div className="md:hidden mb-10">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 px-4 w-max">
              {icons.map((icon) => (
                <div key={icon.id} className="flex-shrink-0">
                  <IconButton
                    icon={icon}
                    isSelected={selectedIcon === icon.id}
                    onClick={() => handleIconSelect(icon.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Scroll Indicator */}
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">← Veeg om meer iconen te zien →</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleContinue}
            disabled={!selectedIcon}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors text-base font-medium"
          >
            Doorgaan
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
