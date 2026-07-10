import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { signout } from "@/app/auth/actions"
import { LogOut, Settings, User } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const displayProfile = profile || {
    username: user.email?.split('@')[0] || "PlayerOne",
    email: user.email,
    created_at: new Date().toISOString()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold neon-text mb-8">Player Profile</h1>

      <div className="glass-card p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-gaming-surface border-2 border-neon-purple flex items-center justify-center overflow-hidden">
          <User size={64} className="text-gray-600" />
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">{displayProfile.username}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-xs text-gray-500 mt-2">Member since {new Date(displayProfile.created_at).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button className="px-6 py-2 bg-gaming-surface hover:bg-gaming-surface-hover border border-gaming-border rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <Settings size={16} /> Edit Profile
          </button>
          
          <form action={signout}>
            <button type="submit" className="w-full px-6 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </form>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-xl font-bold mb-6 border-b border-gaming-border pb-4">Account Settings</h3>
        <p className="text-gray-400 text-sm">Profile editing functionality will be available soon.</p>
      </div>
    </div>
  )
}
