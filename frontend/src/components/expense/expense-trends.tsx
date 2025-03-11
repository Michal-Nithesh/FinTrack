"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "../components/ui/chart"

const data = [
  { month: "Jan", travel: 4000, food: 2400, office: 1800 },
  { month: "Feb", travel: 3000, food: 1800, office: 1200 },
  { month: "Mar", travel: 2000, food: 2800, office: 1600 },
  { month: "Apr", travel: 2780, food: 2200, office: 1400 },
  { month: "May", travel: 1890, food: 1800, office: 1000 },
  { month: "Jun", travel: 2390, food: 2100, office: 1300 },
]

export function ExpenseTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Trends</CardTitle>
        <CardDescription>Monthly expense breakdown by category</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="travel" fill="#8884d8" name="Travel" />
            <Bar dataKey="food" fill="#82ca9d" name="Food & Dining" />
            <Bar dataKey="office" fill="#ffc658" name="Office Supplies" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

