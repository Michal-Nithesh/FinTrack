"use client"

import { Link } from "react-router-dom"
import { DollarSign, LayoutDashboard, Receipt, CheckSquare, BarChart, Users, LogOut } from "lucide-react"
import { Button } from "./ui/button"

interface SidebarProps {
  user?: {
    name: string
    email: string
  }
  onLogout?: () => void
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <aside className="w-48 border-r">
      <div className="flex h-full flex-col gap-2 p-4">
        {/* Branding */}
		<Link to="/dashboard" className="flex items-center mt-2 gap-2 px-4 text-lg font-semibold text-primary">
		  <DollarSign className="h-6 w-6" />
		   	<span>FinTrack</span>
		</Link>

        {/* Navigation Links */}
        <nav className="mt-10 grid gap-2">
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
          <Button variant="ghost" className="justify-start gap-2" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </aside>
  )
}