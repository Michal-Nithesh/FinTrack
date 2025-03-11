"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Download, Eye, Filter, MoreHorizontal, Pencil, Search, Trash } from "lucide-react"

export function ExpenseTable() {
  const [expenses] = useState([
    {
      id: "EXP-001",
      description: "Business lunch with client",
      amount: 78.5,
      date: "2023-05-15",
      category: "Food",
      status: "Approved",
    },
    {
      id: "EXP-002",
      description: "Office supplies",
      amount: 125.3,
      date: "2023-05-14",
      category: "Office",
      status: "Approved",
    },
    {
      id: "EXP-003",
      description: "Flight to New York",
      amount: 450.0,
      date: "2023-05-10",
      category: "Travel",
      status: "Pending",
    },
    {
      id: "EXP-004",
      description: "Software subscription",
      amount: 49.99,
      date: "2023-05-05",
      category: "Software",
      status: "Rejected",
    },
    {
      id: "EXP-005",
      description: "Hotel accommodation",
      amount: 350.0,
      date: "2023-05-10",
      category: "Travel",
      status: "Approved",
    },
    {
      id: "EXP-006",
      description: "Client dinner",
      amount: 120.75,
      date: "2023-05-03",
      category: "Food",
      status: "Pending",
    },
    {
      id: "EXP-007",
      description: "Taxi fare",
      amount: 35.5,
      date: "2023-05-02",
      category: "Travel",
      status: "Approved",
    },
    {
      id: "EXP-008",
      description: "Conference registration",
      amount: 299.0,
      date: "2023-04-28",
      category: "Events",
      status: "Approved",
    },
    {
      id: "EXP-009",
      description: "Office furniture",
      amount: 750.0,
      date: "2023-04-25",
      category: "Office",
      status: "Rejected",
    },
    {
      id: "EXP-010",
      description: "Internet bill",
      amount: 89.99,
      date: "2023-04-20",
      category: "Utilities",
      status: "Approved",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input type="search" placeholder="Search expenses..." className="w-full pl-8 bg-white dark:bg-gray-800" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      expense.status === "Approved"
                        ? "success"
                        : expense.status === "Rejected"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {expense.status}
                  </Badge>
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
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
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

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

