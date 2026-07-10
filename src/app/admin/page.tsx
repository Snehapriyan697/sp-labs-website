import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Users, Gamepad2, Trophy, AlertTriangle, ShieldCheck } from "lucide-react"

export default async function AdminPanelPage() {
  const supabase = await createClient()

  // Verify Admin (Mocking for now if DB isn't seeded)
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // In a real app, strict check: if (profile?.role !== 'admin') redirect('/dashboard')
  const isAdmin = profile?.role === 'admin'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
            <ShieldCheck size={32} /> Nexus Admin Control
          </h1>
          <p className="text-gray-400 mt-2">Manage players, games, and system settings.</p>
        </div>
      </div>

      {!isAdmin && (
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl flex items-start gap-4">
          <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-yellow-500 font-bold">Admin Privileges Required</h3>
            <p className="text-sm text-yellow-500/80">
              You are currently viewing a preview of the admin panel. Real actions will fail unless your role is set to 'admin' in the database.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 border-t-4 border-t-neon-blue">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Users className="text-neon-blue" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Total Players</h2>
          </div>
          <p className="text-4xl font-bold text-neon-blue">1,204</p>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-neon-purple">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Gamepad2 className="text-neon-purple" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Active Games</h2>
          </div>
          <p className="text-4xl font-bold text-neon-purple">4</p>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-neon-green">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Trophy className="text-neon-green" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Scores Logged</h2>
          </div>
          <p className="text-4xl font-bold text-neon-green">45,892</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 border-b border-gaming-border pb-4 flex items-center gap-2">
            <Users size={20} className="text-neon-blue" /> Recent Signups
          </h3>
          <div className="space-y-4">
            {['PlayerOne', 'CyberPunk', 'NeonNinja', 'StarLord'].map((name, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gaming-surface rounded-lg">
                <span className="font-bold text-white">{name}</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 border-b border-gaming-border pb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" /> System Alerts
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm font-bold text-red-500">Database Connection</p>
              <p className="text-xs text-red-400">Please seed the Supabase database to unlock full functionality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
