"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LayoutDashboard, DollarSign, LogOut, Menu, User, Receipt, CheckSquare, BarChart, Users } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface UserProps {
  name: string
  email: string
}

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserProps | null>(null)

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("fintrack")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)
      }
    }
  }, [])

  const handleLogout = () => {
    if (user) {
      localStorage.setItem(
        "fintrack",
        JSON.stringify({
          ...user,
          isLoggedIn: false,
        }),
      )
      setUser(null) // ✅ Clear user state
      navigate("/login") // Redirect to login
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* Mobile Menu (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <nav className="grid gap-2 text-lg font-medium">
            <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary">
              <DollarSign className="h-5 w-5" />
              <span>FinTrack</span>
            </Link>
            <div className="mt-8 grid gap-2">
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link to="/expenses">
                  <Receipt className="h-5 w-5" />
                  Expenses
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link to="/approvals">
                  <CheckSquare className="h-5 w-5" />
                  Approvals
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link to="/analytics">
                  <BarChart className="h-5 w-5" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link to="/users">
                  <Users className="h-5 w-5" />
                  Users
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Centered Text */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-xl font-semibold hidden md:block">Enterprise Expense Management System</h1>
      </div>

      {/* User Dropdown */}
      {user && (
        <div className="flex items-center gap-4 pr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  )
}
