"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, Award } from "lucide-react"
import { useToast } from "@/components/toast"

interface Campaign {
  id: string
  title: string
  description: string
  brand: string
  reward: number
  participants: number
  maxParticipants: number
  deadline: string
  requirements: string[]
  status: "active" | "completed" | "upcoming"
  difficulty: "easy" | "medium" | "hard"
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Mock campaigns data
    setCampaigns([
      {
        id: "1",
        title: "Summer Fashion Showcase",
        description: "Create engaging content featuring summer fashion trends",
        brand: "StyleCo",
        reward: 25,
        participants: 45,
        maxParticipants: 100,
        deadline: "2024-07-15",
        requirements: ["Instagram post", "Story highlight", "Use #SummerStyle"],
        status: "active",
        difficulty: "easy",
      },
      {
        id: "2",
        title: "Tech Product Review",
        description: "Comprehensive review of the latest smartphone",
        brand: "TechGiant",
        reward: 75,
        participants: 12,
        maxParticipants: 25,
        deadline: "2024-07-20",
        requirements: ["YouTube video", "Instagram reel", "Detailed review"],
        status: "active",
        difficulty: "hard",
      },
      {
        id: "3",
        title: "Fitness Challenge",
        description: "30-day fitness transformation journey",
        brand: "FitLife",
        reward: 50,
        participants: 78,
        maxParticipants: 150,
        deadline: "2024-08-01",
        requirements: ["Daily posts", "Progress tracking", "Use #FitLifeChallenge"],
        status: "active",
        difficulty: "medium",
      },
      {
        id: "4",
        title: "Holiday Travel Guide",
        description: "Create content about exotic travel destinations",
        brand: "WanderLust",
        reward: 100,
        participants: 0,
        maxParticipants: 50,
        deadline: "2024-08-15",
        requirements: ["Travel blog post", "Instagram carousel", "Video content"],
        status: "upcoming",
        difficulty: "hard",
      },
    ])

    setLoading(false)
  }, [])

  const handleJoinCampaign = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign up or login to join campaigns.",
        variant: "destructive",
      })
      return
    }

    if (user.credits < 1) {
      toast({
        title: "Insufficient credits",
        description: "You need at least €1 credit to join a campaign.",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate joining campaign
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Campaign joined!",
        description: "You've successfully joined the campaign. Check your dashboard for details.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Failed to join",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "upcoming":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">Available Campaigns</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join exciting brand campaigns, create amazing content, and earn credits while building your influence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">by {campaign.brand}</CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                  <Badge className={getDifficultyColor(campaign.difficulty)}>{campaign.difficulty}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />€{campaign.reward}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm">{campaign.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Participants</span>
                  <span>
                    {campaign.participants}/{campaign.maxParticipants}
                  </span>
                </div>
                <Progress value={(campaign.participants / campaign.maxParticipants) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Requirements:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {campaign.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <Target className="h-3 w-3 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleJoinCampaign(campaign.id)}
                className="w-full"
                disabled={campaign.status !== "active" || campaign.participants >= campaign.maxParticipants}
              >
                {campaign.status === "upcoming"
                  ? "Coming Soon"
                  : campaign.participants >= campaign.maxParticipants
                    ? "Campaign Full"
                    : "Join Campaign"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {!user && (
        <Card className="glass-effect bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Start Earning?</h3>
            <p className="text-muted-foreground mb-4">Sign up now to join campaigns and start earning credits!</p>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600">
              <a href="/signup">Get Started Free</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
