"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

interface AmortizationChartProps {
  data: Array<{ month: number; balance: number; interest: number }>
}

export function AmortizationChart({ data }: AmortizationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amortization Chart</CardTitle>
        <CardDescription>Your projected account balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            balance: {
              label: "Balance",
              color: "hsl(var(--chart-1))",
            },
            interest: {
              label: "Interest",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickFormatter={(value) => `${Math.floor(value / 12)}y ${value % 12}m`} />
              <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="balance" name="Balance" stroke="var(--color-balance)" strokeWidth={2} />
              <Line type="monotone" dataKey="interest" name="Interest" stroke="var(--color-interest)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

