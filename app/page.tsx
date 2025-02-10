import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HowItWorks from "@/components/how-it-works"
import TrustIndicators from "@/components/trust-indicators"
import Logo from "@/components/logo"
import { PiggyBank, TrendingUp, Leaf, Sprout } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/help">Help Center</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Helping Your Savings Grow,
            <br />
            One Bloom at a Time
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Deposit your savings with Invest Bloom Bank and earn 10% weekly interest—just log in once a week to claim
            it!
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PiggyBank className="size-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Safe Deposits</h3>
              <p className="text-sm text-muted-foreground">Securely store your savings</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="size-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">10% Weekly Interest</h3>
              <p className="text-sm text-muted-foreground">Watch your money grow</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="size-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Weekly Check-ins</h3>
              <p className="text-sm text-muted-foreground">Simple interest claiming</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sprout className="size-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Growth Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor your progress</p>
            </CardContent>
          </Card>
        </div>

        <HowItWorks />
        <TrustIndicators />
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2024 Invest Bloom Bank. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

