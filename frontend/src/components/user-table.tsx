"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { MoreHorizontal, Pencil, Search, Trash, UserPlus } from "lucide-react"

export function UserTable() {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      department: "Finance",
      status: "Active",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Manager",
      department: "Marketing",
      status: "Active",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Employee",
      department: "Engineering",
      status: "Active",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Manager",
      department: "Sales",
      status: "Active",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
    {
      id: 5,
      name: "Alex Turner",
      email: "alex.turner@example.com",
      role: "Employee",
      department: "Customer Support",
      status: "Inactive",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AT",
    },
    {
      id: 6,
      name: "Emily Clark",
      email: "emily.clark@example.com",
      role: "Employee",
      department: "Human Resources",
      status: "Active",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EC",
    },
    {
      id: 7,
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      role: "Manager",
      department: "Operations",
      status: "Active",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RW",
    },
  ])

  return (
    <div className="space-y-4 mt-10">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input type="search" placeholder="Search users..." className="w-full pl-8 bg-white dark:bg-gray-800" />
          </div>
        </div>
        {/* <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button> */}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

