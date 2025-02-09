"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

interface ComparisonChartProps {
  investmentData: Array<{ month: number; balance: number }>
  s500Data: Array<{ year: number; value: number }>
}

export function ComparisonChart({ investmentData, s500Data }: ComparisonChartProps) {
  const combinedData = s500Data.map((s500Entry) => ({
    year: s500Entry.year,
    s500Value: s500Entry.value,
    investmentValue: investmentData[s500Entry.year * 12 - 1]?.balance || 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Comparison</CardTitle>
        <CardDescription>Your investment vs S&P 500 average performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            investment: {
              label: "Your Investment",
              color: "hsl(var(--chart-1))",
            },
            s500: {
              label: "S&P 500",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="investmentValue"
                name="Your Investment"
                stroke="var(--color-investment)"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="s500Value" name="S&P 500" stroke="var(--color-s500)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

