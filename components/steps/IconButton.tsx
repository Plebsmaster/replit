"use client"

interface Icon {
  id: string
  name: string
  path: string
}

interface IconButtonProps {
  icon: Icon
  isSelected: boolean
  onClick: () => void
}

export default function IconButton({ icon, isSelected, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: isSelected ? "3px solid #000" : "2px solid #E5E7EB",
        background: isSelected ? "#F3F4F6" : "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        fontSize: 12,
        fontWeight: 600,
        color: "#374151",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#9CA3AF"
          e.currentTarget.style.background = "#F9FAFB"
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#E5E7EB"
          e.currentTarget.style.background = "#fff"
        }
      }}
    >
      <div style={{ textAlign: "center" }}>
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ marginBottom: 4 }}>
          <path d={icon.path} />
        </svg>
        <div style={{ fontSize: 10, lineHeight: 1.2 }}>{icon.name}</div>
      </div>
    </button>
  )
}
