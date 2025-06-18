"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Instagram, Youtube, Music } from "lucide-react"
import { useToast } from "@/components/toast"

interface UserData {
  name: string
  email: string
  credits: number
  raffleTickets: number
  socialHandles: {
    instagram?: string
    tiktok?: string
    youtube?: string
  }
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState<UserData | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setFormData(user)
    }
    setLoading(false)
  }, [])

  const handleSave = () => {
    if (formData) {
      setUserData(formData)
      localStorage.setItem("talentezee_user", JSON.stringify(formData))
      setEditing(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    }
  }

  const handleCancel = () => {
    setFormData(userData)
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign up first</h1>
        <Button asChild>
          <a href="/signup">Sign Up</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </div>
              {!editing ? (
                <Button onClick={() => setEditing(true)} variant="outline">
                  Edit Profile
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button onClick={handleSave} size="sm">
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {editing ? (
                  <Input
                    id="name"
                    value={formData?.name || ""}
                    onChange={(e) => setFormData((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded">
                    <User className="h-4 w-4" />
                    {userData.name}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2 p-2 bg-muted rounded">
                  <Mail className="h-4 w-4" />
                  {userData.email}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Social Media Handles</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <Label htmlFor="instagram" className="w-20">
                    Instagram
                  </Label>
                  {editing ? (
                    <Input
                      id="instagram"
                      placeholder="@username"
                      value={formData?.socialHandles.instagram || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                socialHandles: { ...prev.socialHandles, instagram: e.target.value },
                              }
                            : null,
                        )
                      }
                    />
                  ) : (
                    <span className="text-sm">{userData.socialHandles.instagram || "Not set"}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-black" />
                  <Label htmlFor="tiktok" className="w-20">
                    TikTok
                  </Label>
                  {editing ? (
                    <Input
                      id="tiktok"
                      placeholder="@username"
                      value={formData?.socialHandles.tiktok || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                socialHandles: { ...prev.socialHandles, tiktok: e.target.value },
                              }
                            : null,
                        )
                      }
                    />
                  ) : (
                    <span className="text-sm">{userData.socialHandles.tiktok || "Not set"}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <Label htmlFor="youtube" className="w-20">
                    YouTube
                  </Label>
                  {editing ? (
                    <Input
                      id="youtube"
                      placeholder="@channel"
                      value={formData?.socialHandles.youtube || ""}
                      onChange={(e) =>
                        setFormData((prev) =>
                          prev
                            ? {
                                ...prev,
                                socialHandles: { ...prev.socialHandles, youtube: e.target.value },
                              }
                            : null,
                        )
                      }
                    />
                  ) : (
                    <span className="text-sm">{userData.socialHandles.youtube || "Not set"}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your current account statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">€{userData.credits.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Credits Balance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.raffleTickets}</div>
                <div className="text-sm text-muted-foreground">Raffle Tickets</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Badge variant="secondary">Active Member</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
