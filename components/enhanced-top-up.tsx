"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/toast"
import { CreditCard, Loader2, Sparkles, Gift, Zap, ArrowRight } from "lucide-react"

interface EnhancedTopUpProps {
  onSuccess?: () => void
}

export function EnhancedTopUp({ onSuccess }: EnhancedTopUpProps) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleTopUp = async () => {
    setLoading(true)

    try {
      // Simulate Stripe payment processing with better UX
      await new Promise((resolve) => setTimeout(resolve, 2500))

      if (!user) {
        throw new Error("Please sign up first to top up credits")
      }

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
          title: "🎉 Payment Successful!",
          description: `€1.00 added to your account! You earned ${data.ticketsAwarded} bonus raffle ticket(s)!`,
          variant: "success",
        })

        onSuccess?.()
      } else {
        throw new Error(data.error || "Payment processing failed")
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Card className="glass-effect-strong hover-glow">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-yellow-800" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold gradient-text">Ready to Earn Credits?</h3>
              <p className="text-muted-foreground">
                Join TalentEzee to top up credits, earn raffle tickets, and unlock amazing rewards!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground">€5 Welcome Bonus</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-xs text-muted-foreground">Instant Top-up</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground">Bonus Tickets</p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
            >
              <a href="/signup" className="flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="glass-effect hover-glow gradient-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Quick Top-Up</CardTitle>
                <CardDescription>Add credits instantly & earn bonus tickets</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="animate-bounce-slow">
              <Sparkles className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-lg">€1.00</span>
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">+1.5 Tickets</Badge>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>• Instant credit top-up</span>
                <span className="text-green-600 font-medium">€1.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Bonus raffle tickets</span>
                <span className="text-purple-600 font-medium">1-2 tickets</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Processing fee</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleTopUp}
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover-lift text-white font-semibold py-3"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                <div className="flex flex-col items-start">
                  <span className="animate-pulse">Processing Payment...</span>
                  <span className="text-xs opacity-75">Please wait...</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CreditCard className="mr-2 h-5 w-5" />
                <span>Top Up €1.00</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Secure payment powered by Stripe • Test mode enabled
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Balance Display */}
      <Card className="glass-effect">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">€</span>
              </div>
              <div>
                <p className="text-sm font-medium">Current Balance</p>
                <p className="text-xs text-muted-foreground">Available for campaigns</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">€{user.credits?.toFixed(2) || "0.00"}</p>
              <p className="text-xs text-muted-foreground">{user.raffleTickets || 0} tickets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
