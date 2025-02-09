import { PiggyBank, ArrowRight, Sprout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      icon: <PiggyBank className="size-8" />,
      title: "Deposit Money",
      description: "Start by depositing your savings into your Invest Bloom account",
    },
    {
      icon: <ArrowRight className="size-8" />,
      title: "Log in Weekly",
      description: "Check in once a week to claim your interest",
    },
    {
      icon: <Sprout className="size-8" />,
      title: "Watch it Grow",
      description: "See your savings bloom with 10% weekly interest",
    },
  ]

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="bg-white/50 backdrop-blur relative overflow-hidden">
            <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 text-center relative">
              <div className="mb-4 flex justify-center text-primary">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

