"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Ticket } from "lucide-react"

export function RaffleWidget() {
  const [raffleData, setRaffleData] = useState({
    tickets: 0,
    credits: 0,
  })
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      fetchRaffleStatus(userData.email)
    }
  }, [])

  const fetchRaffleStatus = async (userId: string) => {
    try {
      const response = await fetch(`/api/raffle-status?userId=${userId}`)
      const data = await response.json()
      setRaffleData({
        tickets: data.raffleTickets || 0,
        credits: data.credits || 0,
      })
    } catch (error) {
      console.error("Failed to fetch raffle status:", error)
    }
  }

  if (!user) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full px-4 sm:px-0">
      <Card className="glass-effect-strong shadow-2xl hover-glow border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="h-3 w-3 text-white" />
            </div>
            <span className="gradient-text">Live Raffle</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <span className="text-xs font-medium text-muted-foreground">Your Tickets:</span>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              <Ticket className="h-3 w-3" />
              {raffleData.tickets}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <span className="text-xs font-medium text-muted-foreground">Credits:</span>
            <Badge variant="outline" className="border-green-200 text-green-700">
              €{raffleData.credits.toFixed(2)}
            </Badge>
          </div>
          <div className="text-center pt-2 border-t border-purple-100">
            <p className="text-xs text-muted-foreground">🎁 Next draw: Dec 31, 2024</p>
            <p className="text-xs text-purple-600 font-medium">Grand Prize: iPhone 15 Pro!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
