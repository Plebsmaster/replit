"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Leaf,
  Lock,
  CheckCircle,
  Eye,
  LogOut,
  Plus,
  Settings,
  User,
  BarChart3,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface Submission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  style: string | null
  text_color: string | null
  color_palette: string | null
  color_mode: string | null
  ingredients: string[]
  product_colors: Record<string, string>
  is_active: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
}

interface ClientData {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface DesignResponse {
  id: string
  status: string
  created_at: string
  updated_at: string
  data: any
}

export default function ClientDashboard() {
  const [clientData, setClientData] = useState<ClientData | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [designResponse, setDesignResponse] = useState<DesignResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        console.log("[v0] Dashboard: Fetching client data...")
        const response = await fetch("/api/client/me")
        console.log("[v0] Dashboard: /api/client/me response status:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Dashboard: Client data received:", data)
          setClientData(data.client)
          await fetchSubmissions(data.client.email)
          await fetchDesignResponse(data.client.id)
        } else {
          const errorText = await response.text()
          console.log("[v0] Dashboard: /api/client/me failed with:", errorText)
          console.log("[v0] Dashboard: Redirecting to home due to failed client fetch")
          window.location.href = "/"
        }
      } catch (error) {
        console.error("[v0] Dashboard: Failed to fetch client data:", error)
        console.log("[v0] Dashboard: Redirecting to home due to fetch error")
        window.location.href = "/"
      } finally {
        setLoading(false)
      }
    }

    fetchClientData()
  }, [])

  const fetchSubmissions = async (email: string) => {
    try {
      console.log("[v0] Dashboard: Fetching submissions for:", email)
      const response = await fetch(`/api/submit-form?email=${encodeURIComponent(email)}`)
      const result = await response.json()
      console.log("[v0] Dashboard: API response:", result)

      if (result.success && result.data) {
        const { client, currentDesign, isLocked, hasFormSubmission, hasDesignResponse } = result.data

        if (currentDesign) {
          const submissionData = {
            id: client.id,
            first_name: client.first_name,
            last_name: client.last_name,
            email: client.email,
            phone: client.phone,
            style: currentDesign.style,
            text_color: currentDesign.text_color,
            color_palette: currentDesign.color_palette,
            color_mode: currentDesign.color_mode,
            ingredients: Array.isArray(currentDesign.ingredients) ? currentDesign.ingredients : [],
            product_colors: currentDesign.product_colors || {},
            is_active: true,
            is_locked: isLocked,
            created_at: client.created_at,
            updated_at: result.data.lastUpdated || client.created_at,
          }
          setSubmissions([submissionData])
          console.log("[v0] Dashboard: Set submission data:", submissionData)
        } else {
          setSubmissions([])
          if (hasFormSubmission) {
            setError("Je ontwerp wordt verwerkt...")
          } else {
            setError("Nog geen ontwerpen gevonden")
          }
        }
      } else {
        console.log("[v0] Dashboard: API call failed:", result.message)
        setError(result.message || "Er is een fout opgetreden")
      }
    } catch (err) {
      console.error("[v0] Error fetching submissions:", err)
      setError("Kan geen verbinding maken met de server")
    }
  }

  const fetchDesignResponse = async (clientId: string) => {
    try {
      const response = await fetch(`/api/design-response?clientId=${encodeURIComponent(clientId)}`)
      const result = await response.json()

      if (result.success && result.data) {
        setDesignResponse(result.data)
      }
    } catch (err) {
      console.error("Failed to fetch design response:", err)
    }
  }

  const handleStartOver = async () => {
    if (!clientData) return

    if (!confirm("Weet je zeker dat je opnieuw wilt beginnen? Dit zal je huidige ontwerp overschrijven.")) {
      return
    }

    try {
      document.cookie = "sid_client=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      const response = await fetch("/api/clear-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: clientData.email }),
      })

      const result = await response.json()

      if (result.success) {
        window.location.href = "/"
      } else {
        setError(result.message || "Kon niet opnieuw beginnen")
      }
    } catch (err) {
      setError("Er is een fout opgetreden")
    }
  }

  const handleReviewDesign = () => {
    if (!currentSubmission) return

    // For now, show a modal or alert with design details
    // In the future, this could open a detailed design preview
    alert(
      `Design Details:\n\nStyle: ${getStyleLabel(currentSubmission.style)}\nText Color: ${getTextColorLabel(currentSubmission.text_color)}\nIngredients: ${currentSubmission.ingredients.length} selected\nColor Palette: ${currentSubmission.color_palette || "Not selected"}\n\nThis feature will be enhanced to show a detailed design preview.`,
    )
  }

  const handleLogout = async () => {
    try {
      document.cookie = "sid_client=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Logout error:", error)
      window.location.href = "/"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStyleLabel = (style: string | null) => {
    switch (style) {
      case "elegant":
        return "Elegant"
      case "modern":
        return "Modern"
      default:
        return "Niet geselecteerd"
    }
  }

  const getTextColorLabel = (textColor: string | null) => {
    switch (textColor) {
      case "white":
        return "Witte tekst"
      case "black":
        return "Zwarte tekst"
      default:
        return "Niet geselecteerd"
    }
  }

  const getDesignStatus = () => {
    if (currentSubmission?.is_locked) {
      return "locked"
    }

    const hasSubmissions = Array.isArray(submissions) && submissions.length > 0
    const hasActiveSubmission = Array.isArray(submissions) && submissions.some((s) => s.is_active)

    if (hasSubmissions && hasActiveSubmission) {
      return "completed"
    }

    // Check if there's form submission data but no processed design yet
    if (error === "Je ontwerp wordt verwerkt...") {
      return "processing"
    }

    return "in_progress"
  }

  const currentSubmission =
    Array.isArray(submissions) && submissions.length > 0 ? submissions.find((s) => s.is_active) || submissions[0] : null

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!clientData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Session expired</p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const designStatus = getDesignStatus()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">SalonID</h2>
                <p className="text-xs text-muted-foreground">Design Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sidebar-foreground transition-colors cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </nav>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-card-foreground truncate">{clientData.firstName}</p>
                <p className="text-xs text-muted-foreground truncate">{clientData.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {clientData.firstName}!</h1>
            <p className="text-muted-foreground">Check your design status and manage your submission</p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">Your Current Design</CardTitle>
            </CardHeader>
            <CardContent>
              {currentSubmission ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">Summary</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Palette className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">Style</p>
                            <p className="text-sm text-muted-foreground">{getStyleLabel(currentSubmission.style)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">Text Color</p>
                            <p className="text-sm text-muted-foreground">
                              {getTextColorLabel(currentSubmission.text_color)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">Ingredients</p>
                            <p className="text-sm text-muted-foreground">
                              {currentSubmission.ingredients.length} selected
                            </p>
                          </div>
                        </div>
                        {currentSubmission.color_palette && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                              <div
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: currentSubmission.color_palette }}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-card-foreground">Color Palette</p>
                              <p className="text-sm text-muted-foreground">Custom selected</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">Design Status</h3>
                    <div className="flex items-center gap-3">
                      {designStatus === "locked" && (
                        <>
                          <Lock className="w-5 h-5 text-destructive" />
                          <Badge variant="destructive">Locked</Badge>
                          <p className="text-muted-foreground">
                            Your design has been locked by the admin. Contact support if you need to make changes.
                          </p>
                        </>
                      )}
                      {designStatus === "completed" && (
                        <>
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <Badge className="bg-primary/10 text-primary border-primary/20">Completed</Badge>
                          <p className="text-muted-foreground">All questions are answered and ready for review.</p>
                        </>
                      )}
                      {designStatus === "processing" && (
                        <>
                          <RefreshCw className="w-5 h-5 text-black animate-spin" />
                          <Badge variant="secondary" className="bg-gray-50 text-black border-gray-300">
                            Processing
                          </Badge>
                          <p className="text-muted-foreground">
                            Your design has been submitted and is being processed.
                          </p>
                        </>
                      )}
                      {designStatus === "in_progress" && (
                        <>
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <Badge variant="secondary">In Progress</Badge>
                          <p className="text-muted-foreground">Your design questionnaire is not yet complete.</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    {designStatus === "locked" && (
                      <div className="bg-muted px-4 py-2 rounded-lg">
                        <p className="text-sm text-muted-foreground font-medium">Design is locked by admin</p>
                      </div>
                    )}

                    {designStatus === "completed" && (
                      <>
                        <Button
                          onClick={handleReviewDesign}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Review Design
                        </Button>
                        <Button onClick={handleStartOver} variant="outline">
                          Start Over
                        </Button>
                      </>
                    )}

                    {designStatus === "processing" && (
                      <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-300">
                        <p className="text-sm text-black font-medium">Your design is being processed</p>
                        <p className="text-xs text-gray-700 mt-1">
                          You'll be able to review it once processing is complete.
                        </p>
                      </div>
                    )}

                    {designStatus === "in_progress" && (
                      <>
                        <Link href="/">
                          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Continue Questionnaire
                          </Button>
                        </Link>
                        <Button onClick={handleReviewDesign} variant="outline">
                          Review Design
                        </Button>
                        <Button onClick={handleStartOver} variant="outline">
                          Start Over
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No design yet</h3>
                  <p className="text-muted-foreground mb-6">Create your first design to get started</p>
                  <Link href="/">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Design
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <Card className="border-destructive/20 bg-destructive/5 mt-6">
              <CardContent className="p-4">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
