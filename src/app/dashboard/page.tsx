import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Trophy, Star, Coins, Shield, Activity, Gamepad2 } from "lucide-react"

export default async function DashboardPage() {
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

  // For visual purposes while DB might not be fully seeded:
  const displayProfile = profile || {
    username: user.email?.split('@')[0] || "PlayerOne",
    level: 1,
    xp: 0,
    coins: 0,
    role: "user"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back to the Nexus, {displayProfile.username}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-neon-purple">
          <div className="p-3 bg-neon-purple/20 rounded-lg">
            <Trophy className="text-neon-purple" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Player Level</p>
            <p className="text-2xl font-bold">{displayProfile.level}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-neon-blue">
          <div className="p-3 bg-neon-blue/20 rounded-lg">
            <Star className="text-neon-blue" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total XP</p>
            <p className="text-2xl font-bold">{displayProfile.xp}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-yellow-500">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <Coins className="text-yellow-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Nexus Coins</p>
            <p className="text-2xl font-bold">{displayProfile.coins}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-neon-green">
          <div className="p-3 bg-neon-green/20 rounded-lg">
            <Shield className="text-neon-green" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Account Role</p>
            <p className="text-2xl font-bold capitalize">{displayProfile.role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-neon-blue" /> Recent Activity
          </h2>
          <div className="glass-card p-8 text-center border-dashed border-gray-700">
            <Gamepad2 size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No recent game sessions found.</p>
            <p className="text-sm text-gray-500 mt-2">Go play some games to see your history here!</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="text-neon-purple" /> Latest Achievements
          </h2>
          <div className="glass-card p-6">
            <p className="text-gray-400 text-sm text-center">You haven't unlocked any achievements yet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
