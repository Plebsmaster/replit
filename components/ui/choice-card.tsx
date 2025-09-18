"use client"

interface ChoiceCardProps {
  label: string
  imageSrc: string
  alt: string
  isSelected: boolean
  onClick: () => void
}

export function ChoiceCard({ label, imageSrc, alt, isSelected, onClick }: ChoiceCardProps) {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className={`relative rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
          isSelected ? "ring-4 ring-gray-900 ring-offset-2" : ""
        }`}
      >
        {isSelected && (
          <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg">
            <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black text-white text-sm font-bold px-4 py-2 rounded-lg">{label}</div>
        </div>

        <div className="aspect-[3/4] w-full">
          <img src={imageSrc || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
