import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { signout } from "@/app/auth/actions"
import { LogOut, Settings, User, Trophy, Gamepad2, Star, Calendar } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const p = profile || {
    username: user.email?.split("@")[0] || "Player",
    level: 1,
    xp: 0,
    coins: 0,
    created_at: user.created_at || new Date().toISOString(),
  }

  const stats = [
    { label: "Games Played", value: "0", icon: Gamepad2, color: "text-neon-blue" },
    { label: "Total Score", value: "0", icon: Star, color: "text-neon-green" },
    { label: "Best Rank", value: "#—", icon: Trophy, color: "text-neon-purple" },
    { label: "Member Since", value: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }), icon: Calendar, color: "text-neon-orange" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <p className="text-sm font-bold uppercase tracking-widest text-neon-purple mb-2">Profile</p>
      <h1 className="text-3xl font-black mb-10">Player Profile</h1>

      {/* Profile Card */}
      <div className="glass-card-static p-8 mb-8 border border-gaming-border/30">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-gaming-border flex items-center justify-center">
            <User size={40} className="text-gray-600" />
          </div>

          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-2xl font-black text-white">{p.username}</h2>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
              <span className="badge badge-purple">Level {p.level}</span>
              <span className="badge badge-blue">{p.xp || 0} XP</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:self-start">
            <button className="px-5 py-2 rounded-xl text-sm font-medium bg-gaming-surface border border-gaming-border text-gray-400 hover:text-white hover:border-neon-blue/30 flex items-center gap-2 transition-all">
              <Settings size={14} /> Edit Profile
            </button>
            <form action={signout}>
              <button type="submit" className="w-full px-5 py-2 rounded-xl text-sm font-medium bg-neon-red/5 border border-neon-red/20 text-neon-red hover:bg-neon-red/10 flex items-center gap-2 transition-all">
                <LogOut size={14} /> Log Out
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="glass-card-static p-5 text-center border border-gaming-border/30">
              <Icon size={20} className={`${stat.color} mx-auto mb-2`} />
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Account Settings placeholder */}
      <div className="glass-card-static p-8 border border-gaming-border/30">
        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
          <Settings size={18} className="text-gray-500" /> Account Settings
        </h3>
        <p className="text-gray-500 text-sm">Profile editing and account management will be available soon.</p>
      </div>
    </div>
  )
}
