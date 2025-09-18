import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SalonID Design - Your dream, Your brand",
  description: "Create custom salon product designs with SalonID",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <ConnectionStatus />
            {children}
          </Suspense>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
