import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, reason, amount } = body

    if (!userId || !reason) {
      return NextResponse.json({ error: "User ID and reason are required" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Calculate tickets based on reason
    let ticketsAwarded = 0
    switch (reason) {
      case "signup":
        ticketsAwarded = 2
        break
      case "top_up":
        ticketsAwarded = Math.floor((amount || 1) * 1.5) // 1.5 tickets per euro
        break
      case "campaign_completion":
        ticketsAwarded = 3
        break
      default:
        ticketsAwarded = 1
    }

    // Mock current user data (in real app, fetch from database)
    const currentTickets = 2 // This would be fetched from database
    const newTicketTotal = currentTickets + ticketsAwarded

    const awardResponse = {
      success: true,
      userId,
      ticketsAwarded,
      raffleTickets: newTicketTotal,
      reason,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(awardResponse)
  } catch (error) {
    console.error("Raffle award error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
