import type { ReactNode } from "react"
import { SLIDE_WIDTHS, type SlideWidth } from "@/lib/slide-config"
import { cn } from "@/lib/utils"

interface SlideContainerProps {
  children: ReactNode
  width?: SlideWidth
  className?: string
}

export function SlideContainer({ children, width = "standard", className }: SlideContainerProps) {
  return <div className={cn(SLIDE_WIDTHS[width], className)}>{children}</div>
}
