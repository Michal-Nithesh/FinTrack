"use client"

import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

interface LayoutProps {
  user?: {
    name: string
    email: string
  }
  onLogout?: () => void
}

export default function Layout({ user, onLogout }: LayoutProps) {
  const location = useLocation()

  // Check if the current path is '/login' or '/signup'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:block">
          <Sidebar user={user} onLogout={onLogout} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-2 md:p-2">
          {/* Only render Navbar if not on login or signup page */}
          {!isAuthPage && <Navbar />}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
