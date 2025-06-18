"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast"
import { CreditCard, Loader2 } from "lucide-react"

interface StripeTopUpProps {
  onSuccess?: () => void
}

export function StripeTopUp({ onSuccess }: StripeTopUpProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg">Ready to Top Up?</h3>
            <p className="text-sm text-muted-foreground">Sign up or login to add credits and earn raffle tickets!</p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <a href="/signup">Get Started Free</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleTopUp = async () => {
    setLoading(true)

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Get current user
      const storedUser = localStorage.getItem("talentezee_user")
      if (!storedUser) {
        throw new Error("User not found")
      }

      const user = JSON.parse(storedUser)

      // Award raffle tickets for top-up
      const response = await fetch("/api/raffle-award", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.email,
          reason: "top_up",
          amount: 1,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update user data
        const updatedUser = {
          ...user,
          credits: user.credits + 1,
          raffleTickets: data.raffleTickets,
        }

        localStorage.setItem("talentezee_user", JSON.stringify(updatedUser))

        toast({
          title: "🎉 Top-up Successful!",
          description: `€1.00 added! You earned ${data.ticketsAwarded} raffle ticket(s) and are now closer to winning amazing prizes!`,
          variant: "success",
        })

        onSuccess?.()
      } else {
        throw new Error(data.error || "Top-up failed")
      }
    } catch (error) {
      toast({
        title: "Top-up failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Quick Top-Up</span>
          <span className="text-2xl font-bold">€1.00</span>
        </div>
        <p className="text-sm text-muted-foreground">Add €1 to your account and earn bonus raffle tickets!</p>
      </div>

      <Button
        onClick={handleTopUp}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="animate-pulse">Processing Payment...</span>
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            <span className="font-medium">Top Up €1.00</span>
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">Secure payment powered by Stripe. Test mode enabled.</p>
    </div>
  )
}
