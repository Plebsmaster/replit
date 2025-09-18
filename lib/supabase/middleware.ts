import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { createServiceRoleClient } from "./server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login" && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login" && user) {
    console.log("[v0] Admin middleware: Verifying admin status for user:", user.email)

    try {
      const serviceSupabase = createServiceRoleClient()
      const { data: adminUser, error } = await serviceSupabase
        .from("admin_users")
        .select("id, email, is_active")
        .eq("email", user.email)
        .eq("is_active", true)
        .single()

      console.log("[v0] Admin middleware: Admin lookup result:", { adminUser, error: error?.message })

      if (error || !adminUser) {
        console.log("[v0] Admin middleware: User is not an admin, redirecting to login")
        // User is authenticated but not an admin, redirect to login
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
      }

      console.log("[v0] Admin middleware: Admin verified successfully")
      // Add admin info to headers for use in admin pages
      supabaseResponse.headers.set("x-admin-id", adminUser.id)
      supabaseResponse.headers.set("x-admin-email", adminUser.email)
    } catch (error) {
      console.error("[v0] Admin middleware: Admin verification failed:", error)
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
