import { ExpenseTable } from "../components/expense/expense-table"
import { Button } from "../components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function ExpensesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Link to="/expenses/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </Link>
      </div>
      <ExpenseTable />
    </div>
  )
}

