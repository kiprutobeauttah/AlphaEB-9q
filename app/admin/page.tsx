import { requireAdmin } from "@/lib/auth"
import AdminDashboard from "@/components/admin-dashboard"

export default async function AdminPage() {
  // This will redirect to login if not an admin
  const admin = await requireAdmin()

  return <AdminDashboard admin={admin} />
}

