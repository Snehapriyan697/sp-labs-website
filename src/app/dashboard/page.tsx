import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Trophy, Star, Coins, Shield, Gamepad2, ArrowRight, TrendingUp, Zap } from "lucide-react"

const QUICK_PLAY = [
  { id: "snake", name: "Snake", emoji: "🐍" },
  { id: "2048", name: "2048", emoji: "🔢" },
  { id: "flappy-bird", name: "Flappy", emoji: "🐦" },
  { id: "space-shooter", name: "Shooter", emoji: "🚀" },
  { id: "minesweeper", name: "Mines", emoji: "💣" },
  { id: "tic-tac-toe", name: "TicTac", emoji: "⭕" },
]

export default async function DashboardPage() {
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
    role: "user",
  }

  const xpForNext = (p.level || 1) * 500
  const xpProgress = Math.min(100, Math.round(((p.xp || 0) / xpForNext) * 100))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Welcome */}
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-neon-blue mb-2">Dashboard</p>
        <h1 className="text-3xl font-black">
          Welcome back, <span className="neon-text">{p.username}</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Level", value: p.level, icon: Shield, color: "text-neon-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/20" },
          { label: "Total XP", value: (p.xp || 0).toLocaleString(), icon: Star, color: "text-neon-blue", bg: "bg-neon-blue/10", border: "border-neon-blue/20" },
          { label: "Coins", value: (p.coins || 0).toLocaleString(), icon: Coins, color: "text-neon-yellow", bg: "bg-neon-yellow/10", border: "border-neon-yellow/20" },
          { label: "Rank", value: "#—", icon: TrendingUp, color: "text-neon-green", bg: "bg-neon-green/10", border: "border-neon-green/20" },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className={`glass-card-static p-5 border ${stat.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* XP Progress */}
      <div className="glass-card-static p-6 mb-10 border border-gaming-border/30">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-neon-blue" />
            <span className="text-sm font-bold text-white">Level {p.level} Progress</span>
          </div>
          <span className="text-xs text-gray-500">{p.xp || 0} / {xpForNext} XP</span>
        </div>
        <div className="w-full h-2.5 bg-gaming-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      {/* Quick Play */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-white">Quick Play</h2>
          <Link href="/games" className="text-xs text-neon-blue font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_PLAY.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className="glass-card p-4 text-center group cursor-pointer hover:border-neon-blue/40">
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{game.emoji}</span>
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{game.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card-static p-6 border border-gaming-border/30">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Gamepad2 size={18} className="text-neon-blue" /> Recent Games
          </h2>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Gamepad2 size={40} className="text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">No recent games yet.</p>
            <p className="text-gray-600 text-xs mt-1">Play a game to see your history here!</p>
          </div>
        </div>

        <div className="glass-card-static p-6 border border-gaming-border/30">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Trophy size={18} className="text-neon-purple" /> Achievements
          </h2>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Trophy size={40} className="text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">No achievements unlocked yet.</p>
            <p className="text-gray-600 text-xs mt-1">Start playing to earn badges!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
