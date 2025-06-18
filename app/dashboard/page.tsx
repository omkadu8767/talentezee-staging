"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Trophy, Users, TrendingUp } from "lucide-react"
import { EnhancedTopUp } from "@/components/enhanced-top-up"

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

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const refreshUserData = async () => {
    if (userData) {
      try {
        const response = await fetch(`/api/raffle-status?userId=${userData.email}`)
        const data = await response.json()
        const updatedUser = { ...userData, credits: data.credits, raffleTickets: data.raffleTickets }
        setUserData(updatedUser)
        localStorage.setItem("talentezee_user", JSON.stringify(updatedUser))
      } catch (error) {
        console.error("Failed to refresh user data:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome back, {userData.name}!</h1>
          <p className="text-muted-foreground">Manage your influencer engagement journey</p>
        </div>
        <Button onClick={refreshUserData} variant="outline">
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{userData.credits.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available for campaigns</p>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raffle Tickets</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.raffleTickets}</div>
            <p className="text-xs text-muted-foreground">Entries in current raffle</p>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Platforms</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {userData.socialHandles.instagram && <Badge variant="secondary">Instagram</Badge>}
              {userData.socialHandles.tiktok && <Badge variant="secondary">TikTok</Badge>}
              {userData.socialHandles.youtube && <Badge variant="secondary">YouTube</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Up Credits
            </CardTitle>
            <CardDescription>
              Add credits to your account to participate in campaigns and earn raffle tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedTopUp onSuccess={refreshUserData} />
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Account created</span>
                <Badge variant="outline">Welcome bonus: 2 tickets</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Profile completed</span>
                <Badge variant="outline">Ready for campaigns</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
