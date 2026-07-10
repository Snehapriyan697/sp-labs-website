import Link from "next/link"
import { Gamepad2, Code, Share2, MessageSquare } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass border-t border-gaming-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 size={24} className="text-neon-purple" />
              <span className="font-bold text-xl neon-text uppercase">Nexus Gaming</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              The ultimate futuristic gaming platform. Play mini-games, compete on leaderboards, earn XP, and unlock achievements.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/games" className="hover:text-neon-blue transition-colors">Games</Link></li>
              <li><Link href="/leaderboard" className="hover:text-neon-blue transition-colors">Leaderboard</Link></li>
              <li><Link href="/profile" className="hover:text-neon-blue transition-colors">Profile</Link></li>
              <li><Link href="/achievements" className="hover:text-neon-blue transition-colors">Achievements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 glass-card hover:text-neon-blue"><Share2 size={20} /></a>
              <a href="#" className="p-2 glass-card hover:text-neon-purple"><MessageSquare size={20} /></a>
              <a href="#" className="p-2 glass-card hover:text-neon-green"><Code size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gaming-border text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Nexus Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
