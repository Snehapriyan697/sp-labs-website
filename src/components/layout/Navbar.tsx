"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, Trophy, User, LogIn, Menu, X, LayoutDashboard } from "lucide-react"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass border-b border-gaming-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <div className="relative">
                <div className="absolute inset-0 bg-neon-purple/30 rounded-lg blur-md" />
                <div className="relative bg-gaming-surface border border-neon-purple/30 rounded-lg p-1.5">
                  <Gamepad2 size={22} className="text-neon-purple" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-wider uppercase hidden sm:block">
                <span className="neon-text">Nexus</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl border border-neon-blue/30 bg-neon-blue/5"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right: Login + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block">
                <button className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-all duration-200">
                  <LogIn size={16} />
                  Login
                </button>
              </Link>

              <Link href="/register" className="hidden sm:block">
                <button className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_15px_rgba(179,71,234,0.2)] hover:shadow-[0_0_25px_rgba(179,71,234,0.4)] transition-all duration-200">
                  Sign Up
                </button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-gaming-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "text-white bg-neon-blue/10 border border-neon-blue/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                )
              })}

              <div className="border-t border-gaming-border/30 mt-4 pt-4 flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-semibold border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-all">
                    <LogIn size={18} />
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-neon-purple to-neon-blue text-white transition-all">
                    Sign Up Free
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
