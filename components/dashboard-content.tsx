import { Button } from "@/components/ui/button"
import { AmortizationChart } from "@/components/amortization-chart"
import { ComparisonChart } from "@/components/comparison-chart"
import { getAmortizationTable, getS500Comparison } from "@/app/actions"
import type { User } from "@/utils/database"
import { useState, useEffect } from "react"

export default function DashboardContent({ user }: { user: User }) {
  const [amortizationData, setAmortizationData] = useState<Array<{ month: number; balance: number; interest: number }>>(
    [],
  )
  const [comparisonData, setComparisonData] = useState<Array<{ year: number; value: number }>>([])

  useEffect(() => {
    async function fetchData() {
      const amortizationTable = await getAmortizationTable(user.balance, 5)
      setAmortizationData(amortizationTable)
      const s500Comparison = await getS500Comparison(user.balance, 5)
      setComparisonData(s500Comparison)
    }
    fetchData()
  }, [user.balance])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>
      <p className="text-lg text-muted-foreground mb-8">Welcome, {user.username}!</p>
      <p className="text-lg text-muted-foreground mb-8">Current Balance: ${user.balance.toFixed(2)}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AmortizationChart data={amortizationData} />
        <ComparisonChart investmentData={amortizationData} s500Data={comparisonData} />
      </div>
      <Button className="mt-8">Check In</Button>
    </div>
  )
}

