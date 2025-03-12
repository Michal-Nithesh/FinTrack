import { ExpenseTrends } from "../components/expense-trends"
import { CategoryBreakdown } from "../components/category-breakdown"
import { Button } from "../components/ui/button"
import { Download } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseTrends />
        <CategoryBreakdown />
      </div>
    </div>
  )
}

