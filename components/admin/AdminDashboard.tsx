"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Lock, Unlock, LogOut, RefreshCw, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface Submission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
  ingredients: any[]
  style: string
  text_color: string
  color_palette: string
  product_colors: any
  agree_terms: boolean
  subscribe_newsletter: boolean
  is_locked?: boolean
}

interface Client {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
  is_locked?: boolean
}

export function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const fetchData = async () => {
    setLoading(true)
    console.log("[v0] AdminDashboard: Starting data fetch")

    try {
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false })

      if (clientsError) {
        console.log("[v0] AdminDashboard: Clients fetch error:", clientsError.message)
        throw clientsError
      }

      const { data: submissionsData, error: submissionsError } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (submissionsError) {
        console.log("[v0] AdminDashboard: Submissions fetch error:", submissionsError.message)
        throw submissionsError
      }

      console.log(
        "[v0] AdminDashboard: Data fetched successfully - clients:",
        clientsData?.length,
        "submissions:",
        submissionsData?.length,
      )
      setClients(clientsData || [])
      setSubmissions(submissionsData || [])
    } catch (error) {
      console.error("[v0] AdminDashboard: Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    console.log("[v0] AdminDashboard: Logging out admin user")
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const toggleLockStatus = async (clientEmail: string, currentLockStatus: boolean) => {
    setActionLoading(clientEmail)
    try {
      const newLockStatus = !currentLockStatus

      const { error: clientError } = await supabase
        .from("clients")
        .update({ is_locked: newLockStatus })
        .eq("email", clientEmail)

      if (clientError) throw clientError

      const { error: submissionError } = await supabase
        .from("form_submissions")
        .update({ is_locked: newLockStatus })
        .eq("email", clientEmail)

      if (submissionError) throw submissionError

      await fetchData()
    } catch (error) {
      console.error("Error updating lock status:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const exportToCSV = () => {
    const csvData = submissions.map((submission) => {
      const client = clients.find((c) => c.email === submission.email)

      return {
        "Client ID": client?.id || "",
        "First Name": submission.first_name,
        "Last Name": submission.last_name,
        Email: submission.email,
        Phone: submission.phone,
        "Registration Date": client ? new Date(client.created_at).toLocaleDateString() : "",
        "Submission Date": new Date(submission.created_at).toLocaleDateString(),
        "Lock Status": submission.is_locked || client?.is_locked ? "Locked" : "Unlocked",
        Ingredients: submission.ingredients ? JSON.stringify(submission.ingredients) : "",
        Style: submission.style || "",
        "Text Color": submission.text_color || "",
        "Color Palette": submission.color_palette || "",
        "Product Colors": submission.product_colors ? JSON.stringify(submission.product_colors) : "",
        "Agrees to Terms": submission.agree_terms || false,
        "Newsletter Subscription": submission.subscribe_newsletter || false,
      }
    })

    const headers = Object.keys(csvData[0] || {})
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => headers.map((header) => `"${row[header as keyof typeof row]}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `salonid-all-clients-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportClientCSV = (clientEmail: string) => {
    const submission = submissions.find((s) => s.email === clientEmail)
    const client = clients.find((c) => c.email === clientEmail)

    if (!submission) return

    const csvData = [
      {
        "Client ID": client?.id || "",
        "First Name": submission.first_name,
        "Last Name": submission.last_name,
        Email: submission.email,
        Phone: submission.phone,
        "Registration Date": client ? new Date(client.created_at).toLocaleDateString() : "",
        "Submission Date": new Date(submission.created_at).toLocaleDateString(),
        "Lock Status": submission.is_locked || client?.is_locked ? "Locked" : "Unlocked",
        Ingredients: submission.ingredients ? JSON.stringify(submission.ingredients) : "",
        Style: submission.style || "",
        "Text Color": submission.text_color || "",
        "Color Palette": submission.color_palette || "",
        "Product Colors": submission.product_colors ? JSON.stringify(submission.product_colors) : "",
        "Agrees to Terms": submission.agree_terms || false,
        "Newsletter Subscription": submission.subscribe_newsletter || false,
      },
    ]

    const headers = Object.keys(csvData[0])
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => headers.map((header) => `"${row[header as keyof typeof row]}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `salonid-client-${submission.first_name}-${submission.last_name}-${new Date().toISOString().split("T")[0]}.csv`,
    )
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">SalonID Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/admin/manage")}
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <Users className="h-4 w-4" />
                Manage Admins
              </Button>
              <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export All CSV
              </Button>
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage client submissions and design responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locked Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  submissions.filter((s) => {
                    const client = clients.find((c) => c.email === s.email)
                    return s.is_locked || client?.is_locked
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Client Submissions</CardTitle>
            <CardDescription>View and manage all client registrations and design submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => {
                  const client = clients.find((c) => c.email === submission.email)
                  const isLocked = submission.is_locked || client?.is_locked || false

                  return (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.first_name} {submission.last_name}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.phone}</TableCell>
                      <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={isLocked ? "destructive" : "default"}>
                            {isLocked ? "Locked" : "Unlocked"}
                          </Badge>
                          {isLocked && <Lock className="h-4 w-4 text-destructive" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => exportClientCSV(submission.email)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Download className="h-3 w-3" />
                            CSV
                          </Button>
                          <Button
                            onClick={() => toggleLockStatus(submission.email, isLocked)}
                            disabled={actionLoading === submission.email}
                            variant={isLocked ? "outline" : "destructive"}
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            {actionLoading === submission.email ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : isLocked ? (
                              <Unlock className="h-3 w-3" />
                            ) : (
                              <Lock className="h-3 w-3" />
                            )}
                            {isLocked ? "Unlock" : "Lock"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
