"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, UserPlus, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AdminUser {
  id: string
  email: string
  created_at: string
  is_active: boolean
  created_by: string | null
}

export default function AdminManagePage() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [currentAdminEmail, setCurrentAdminEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchAdmins()
    getCurrentAdmin()
  }, [])

  const getCurrentAdmin = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.email) {
      setCurrentAdminEmail(user.email)
    }
  }

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/admin/list")
      if (!response.ok) throw new Error("Failed to fetch admins")
      const data = await response.json()
      setAdmins(data.admins)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch admins")
    }
  }

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newAdminEmail,
          currentAdminEmail,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create admin")
      }

      setSuccess(`Admin user created successfully for ${newAdminEmail}`)
      setNewAdminEmail("")
      fetchAdmins()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create admin")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Admin Management</h1>
            <p className="text-gray-600">Manage admin users and permissions</p>
          </div>
          <Button onClick={() => router.push("/admin/dashboard")} variant="outline" className="border-gray-300">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Create New Admin */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create New Admin
              </CardTitle>
              <CardDescription>
                Add a new admin user to the system. They will receive login credentials via email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createAdmin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    required
                    className="bg-stone-50 border-gray-300"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}
                <Button type="submit" disabled={isLoading} className="bg-black text-white hover:bg-gray-800">
                  {isLoading ? "Creating..." : "Create Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Admin Users List */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Admin Users ({admins.length})
              </CardTitle>
              <CardDescription>Current admin users with access to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-black">{admin.email}</p>
                        {admin.is_active ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Inactive
                          </Badge>
                        )}
                        {admin.email === currentAdminEmail && (
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Created {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {admin.email !== currentAdminEmail && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {admins.length === 0 && <p className="text-center text-gray-500 py-8">No admin users found</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
