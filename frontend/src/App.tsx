import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
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

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("fintrack")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setIsAuthenticated(!!parsedUser.token)
        } catch (error) {
          console.error("Error parsing localStorage:", error)
        }
      } else {
        setIsAuthenticated(false)
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
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
	  <Route path="/profile" element={<Profile />} />
	  <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App
