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

    // Mock raffle status - in real app, this would fetch from database
    const raffleStatus = {
      userId,
      credits: 5.0,
      raffleTickets: 2,
      currentRaffle: {
        id: "raffle_2024_12",
        name: "December 2024 Grand Prize",
        drawDate: "2024-12-31T23:59:59Z",
        totalTickets: 1250,
        prizes: [
          { place: 1, prize: "iPhone 15 Pro", value: 1200 },
          { place: 2, prize: "MacBook Air", value: 1000 },
          { place: 3, prize: "AirPods Pro", value: 250 },
        ],
      },
    }

    return NextResponse.json(raffleStatus)
  } catch (error) {
    console.error("Raffle status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
