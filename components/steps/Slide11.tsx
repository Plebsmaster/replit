"use client"

import { useMemo } from "react"
import { SlideContainer } from "@/components/ui/slide-container"
import Card from "./Card" // Import Card component

type Props = {
  onBack: () => void
  onNext: (selectedStyle?: string) => void
}

export default function Slide11({ onBack, onNext }: Props) {
  const items = useMemo(
    () => [
      { key: "Modern 1.", label: "Modern 1", src: "/img/modern/m1.jpg" },
      { key: "Modern 2.", label: "Modern 2", src: "/img/modern/m2.jpg" },
      { key: "Modern 3.", label: "Modern 3", src: "/img/modern/m3.jpg" },
      { key: "Modern 4.", label: "Modern 4", src: "/img/modern/m4.jpg" },
      { key: "Modern 5.", label: "Modern 5", src: "/img/modern/m5.jpg" },
      { key: "Modern 6.", label: "Modern 6", src: "/img/modern/m6.jpg" },
    ],
    [],
  )

  const handleChoose = (key: string, label: string) => {
    try {
      localStorage.setItem("salonid:styleChoice", key)
      localStorage.setItem("salonid:dateISO", new Date().toISOString())
    } catch {}

    // Geef de gekozen style door aan de parent component
    onNext(key)
  }

  return (
    <SlideContainer width="extraWide">
      <section>
        {/* Title */}
        <h2 style={{ fontSize: 28, fontWeight: 900, margin: "8px 0 10px", textAlign: "center" }}>
          Kies jouw moderne stijl
        </h2>

        {/* Intro copy */}
        <div style={{ maxWidth: 760, margin: "0 auto 24px", textAlign: "center", opacity: 0.9 }}>
          <p style={{ margin: 0 }}>
            Je hebt gekozen voor een frisse en eigentijdse uitstraling met strakke lijnen en een minimalistisch design.
            Dit ontwerp straalt moderniteit en innovatie uit.
          </p>
          <p style={{ margin: "8px 0 0" }}>
            Maak nu een keuze uit de onderstaande selectie. Indien een stijl meerdere varianten heeft, kun je na deze
            keuze de specifieke variant selecteren die het beste aansluit bij jouw visie.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 22,
            alignItems: "start",
            margin: "0 auto",
            maxWidth: 900,
          }}
        >
          {items.map((it) => (
            <Card
              key={it.key}
              label={it.label}
              src={it.src}
              onClick={() => handleChoose(it.key, it.label)}
              fullRow={false} // No fullRow needed since we have 6 items (even number)
            />
          ))}
        </div>
      </section>
    </SlideContainer>
  )
}
