import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"
    const userId = searchParams.get("userId")

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock campaigns data
    const allCampaigns = [
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
        category: "fashion",
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
        category: "technology",
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
        category: "fitness",
      },
    ]

    // Filter campaigns based on status
    const filteredCampaigns =
      status === "all" ? allCampaigns : allCampaigns.filter((campaign) => campaign.status === status)

    return NextResponse.json({
      campaigns: filteredCampaigns,
      total: filteredCampaigns.length,
      page: 1,
      limit: 10,
    })
  } catch (error) {
    console.error("Campaigns error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaignId, userId } = body

    if (!campaignId || !userId) {
      return NextResponse.json({ error: "Campaign ID and User ID are required" }, { status: 400 })
    }

    // Simulate joining campaign
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response
    const joinResponse = {
      success: true,
      campaignId,
      userId,
      message: "Successfully joined campaign",
      creditsDeducted: 1,
      estimatedReward: 25,
      deadline: "2024-07-15",
    }

    return NextResponse.json(joinResponse)
  } catch (error) {
    console.error("Join campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
