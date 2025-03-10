"use client"

import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

interface LayoutProps {
  user?: {
    name: string
    email: string
  }
  onLogout?: () => void
}

export default function Layout({ user, onLogout }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
  
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:block">
          <Sidebar user={user} onLogout={onLogout} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-2 md:p-2">
          <Outlet />
        </main>
      </div>
    </div>
  )
}