import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, socialHandles } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock enrollment response with welcome bonus
    const enrollmentData = {
      success: true,
      userId: email,
      credits: 5.0, // Welcome bonus
      raffleTickets: 2, // Welcome raffle tickets
      message: "Welcome to TalentEzee!",
    }

    return NextResponse.json(enrollmentData)
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
