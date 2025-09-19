"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChoiceCard } from "./choice-card"

interface CarouselItem {
  key: string
  label: string
  imageSrc: string
  alt?: string
}

interface ResponsiveCarouselProps {
  items: CarouselItem[]
  selectedItem: string | null
  onItemClick: (key: string) => void
  columns?: 1 | 2 | 3 | 4
}

export function ResponsiveCarousel({ 
  items, 
  selectedItem, 
  onItemClick,
  columns = 2 
}: ResponsiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to selected item
  useEffect(() => {
    if (selectedItem) {
      const selectedIndex = items.findIndex(item => item.key === selectedItem)
      if (selectedIndex !== -1) {
        setCurrentIndex(selectedIndex)
      }
    }
  }, [selectedItem, items])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const gridClass = columns === 2 
    ? "hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
    : columns === 3
    ? "hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
    : columns === 4
    ? "hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
    : "hidden md:grid md:grid-cols-1 gap-8 max-w-5xl mx-auto"

  return (
    <>
      {/* Desktop grid layout */}
      <div className={gridClass}>
        {items.map((item) => (
          <ChoiceCard
            key={item.key}
            label={item.label}
            imageSrc={item.imageSrc}
            alt={item.alt || `${item.label} mockup`}
            isSelected={selectedItem === item.key}
            onClick={() => onItemClick(item.key)}
          />
        ))}
      </div>

      {/* Mobile carousel layout */}
      <div className="md:hidden">
    <div className="relative w-full">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div 
              key={item.key} 
              className="w-full flex-shrink-0 px-4"
            >
              <div className="max-w-sm mx-auto">
                <ChoiceCard
                  label={item.label}
                  imageSrc={item.imageSrc}
                  alt={item.alt || `${item.label} mockup`}
                  isSelected={selectedItem === item.key}
                  onClick={() => onItemClick(item.key)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show on larger touch devices */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-lg transition-opacity ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white'
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentIndex === items.length - 1}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-lg transition-opacity ${
              currentIndex === items.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white'
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'w-8 bg-gray-900' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Position Indicator */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          {currentIndex + 1} van {items.length}
        </span>
      </div>
    </div>
      </div>
    </>
  )
}