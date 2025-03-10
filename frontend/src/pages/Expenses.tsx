"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ExpensesPage() {
  const router = useRouter()
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Travel", amount: 200, status: "Pending", created_at: "2023-10-01" },
    { id: 2, category: "Food", amount: 50, status: "Approved", created_at: "2023-10-02" },
    { id: 3, category: "Equipment", amount: 300, status: "Rejected", created_at: "2023-10-03" },
  ])
  const [newExpense, setNewExpense] = useState({ category: "", amount: "", status: "Pending" })
  const [filterStatus, setFilterStatus] = useState("All")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExpense({
      ...newExpense,
      [name]: value,
    })
  }

  const handleStatusChange = (value: string) => {
    setNewExpense({
      ...newExpense,
      status: value,
    })
  }

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount) {
      alert("Please fill in all fields.")
      return
    }

    const expense = {
      id: expenses.length + 1,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      status: newExpense.status,
      created_at: new Date().toISOString().split("T")[0],
    }

    setExpenses([...expenses, expense])
    setNewExpense({ category: "", amount: "", status: "Pending" })
  }

  const filteredExpenses = filterStatus === "All" ? expenses : expenses.filter((expense) => expense.status === filterStatus)

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Arrow */}
      <div className="flex items-center mb-6 cursor-pointer">
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Back to Dashboard</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Expenses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Expense Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
              <CardDescription>Submit a new expense for approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Travel, Food"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={handleStatusChange} value={newExpense.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddExpense} className="w-full">
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Expense Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Expense History</CardTitle>
                  <CardDescription>View and manage your expenses</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="filterStatus">Filter by Status</Label>
                  <Select onValueChange={setFilterStatus} value={filterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.id}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>${expense.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            expense.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : expense.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {expense.status}
                        </span>
                      </TableCell>
                      <TableCell>{expense.created_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}