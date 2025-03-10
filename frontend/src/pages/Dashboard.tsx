"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowRightIcon,
  BarChart3Icon,
  CreditCardIcon,
  DollarSignIcon,
  HomeIcon,
  PieChartIcon,
  PlusIcon,
  LayoutDashboard, 
  Receipt, 
  CheckSquare, 
  BarChart, 
  Users, 
  Settings
} from "lucide-react"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DashboardChart } from "../components/dashboard-chart"
import { RecentTransactions } from "../components/recent-transactions"

interface User {
  name: string
  email: string
  isLoggedIn: boolean
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Expenses", href: "/expenses", icon: Receipt },
    { name: "Approvals", href: "/approvals", icon: CheckSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("fintrack") // Use the correct key

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.isLoggedIn) { // Check the isLoggedIn property
        setUser(parsedUser)
        setIsLoading(false)
        return
      }
    }

    // If not logged in, redirect to login
    navigate("/login")
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user!} showMenu={true} />
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
	  <aside className="hidden border-r md:block">
	        <div className="flex h-full flex-col gap-2 p-4">
	          <nav className="grid gap-1">
	            {navItems.map((item, index) => (
	              <Button 
	                key={index} 
	                variant={index === 0 ? "secondary" : "ghost"} 
	                className="justify-start gap-2"
	              >
	                <item.icon className="h-4 w-4" />
	                {item.name}
	              </Button>
	            ))}
	          </nav>
	        </div>
	      </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
            <Button size="sm" className="ml-auto gap-1">
              <PlusIcon className="h-4 w-4" />
              Add Expense
            </Button>
          </div>
          <Tabs defaultValue="overview">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,234.56</div>
                    <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                    <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2,000.00</div>
                    <p className="text-xs text-muted-foreground">38% used</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Approved</CardTitle>
                    <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Housing</div>
                    <p className="text-xs text-muted-foreground">$650.00 (32%)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 new since yesterday</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Expense Overview</CardTitle>
                    <CardDescription>Your expense trend for the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your latest expense transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Detailed analysis of your spending patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and download expense reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Reports dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

