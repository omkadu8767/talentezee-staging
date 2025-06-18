"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users, Star } from "lucide-react"

interface LeaderboardUser {
  id: string
  name: string
  credits: number
  raffleTickets: number
  campaignsCompleted: number
  rank: number
  badge: string
  socialPlatforms: string[]
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }

    // Mock leaderboard data
    setLeaderboard([
      {
        id: "1",
        name: "Sarah Johnson",
        credits: 450.75,
        raffleTickets: 89,
        campaignsCompleted: 23,
        rank: 1,
        badge: "Diamond Influencer",
        socialPlatforms: ["Instagram", "TikTok", "YouTube"],
      },
      {
        id: "2",
        name: "Mike Chen",
        credits: 398.5,
        raffleTickets: 76,
        campaignsCompleted: 19,
        rank: 2,
        badge: "Gold Creator",
        socialPlatforms: ["YouTube", "Instagram"],
      },
      {
        id: "3",
        name: "Emma Rodriguez",
        credits: 367.25,
        raffleTickets: 71,
        campaignsCompleted: 18,
        rank: 3,
        badge: "Gold Creator",
        socialPlatforms: ["TikTok", "Instagram"],
      },
      {
        id: "4",
        name: "Alex Thompson",
        credits: 298.0,
        raffleTickets: 58,
        campaignsCompleted: 15,
        rank: 4,
        badge: "Silver Star",
        socialPlatforms: ["Instagram", "YouTube"],
      },
      {
        id: "5",
        name: "Lisa Park",
        credits: 276.5,
        raffleTickets: 54,
        campaignsCompleted: 14,
        rank: 5,
        badge: "Silver Star",
        socialPlatforms: ["TikTok"],
      },
      {
        id: "6",
        name: "David Wilson",
        credits: 245.75,
        raffleTickets: 48,
        campaignsCompleted: 12,
        rank: 6,
        badge: "Bronze Rising",
        socialPlatforms: ["YouTube"],
      },
      {
        id: "7",
        name: "Sophie Brown",
        credits: 198.25,
        raffleTickets: 39,
        campaignsCompleted: 10,
        rank: 7,
        badge: "Bronze Rising",
        socialPlatforms: ["Instagram", "TikTok"],
      },
      {
        id: "8",
        name: "James Miller",
        credits: 167.5,
        raffleTickets: 33,
        campaignsCompleted: 8,
        rank: 8,
        badge: "Rising Talent",
        socialPlatforms: ["YouTube", "Instagram"],
      },
    ])

    setLoading(false)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Diamond Influencer":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      case "Gold Creator":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case "Silver Star":
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
      case "Bronze Rising":
        return "bg-gradient-to-r from-amber-600 to-amber-800 text-white"
      default:
        return "bg-gradient-to-r from-green-500 to-green-600 text-white"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">Leaderboard</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how you rank among our top influencers and creators. Earn more credits and complete campaigns to climb the
          leaderboard!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Distributed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,678</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Completed</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Current User Position */}
      {currentUser && (
        <Card className="glass-effect bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              Your Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">€{currentUser.credits?.toFixed(2)} credits</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">#156</div>
                <p className="text-sm text-muted-foreground">Your rank</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Performers */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Our highest earning influencers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  user.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12">{getRankIcon(user.rank)}</div>

                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge className={getBadgeColor(user.badge)}>{user.badge}</Badge>
                      <div className="flex space-x-1">
                        {user.socialPlatforms.map((platform, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-bold text-green-600">€{user.credits.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.raffleTickets} tickets • {user.campaignsCompleted} campaigns
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {!currentUser && (
        <Card className="glass-effect bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-200">
          <CardContent className="p-8 text-center">
            <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Join the Competition!</h3>
            <p className="text-muted-foreground mb-4">
              Sign up now to start earning credits and climb the leaderboard!
            </p>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600">
              <a href="/signup">Get Started Free</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
