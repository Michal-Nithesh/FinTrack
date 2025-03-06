"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
// import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would validate credentials against your backend
      // For demo purposes, we'll just check if there's a user in localStorage
      const storedUser = localStorage.getItem("fintrack_user")

      if (storedUser) {
        const user = JSON.parse(storedUser)

        // Simple validation - in a real app this would be done on the server
        if (user.email === formData.email) {
          // Update login status
          localStorage.setItem(
            "fintrack_user",
            JSON.stringify({
              ...user,
              isLoggedIn: true,
            }),
          )

          setIsLoading(false)
          navigate("/dashboard")
          return
        }
      }

      // If we get here, login failed
      setError("Invalid email or password")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* <Navbar /> */}
      <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
        <CardTitle className="text-3xl text-center font-semibold text-gray-800">Login to your account</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Enter your email and password to login to your account
        </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
          <div className="rounded-md bg-red-100 p-3 text-center text-sm text-red-600">{error}</div>
          )}
          <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          </div>
          <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Link to="#" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
          </div>
          <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="text-indigo-600"
          />
          <Label htmlFor="remember" className="text-sm font-normal text-gray-700">
            Remember me for 30 days
          </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
          </div>
        </CardFooter>
        </form>
      </Card>
      </div>
    </div>
  )
}

