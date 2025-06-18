import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Users, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <Badge variant="secondary" className="mb-4">
          🎉 Welcome to the Future of Influencer Marketing
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Connect, Engage, and <span className="gradient-text">Grow Your Influence</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join TalentEzee and unlock exclusive campaigns, earn credits, and participate in exciting raffles. Your
          journey to influencer success starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold">Connect</h3>
            <p className="text-sm text-muted-foreground text-center">
              Link your social media accounts and showcase your influence
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">Engage</h3>
            <p className="text-sm text-muted-foreground text-center">
              Participate in campaigns and earn credits for your engagement
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold">Win</h3>
            <p className="text-sm text-muted-foreground text-center">
              Enter raffles and win exciting prizes with your earned tickets
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
