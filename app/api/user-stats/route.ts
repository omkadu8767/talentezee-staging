import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock user statistics
    const userStats = {
      userId,
      totalCreditsEarned: 125.5,
      totalCampaignsCompleted: 8,
      totalRaffleTickets: 23,
      currentRank: 156,
      totalUsers: 1247,
      joinDate: "2024-01-15",
      lastActivity: new Date().toISOString(),
      achievements: [
        { id: "first_campaign", name: "First Campaign", description: "Completed your first campaign", earned: true },
        { id: "early_adopter", name: "Early Adopter", description: "Joined in the first month", earned: true },
        {
          id: "social_butterfly",
          name: "Social Butterfly",
          description: "Connected 3+ social platforms",
          earned: false,
        },
        { id: "top_performer", name: "Top Performer", description: "Reached top 100 leaderboard", earned: false },
      ],
      monthlyStats: {
        january: { credits: 25.5, campaigns: 2 },
        february: { credits: 45.0, campaigns: 3 },
        march: { credits: 55.0, campaigns: 3 },
      },
    }

    return NextResponse.json(userStats)
  } catch (error) {
    console.error("User stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
