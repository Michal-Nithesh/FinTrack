"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { CheckCircle, XCircle, Eye, Filter } from "lucide-react"

export function ApprovalTable() {
  const [approvals] = useState([
    {
      id: "EXP-003",
      description: "Flight to New York",
      amount: 450.0,
      date: "2023-05-10",
      category: "Travel",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      level: "Manager",
      nextApprover: "Finance",
    },
    {
      id: "EXP-006",
      description: "Client dinner",
      amount: 120.75,
      date: "2023-05-03",
      category: "Food",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
      level: "Manager",
      nextApprover: "Finance",
    },
    {
      id: "EXP-011",
      description: "Marketing materials",
      amount: 250.0,
      date: "2023-05-16",
      category: "Marketing",
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MJ",
      },
      level: "Manager",
      nextApprover: "Finance",
    },
    {
      id: "EXP-012",
      description: "Team building event",
      amount: 500.0,
      date: "2023-05-17",
      category: "Events",
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SW",
      },
      level: "Finance",
      nextApprover: "Admin",
    },
    {
      id: "EXP-013",
      description: "Software license",
      amount: 199.99,
      date: "2023-05-18",
      category: "Software",
      user: {
        name: "Alex Turner",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AT",
      },
      level: "Finance",
      nextApprover: "Admin",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Approval Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvals.map((approval) => (
              <TableRow key={approval.id}>
                <TableCell className="font-medium">{approval.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={approval.user.avatar} alt={approval.user.name} />
                      <AvatarFallback>{approval.user.initials}</AvatarFallback>
                    </Avatar>
                    <span>{approval.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{approval.description}</TableCell>
                <TableCell>${approval.amount.toFixed(2)}</TableCell>
                <TableCell>{approval.date}</TableCell>
                <TableCell>{approval.category}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {approval.level} → {approval.nextApprover}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

