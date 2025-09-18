"use client"

import Image from "next/image"

interface CardProps {
  label: string
  src: string
  onClick: () => void
  fullRow?: boolean
}

export default function Card({ label, src, onClick, fullRow = false }: CardProps) {
  return (
    <div
      style={{
        gridColumn: fullRow ? "1 / -1" : "auto",
        maxWidth: fullRow ? 440 : "auto",
        margin: fullRow ? "0 auto" : "0",
      }}
    >
      <div
        style={{
          background: "#FBFAF9",
          border: "1px solid #D9D4CF",
          borderRadius: 14,
          padding: 10,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {/* Button */}
        <button
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

        {/* Image */}
        <div
          style={{
            width: "100%",
            height: 520,
            borderRadius: 12,
            overflow: "hidden",
            background: "#EEE",
            position: "relative",
          }}
        >
          <Image
            src={src || "/placeholder.svg?height=520&width=400"}
            alt={`${label} mockup`}
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
        </div>
      </div>
    </div>
  )
}
