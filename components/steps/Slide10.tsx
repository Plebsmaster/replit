"use client"

import { useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
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
      <section style={{ textAlign: "center" }}>
        {/* Avatar */}
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto",
              background: "#E5E7EB",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "#8B5CF6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H7V11H9V15L11 18V22H13V18L15 15V11H17V9H21Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            margin: "0 0 16px",
            color: "#000",
          }}
        >
          Selecteer jouw icoon
        </h1>

        {/* Description */}
        <div style={{ maxWidth: 600, margin: "0 auto 40px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 16, lineHeight: 1.5 }}>
            Nu je hebt gekozen om een icoon aan je ontwerp toe te voegen, is het tijd om het perfecte icoon te
            selecteren dat het beste bij jou past.
          </p>
          <p style={{ margin: "0", fontSize: 16, lineHeight: 1.5 }}>
            Kies uit de onderstaande opties om je productlijn een extra visuele boost te geven en je merkidentiteit te
            versterken.
          </p>
        </div>

        {/* Icons Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 24,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          {icons.slice(0, 5).map((icon) => (
            <IconButton
              key={icon.id}
              icon={icon}
              isSelected={selectedIcon === icon.id}
              onClick={() => handleIconSelect(icon.id)}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            maxWidth: 360,
            margin: "0 auto 40px",
          }}
        >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <button
            onClick={handleNext}
            disabled={!selectedIcon}
            style={{
              background: selectedIcon ? "#000" : "#E5E7EB",
              color: selectedIcon ? "#fff" : "#9CA3AF",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              cursor: selectedIcon ? "pointer" : "not-allowed",
              fontWeight: 600,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Doorgaan
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: 16,
            fontSize: 12,
            color: "#6B7280",
          }}
        >
          BEGIN YOUR TAILORED JOURNEY — UPLOAD YOUR LOGO OR EMBARK ON CREATING ONE.
        </div>
      </section>
    </SlideContainer>
  )
}
