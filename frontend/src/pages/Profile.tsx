"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Switch } from "../components/ui/switch"
import { Camera, Github, Linkedin, Twitter } from 'lucide-react'

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    department: "Engineering",
    bio: "Full-stack developer with 5+ years of experience in building web applications. Passionate about clean code and user experience.",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
    publicProfile: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfileData, setTempProfileData] = useState(profileData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTempProfileData({
      ...tempProfileData,
      [name]: value
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setTempProfileData({
      ...tempProfileData,
      publicProfile: checked
    })
  }

  const handleSave = () => {
    setProfileData(tempProfileData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempProfileData(profileData)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Your profile photo will be visible to other users</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  variant="secondary"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-medium text-lg">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.role}</p>
                <Badge variant="outline" className="mt-2">{profileData.department}</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Social Profiles</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        @
                      </span>
                      <Input 
                        id="twitter" 
                        name="twitter"
                        value={tempProfileData.twitter} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        linkedin.com/in/
                      </span>
                      <Input 
                        id="linkedin" 
                        name="linkedin"
                        value={tempProfileData.linkedin} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        github.com/
                      </span>
                      <Input 
                        id="github" 
                        name="github"
                        value={tempProfileData.github} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <Twitter className="h-5 w-5 mr-3 text-[#1DA1F2]" />
                    <span className="text-sm">@{profileData.twitter}</span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 mr-3 text-[#0A66C2]" />
                    <span className="text-sm">linkedin.com/in/{profileData.linkedin}</span>
                  </div>
                  <div className="flex items-center">
                    <Github className="h-5 w-5 mr-3" />
                    <span className="text-sm">github.com/{profileData.github}</span>
                  </div>
                </>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="public-profile" 
                    checked={tempProfileData.publicProfile}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="public-profile">Make profile public</Label>
                </div>
              </CardFooter>
            )}
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
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="about">About Me</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 pt-4">
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
                        <Label htmlFor="role">Job Title</Label>
                        <Input 
                          id="role" 
                          name="role"
                          value={tempProfileData.role} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          name="department"
                          value={tempProfileData.department} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location"
                          value={tempProfileData.location} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={tempProfileData.phone} 
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
                        <h3 className="text-sm font-medium text-muted-foreground">Job Title</h3>
                        <p>{profileData.role}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                        <p>{profileData.department}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                        <p>{profileData.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                        <p>{profileData.phone}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="about" className="space-y-4 pt-4">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        value={tempProfileData.bio} 
                        onChange={handleInputChange}
                        rows={6}
                      />
                      <p className="text-sm text-muted-foreground">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">About Me</h3>
                      <p className="whitespace-pre-wrap">{profileData.bio}</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Recent activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Password changed</p>
                      <p className="text-sm text-muted-foreground">Your password was changed successfully</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Profile updated</p>
                      <p className="text-sm text-muted-foreground">Your profile information was updated</p>
                    </div>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Account created</p>
                      <p className="text-sm text-muted-foreground">Your account was created successfully</p>
                    </div>
                    <p className="text-sm text-muted-foreground">1 month ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
