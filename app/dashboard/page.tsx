"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { checkIn, getAmortizationTable, getS500Comparison } from "../actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AmortizationChart } from "@/components/amortization-chart"
import { ComparisonChart } from "@/components/comparison-chart"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [amortizationData, setAmortizationData] = useState([])
  const [s500Data, setS500Data] = useState([])
  const [years, setYears] = useState(5)
  const router = useRouter()

  useEffect(() => {
    // Fetch user data here
    // For now, we'll use dummy data
    setUser({ username: "DummyUser", balance: 1000 })
  }, [])

  useEffect(() => {
    if (user) {
      getAmortizationTable(user.balance, years).then(setAmortizationData)
      getS500Comparison(user.balance, years).then(setS500Data)
    }
  }, [user, years])

  async function handleCheckIn() {
    const result = await checkIn()
    if (result.success) {
      setUser(result.user)
    } else {
      alert(result.error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.username}!</CardTitle>
          <CardDescription>Your current balance: ${user.balance.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleCheckIn}>Check In</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Projections</CardTitle>
          <CardDescription>See how your savings could grow over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="years">Years to project</Label>
            <Input
              type="number"
              id="years"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              min="1"
              max="30"
            />
          </div>
          <AmortizationChart data={amortizationData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparison with S&P 500</CardTitle>
          <CardDescription>See how your investment compares to the stock market average</CardDescription>
        </CardHeader>
        <CardContent>
          <ComparisonChart investmentData={amortizationData} s500Data={s500Data} />
        </CardContent>
      </Card>
    </div>
  )
}

