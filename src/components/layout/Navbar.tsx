"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Gamepad2, Trophy, User, LogIn } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/games", label: "Games", icon: Gamepad2 },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b-0 border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="text-neon-purple"
            >
              <Gamepad2 size={32} />
            </motion.div>
            <span className="font-bold text-2xl tracking-wider neon-text uppercase hidden sm:block">
              Nexus
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-blue ${
                    isActive ? "text-neon-blue" : "text-gray-400"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 h-0.5 bg-neon-blue w-8 rounded-t-full shadow-[0_0_10px_#00f3ff]"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* We will add actual auth check later */}
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card px-4 py-2 flex items-center gap-2 text-sm font-semibold hover:border-neon-purple hover:shadow-[0_0_15px_rgba(188,19,254,0.3)]"
              >
                <LogIn size={16} className="text-neon-purple" />
                Login
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
