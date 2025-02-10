import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { findUser } from "@/utils/database"
import DashboardContent from "@/components/dashboard-content"

export default async function DashboardPage() {
  const userId = cookies().get("userId")?.value

  if (!userId) {
    redirect("/login")
  }

  const user = await findUser(userId)

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-secondary">
      <DashboardContent user={user} />
    </div>
  )
}

