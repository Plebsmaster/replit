"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    setIsOnline(navigator.onLine)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showStatus && isOnline) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge
        variant={isOnline ? "default" : "destructive"}
        className={`transition-all duration-300 ${
          isOnline ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-3 h-3 mr-1" />
            Back online
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 mr-1" />
            No connection
          </>
        )}
      </Badge>
    </div>
  )
}
