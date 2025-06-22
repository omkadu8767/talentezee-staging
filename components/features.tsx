import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Gift, Zap, Shield, TrendingUp, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: CreditCard,
      title: "Credit System",
      description: "Earn and spend credits on campaigns. Top up easily with secure payments.",
      color: "text-blue-600",
    },
    {
      icon: Gift,
      title: "Raffle Rewards",
      description: "Participate in exciting raffles and win amazing prizes with your tickets.",
      color: "text-purple-600",
    },
    {
      icon: Zap,
      title: "Instant Onboarding",
      description: "Get started in minutes with our streamlined registration process.",
      color: "text-yellow-600",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and secure transactions powered by Stripe payment processing.",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your progress and optimize your influencer strategy.",
      color: "text-red-600",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other influencers and grow your network.",
      color: "text-indigo-600",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to <span className="gradient-text">Succeed</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our platform provides all the tools and features you need to manage your influencer career effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="glass-effect hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
