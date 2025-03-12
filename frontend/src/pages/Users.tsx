import { UserTable } from "../components/user-table"
import { Button } from "../components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function UsersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
		<Link to="/signup">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
		</Link>
      </div>
      <UserTable />
    </div>
  )
}

