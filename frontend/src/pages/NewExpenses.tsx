import { ExpenseForm } from "../components/expense/expense-form"

export default function NewExpensePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Expense</h1>
      <ExpenseForm />
    </div>
  )
}

