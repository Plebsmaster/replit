import { CheckCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusMessageProps {
  type: "success" | "error" | "info"
  message: string
  className?: string
}

export function StatusMessage({ type, message, className }: StatusMessageProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconColor: "text-green-600"
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      textColor: "text-red-700", 
      iconColor: "text-red-600"
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      iconColor: "text-blue-600"
    }
  }

  const { icon: Icon, bgColor, textColor, iconColor } = config[type]

  return (
    <div className={cn(
      "flex items-center gap-2 p-4 rounded-lg",
      bgColor,
      textColor,
      className
    )}>
      <Icon className={cn("w-5 h-5", iconColor)} />
      <span>{message}</span>
    </div>
  )
}