import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import Layout from "./components/Layout"
import { useEffect, useState } from "react"
import "./index.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem("fintrack")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        return !!parsedUser.token // Check if token exists
      } catch (error) {
        console.error("Error parsing localStorage:", error)
        return false
      }
    }
    return false
  })

  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("fintrack")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({ name: parsedUser.name, email: parsedUser.email })
      } catch (error) {
        console.error("Error parsing localStorage:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("fintrack")
  }

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("fintrack")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setIsAuthenticated(!!parsedUser.token)
          setUser({ name: parsedUser.name, email: parsedUser.email })
        } catch (error) {
          console.error("Error parsing localStorage:", error)
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    }

    // Listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />

      {/* Authenticated Routes */}
      <Route
        element={
          isAuthenticated && user ? (
            <Layout user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
		<Route path="/expenses" element={<Expenses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App