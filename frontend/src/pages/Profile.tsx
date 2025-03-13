"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { fetchProfile } from "../api/api";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfileData, setTempProfileData] = useState(profileData)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchProfileData()
  }, [])

  const fetchProfileData = async () => {
    try {
      const response = await fetchProfile();
      if (response.data) {
        setProfileData(response.data);
        setTempProfileData(response.data);
      } else {
        console.error("No data received from the backend");
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempProfileData({
      ...tempProfileData,
      [name]: value,
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleSaveProfile = async () => {
    try {
      await axios.put("/api/user/profile", tempProfileData)
      setProfileData(tempProfileData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleCancelEdit = () => {
    setTempProfileData(profileData)
    setIsEditing(false)
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.")
      return
    }

    try {
      await axios.put("/api/user/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      alert("Password changed successfully!")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Failed to change password:", error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Link className="flex items-center cursor-pointer space-x-2" to="/dashboard">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-xl font-medium">Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold flex-grow text-center">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Your profile photo will be visible to other users</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
				<AvatarFallback className="text-2xl">
				  {profileData.name
				    ? profileData.name
				        .split(" ")
				        .map((n) => n[0])
				        .join("")
				    : "JD"} {/* Fallback to "JD" if name is not available */}
				</AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <h3 className="font-medium text-lg">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.role}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="password">Change Password</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4 pt-4">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={tempProfileData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={tempProfileData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          name="role"
                          value={tempProfileData.role}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                        <p>{profileData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>{profileData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                        <p>{profileData.role}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="password" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <Button onClick={handleChangePassword}>Change Password</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}