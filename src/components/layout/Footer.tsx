import Link from "next/link"
import { Gamepad2, Code, Share2, MessageSquare, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gaming-border/30 bg-gaming-bg/80 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="bg-gaming-surface border border-neon-purple/30 rounded-lg p-1.5">
                <Gamepad2 size={22} className="text-neon-purple" />
              </div>
              <span className="font-extrabold text-xl tracking-wider uppercase neon-text">
                Nexus Gaming
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              The ultimate browser-based gaming platform. Play classic mini-games, compete on global leaderboards, earn XP, and unlock achievements — completely free.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-5">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/games" className="hover:text-neon-blue transition-colors">Game Library</Link></li>
              <li><Link href="/leaderboard" className="hover:text-neon-blue transition-colors">Leaderboard</Link></li>
              <li><Link href="/dashboard" className="hover:text-neon-blue transition-colors">Dashboard</Link></li>
              <li><Link href="/profile" className="hover:text-neon-blue transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-5">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-gaming-surface border border-gaming-border/50 text-gray-500 hover:text-neon-blue hover:border-neon-blue/30 transition-all">
                <Share2 size={18} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-gaming-surface border border-gaming-border/50 text-gray-500 hover:text-neon-purple hover:border-neon-purple/30 transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-gaming-surface border border-gaming-border/50 text-gray-500 hover:text-neon-green hover:border-neon-green/30 transition-all">
                <Code size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gaming-border/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Nexus Gaming. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-neon-pink" /> by SP Labs
          </p>
        </div>
      </div>
    </footer>
  )
}
