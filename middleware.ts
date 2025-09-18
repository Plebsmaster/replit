import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  console.log("[v0] Middleware: Processing request for:", request.nextUrl.pathname)
  console.log("[v0] Middleware: Request URL:", request.url)
  console.log("[v0] Middleware: Request headers:", Object.fromEntries(request.headers.entries()))
  console.log(
    "[v0] Middleware: All cookies:",
    request.cookies.getAll().map((c) => `${c.name}=${c.value}`),
  )

  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("[v0] Middleware: Admin route detected, using Supabase auth")
    return await updateSession(request)
  }

  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("[v0] Middleware: Dashboard route detected, checking authentication")
    const clientId = request.cookies.get("sid_client")?.value
    console.log("[v0] Middleware: Client ID from cookie:", clientId ? `present (${clientId})` : "missing")

    if (!clientId) {
      console.log("[v0] Middleware: No session cookie, redirecting to home")
      // No session cookie, redirect to home
      return NextResponse.redirect(new URL("/", request.url))
    }

    try {
      console.log("[v0] Middleware: Creating Supabase service role client...")
      const supabase = createServiceRoleClient()
      console.log("[v0] Middleware: Looking up client with ID:", clientId)
      const { data: client, error } = await supabase.from("clients").select("id, email").eq("id", clientId).single()

      if (error || !client) {
        console.log("[v0] Middleware: Client lookup failed:", error?.message || "Client not found")
        throw new Error("Client not found")
      }

      console.log("[v0] Middleware: Client found:", client.email)
      // Add client info to headers for the dashboard to use
      const response = NextResponse.next()
      response.headers.set("x-client-id", client.id)
      response.headers.set("x-client-email", client.email)
      console.log("[v0] Middleware: Headers set, proceeding to dashboard")

      return response
    } catch (error) {
      console.error("[v0] Middleware: Session verification failed:", error)
      // Invalid session, clear cookie and redirect
      const response = NextResponse.redirect(new URL("/", request.url))
      response.cookies.delete("sid_client")
      console.log("[v0] Middleware: Cleared invalid session, redirecting to home")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin/:path*"],
}
