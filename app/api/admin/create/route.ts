import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email, currentAdminEmail } = await request.json()

    if (!email || !currentAdminEmail) {
      return NextResponse.json({ error: "Email and current admin email are required" }, { status: 400 })
    }

    const supabase = createServiceRoleClient()

    // Verify current admin exists
    const { data: currentAdmin, error: currentAdminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", currentAdminEmail)
      .eq("is_active", true)
      .single()

    if (currentAdminError || !currentAdmin) {
      return NextResponse.json({ error: "Unauthorized: Current admin not found" }, { status: 403 })
    }

    // Create new admin user record
    const { data: newAdmin, error: adminError } = await supabase
      .from("admin_users")
      .insert({
        email,
        created_by: currentAdmin.id,
      })
      .select()
      .single()

    if (adminError) {
      if (adminError.code === "23505") {
        return NextResponse.json({ error: "Admin user already exists" }, { status: 409 })
      }
      throw adminError
    }

    // Create Supabase auth user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        role: "admin",
      },
    })

    if (authError) {
      // Rollback admin_users record if auth creation fails
      await supabase.from("admin_users").delete().eq("id", newAdmin.id)
      throw authError
    }

    return NextResponse.json({
      message: "Admin user created successfully",
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        auth_id: authUser.user.id,
      },
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create admin user" },
      { status: 500 },
    )
  }
}
