import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 })
    }

    // In a real implementation, you would verify the webhook signature here
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

    // Mock webhook processing
    const event = JSON.parse(body)

    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle successful payment
        console.log("Payment succeeded:", event.data.object.id)

        // Award raffle tickets
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/raffle-award`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: event.data.object.metadata?.userId,
            reason: "payment",
            amount: event.data.object.amount / 100, // Convert from cents
          }),
        })

        if (!response.ok) {
          console.error("Failed to award raffle tickets")
        }
        break

      case "payment_intent.payment_failed":
        // Handle failed payment
        console.log("Payment failed:", event.data.object.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
