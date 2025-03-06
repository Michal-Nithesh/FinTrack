"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the chart
const generateChartData = () => [
  { name: "Jan", amount: Math.floor(Math.random() * 1000) + 500 },
  { name: "Feb", amount: Math.floor(Math.random() * 1000) + 500 },
  { name: "Mar", amount: Math.floor(Math.random() * 1000) + 500 },
  { name: "Apr", amount: Math.floor(Math.random() * 1000) + 500 },
  { name: "May", amount: Math.floor(Math.random() * 1000) + 500 },
  { name: "Jun", amount: Math.floor(Math.random() * 1000) + 500 },
]

export function DashboardChart() {
  const [data, setData] = useState<any[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setData(generateChartData())
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" tickFormatter={(value) => `$${value}`} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Amount"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

