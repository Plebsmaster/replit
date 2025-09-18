"use client"

import Image from "next/image"

interface ColorCardProps {
  title: string
  imageSrc: string
  onClick: () => void
}

export default function ColorCard({ title, imageSrc, onClick }: ColorCardProps) {
  return (
    <div
      style={{
        background: "#FBFAF9",
        border: "1px solid #D9D4CF",
        borderRadius: 14,
        padding: 20,
        cursor: "pointer",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          margin: "0 0 16px",
          color: "#000",
        }}
      >
        {title}
      </h3>

      {/* Image */}
      <div
        style={{
          width: "100%",
          height: 300,
          borderRadius: 12,
          overflow: "hidden",
          background: "#EEE",
          position: "relative",
          marginBottom: 16,
        }}
      >
        <Image
          src={imageSrc || "/placeholder.svg?height=300&width=300"}
          alt={`${title} color option`}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* Button */}
      <button
        style={{
          width: "100%",
          background: "#000",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          padding: "12px 20px",
          borderRadius: 8,
          cursor: "pointer",
          border: "none",
        }}
      >
        Kies {title}
      </button>
    </div>
  )
}
