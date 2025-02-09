import { Shield, BanknoteIcon as Bank, Clock } from "lucide-react"

export default function TrustIndicators() {
  return (
    <section className="bg-white rounded-lg p-8 mb-16">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <Shield className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">Secure & Reliable</h3>
          <p className="text-sm text-muted-foreground">Your deposits are backed by a trusted financial guardian</p>
        </div>
        <div className="space-y-2">
          <Bank className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">FDIC Insured*</h3>
          <p className="text-sm text-muted-foreground">Your savings are protected up to $250,000</p>
        </div>
        <div className="space-y-2">
          <Clock className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">Founded in 2024</h3>
          <p className="text-sm text-muted-foreground">Proudly helping young investors save for the future</p>
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground mt-8">*For educational purposes only. Not a real bank.</p>
    </section>
  )
}

