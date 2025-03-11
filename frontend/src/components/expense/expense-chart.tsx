"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "../components/ui/chart"

const data = [
  { month: "Jan", expenses: 4000 },
  { month: "Feb", expenses: 3000 },
  { month: "Mar", expenses: 2000 },
  { month: "Apr", expenses: 2780 },
  { month: "May", expenses: 1890 },
  { month: "Jun", expenses: 2390 },
  { month: "Jul", expenses: 3490 },
  { month: "Aug", expenses: 2000 },
  { month: "Sep", expenses: 2780 },
  { month: "Oct", expenses: 1890 },
  { month: "Nov", expenses: 2390 },
  { month: "Dec", expenses: 3490 },
]

export function ExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Trends</CardTitle>
        <CardDescription>Monthly expense trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="expenses" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="quarterly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { quarter: "Q1", expenses: 9000 },
                  { quarter: "Q2", expenses: 7060 },
                  { quarter: "Q3", expenses: 8270 },
                  { quarter: "Q4", expenses: 7770 },
                ]}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="yearly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { year: "2020", expenses: 25000 },
                  { year: "2021", expenses: 32000 },
                  { year: "2022", expenses: 28000 },
                  { year: "2023", expenses: 34000 },
                  { year: "2024", expenses: 29000 },
                ]}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="expenses" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

