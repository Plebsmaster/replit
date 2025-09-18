"use client"

import Image from "next/image"

interface ChoiceCardProps {
  label: string
  imgSrc: string
  onChoose: () => void
}

export default function ChoiceCard({ label, imgSrc, onChoose }: ChoiceCardProps) {
  return (
    <div
      style={{
        background: "#FBFAF9",
        border: "1px solid #D9D4CF",
        borderRadius: 14,
        padding: 10,
      }}
    >
      <button
        onClick={onChoose}
        aria-label={`Kies ${label}`}
        style={{
          width: "100%",
          display: "inline-block",
          background: "#000",
          color: "#fff",
          fontSize: 12,
          fontWeight: 800,
          padding: "10px 14px",
          borderRadius: 6,
          marginBottom: 10,
          cursor: "pointer",
          border: "none",
        }}
      >
        {label}
      </button>

      <button
        onClick={onChoose}
        aria-label={`Kies ${label}`}
        style={{
          width: "100%",
          height: 520,
          borderRadius: 12,
          overflow: "hidden",
          background: "#EEE",
          border: "none",
          cursor: "pointer",
          display: "block",
        }}
      >
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={`${label} mockup`}
          width={900}
          height={1200}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          priority
        />
      </button>
    </div>
  )
}
