"use client"

import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

// Sample transaction data
const transactions = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: 78.5,
    date: "Today",
    category: "Food",
    type: "expense",
  },
  {
    id: "2",
    description: "Monthly Salary",
    amount: 3500.0,
    date: "Yesterday",
    category: "Income",
    type: "income",
  },
  {
    id: "3",
    description: "Electric Bill",
    amount: 120.75,
    date: "3 days ago",
    category: "Utilities",
    type: "expense",
  },
  {
    id: "4",
    description: "Restaurant Dinner",
    amount: 65.3,
    date: "4 days ago",
    category: "Food",
    type: "expense",
  },
  {
    id: "5",
    description: "Freelance Payment",
    amount: 450.0,
    date: "1 week ago",
    category: "Income",
    type: "income",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between space-x-4 rounded-md border p-3">
            <div className="flex items-center space-x-4">
              <div
                className={`rounded-full p-2 ${
                  transaction.type === "income"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p
                className={`text-sm font-medium ${
                  transaction.type === "income" ? "text-green-600 dark:text-green-400" : ""
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline" size="sm" className="w-full">
          View All Transactions
        </Button>
      </div>
    </div>
  )
}

