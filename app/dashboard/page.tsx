import { requireAuth } from "@/lib/auth"
import UserDashboard from "@/components/user-dashboard"

export default async function DashboardPage() {
  // This will redirect to login if not authenticated
  const user = await requireAuth()

  return <UserDashboard user={user} />
}

