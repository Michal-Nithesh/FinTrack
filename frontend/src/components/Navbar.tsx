"use client"

import { Link, useNavigate } from "react-router-dom"
import { DollarSign, LogOut, Menu, User } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface NavbarProps {
  user?: {
    name: string
    email: string
  }
  showMenu?: boolean
}

export default function Navbar({ user, showMenu = false }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (user) {
      // Update localStorage
      localStorage.setItem(
        "fintrack",
        JSON.stringify({
          ...user,
          isLoggedIn: false,
        }),
      )

      // Redirect to login
      navigate("/login")
    }
  }

  if (!user) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <DollarSign className="h-6 w-6" />
            <span>FinTrack</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {showMenu && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary">
                <DollarSign className="h-5 w-5" />
                <span>FinTrack</span>
              </Link>
              <div className="mt-8 grid gap-2">
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link to="#">Expenses</Link>
                </Button>
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link to="#">Reports</Link>
                </Button>
                <Button variant="ghost" className="justify-start gap-2" asChild>
                  <Link to="#">Settings</Link>
                </Button>
                <Button variant="ghost" className="justify-start gap-2" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      )}
      <div className="flex items-center gap-2 md:ml-0">
        <DollarSign className="h-6 w-6" />
        <span className="font-bold">FinTrack</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
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
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

