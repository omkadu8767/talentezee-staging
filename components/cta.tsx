import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="glass-effect bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-200">
        <CardContent className="p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center">
              <Sparkles className="h-12 w-12 text-purple-600" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your <span className="gradient-text">Influencer Journey?</span>
            </h2>

            <p className="text-xl text-muted-foreground">
              Join thousands of creators who are already earning credits, winning prizes, and growing their influence
              with TalentEzee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">Explore Dashboard</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">€5</div>
                <div className="text-sm text-muted-foreground">Welcome Bonus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-muted-foreground">Free Raffle Tickets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">Setup Fees</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
