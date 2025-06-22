"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/toast"
import { UserPlus, Instagram, Youtube, Music } from "lucide-react"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Call enrollment API
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          socialHandles: {
            instagram: formData.instagram,
            tiktok: formData.tiktok,
            youtube: formData.youtube,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data locally
        const userData = {
          name: formData.name,
          email: formData.email,
          credits: data.credits,
          raffleTickets: data.raffleTickets,
          socialHandles: {
            instagram: formData.instagram,
            tiktok: formData.tiktok,
            youtube: formData.youtube,
          },
        }

        localStorage.setItem("talentezee_user", JSON.stringify(userData))

        toast({
          title: "Welcome to TalentEzee!",
          description: `You've received €${data.credits} credits and ${data.raffleTickets} raffle tickets!`,
        })

        router.push("/dashboard")
      } else {
        throw new Error(data.error || "Enrollment failed")
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="glass-effect">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl gradient-text">Join TalentEzee</CardTitle>
          <CardDescription>Start your influencer journey and earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Social Media Handles (Optional)</Label>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <Input
                    placeholder="@instagram_handle"
                    value={formData.instagram}
                    onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-black" />
                  <Input
                    placeholder="@tiktok_handle"
                    value={formData.tiktok}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tiktok: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <Input
                    placeholder="@youtube_channel"
                    value={formData.youtube}
                    onChange={(e) => setFormData((prev) => ({ ...prev, youtube: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
