import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RaffleWidget } from "@/components/raffle-widget"
import { ToastProvider } from "@/components/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TalentEzee - Influencer Engagement Platform",
  description: "Manage your influencer engagements with ease. Earn credits, join campaigns, and win amazing prizes!",
  keywords: "influencer, marketing, campaigns, social media, earnings",
  authors: [{ name: "TalentEzee Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#8B5CF6",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Header />
            <main className="flex-1 relative">{children}</main>
            <Footer />
            <RaffleWidget />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
