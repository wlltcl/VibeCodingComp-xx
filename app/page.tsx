import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserProfile } from "@/components/user-profile"
import { MainContent } from "@/components/main-content"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 h-[calc(100vh-2rem)]">
          {/* Left sidebar - User Profile */}
          <div className="w-80 flex-shrink-0">
            <UserProfile user={user} />
          </div>

          {/* Main content area */}
          <div className="flex-1">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  )
}
