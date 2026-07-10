"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Gamepad2, Trophy, ArrowRight, Zap, Star, Users,
  Target, Crosshair, Grid3x3, Puzzle, Bomb, Bird,
  ChevronRight, Sparkles, TrendingUp, Clock
} from "lucide-react"

const FEATURED_GAMES = [
  { id: "snake", name: "Snake", emoji: "🐍", desc: "Navigate the snake, eat food, grow longer. Don't hit the walls!", color: "from-green-500/20 to-emerald-500/10", difficulty: "Easy", players: "12.4K" },
  { id: "2048", name: "2048", emoji: "🔢", desc: "Slide numbered tiles and merge them to reach the elusive 2048.", color: "from-yellow-500/20 to-amber-500/10", difficulty: "Medium", players: "9.8K" },
  { id: "tic-tac-toe", name: "Tic Tac Toe", emoji: "⭕", desc: "Challenge the AI in this classic strategy game. Can you win?", color: "from-red-500/20 to-rose-500/10", difficulty: "Easy", players: "15.1K" },
  { id: "memory-match", name: "Memory Match", emoji: "🃏", desc: "Flip cards, find pairs, and test your memory under pressure.", color: "from-pink-500/20 to-fuchsia-500/10", difficulty: "Medium", players: "7.2K" },
  { id: "flappy-bird", name: "Flappy Bird", emoji: "🐦", desc: "Tap to fly through narrow pipe gaps. How far can you go?", color: "from-cyan-500/20 to-sky-500/10", difficulty: "Hard", players: "18.6K" },
  { id: "minesweeper", name: "Minesweeper", emoji: "💣", desc: "Clear the minefield without detonating any hidden bombs.", color: "from-gray-500/20 to-slate-500/10", difficulty: "Hard", players: "6.3K" },
]

const STATS = [
  { label: "Active Players", value: "24,500+", icon: Users },
  { label: "Games Played", value: "1.2M+", icon: Gamepad2 },
  { label: "Scores Posted", value: "890K+", icon: TrendingUp },
  { label: "Avg Session", value: "18 min", icon: Clock },
]

const STEPS = [
  { step: "01", title: "Create Account", desc: "Sign up in seconds with email — completely free.", icon: Sparkles, color: "text-neon-blue" },
  { step: "02", title: "Pick a Game", desc: "Choose from our growing library of polished mini-games.", icon: Gamepad2, color: "text-neon-purple" },
  { step: "03", title: "Compete & Climb", desc: "Set high scores, earn XP, and climb the global leaderboards.", icon: Trophy, color: "text-neon-green" },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Radial gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,71,234,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-sm font-medium mb-8"
          >
            <Sparkles size={14} />
            Free to Play — No Downloads Required
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8"
          >
            Play. Compete.
            <br />
            <span className="neon-text">Conquer.</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The ultimate browser-based gaming platform. Instant access to classic mini-games with global leaderboards, XP progression, and achievements.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/games">
              <button className="btn-glow flex items-center gap-2 group text-white">
                Start Playing <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-outline">
                Create Free Account
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ STATS BAR ═══════════════════════ */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card-static p-2 neon-border"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className={`flex flex-col items-center py-5 px-4 ${i < STATS.length - 1 ? "md:border-r border-gaming-border/30" : ""}`}>
                    <Icon size={18} className="text-neon-blue mb-2" />
                    <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-neon-blue mb-3">Getting Started</p>
            <h2 className="text-3xl sm:text-4xl font-black">How It Works</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {STEPS.map((s) => {
              const Icon = s.icon
              return (
                <motion.div key={s.step} variants={item} className="glass-card p-8 text-center group">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gaming-surface border border-gaming-border/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className={s.color} />
                  </div>
                  <span className="text-xs font-bold text-gray-600 tracking-widest">STEP {s.step}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-white">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section className="py-28 relative bg-gaming-surface/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-neon-purple mb-3">Why Nexus?</p>
            <h2 className="text-3xl sm:text-4xl font-black">Built for Gamers</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Zap, title: "Instant Play", desc: "No downloads, no installs. Jump straight into any game from your browser.", color: "text-neon-blue" },
              { icon: Trophy, title: "Global Leaderboards", desc: "Compete against players worldwide. Daily, weekly, and all-time rankings.", color: "text-neon-purple" },
              { icon: Star, title: "XP & Achievements", desc: "Earn experience, level up your profile, and unlock exclusive badges.", color: "text-neon-green" },
              { icon: Target, title: "Skill-Based", desc: "Every game rewards skill. Practice, improve, and prove you're the best.", color: "text-neon-orange" },
              { icon: Users, title: "Community", desc: "Join thousands of players in a growing competitive gaming community.", color: "text-neon-pink" },
              { icon: Sparkles, title: "Always Free", desc: "No paywalls, no subscriptions. Every game and feature is 100% free.", color: "text-neon-yellow" },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={i} variants={item} className="glass-card p-7 group">
                  <div className="w-12 h-12 rounded-xl bg-gaming-surface border border-gaming-border/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={22} className={f.color} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ GAME LIBRARY ═══════════════════════ */}
      <section className="py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-neon-green mb-3">Game Library</p>
              <h2 className="text-3xl sm:text-4xl font-black">Pick Your Challenge</h2>
            </div>
            <Link href="/games" className="flex items-center gap-1.5 text-neon-blue text-sm font-bold hover:gap-3 transition-all">
              View All Games <ChevronRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURED_GAMES.map((game) => (
              <motion.div key={game.id} variants={item}>
                <Link href={`/games/${game.id}`}>
                  <div className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col">
                    <div className={`h-36 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}>
                      <span className="text-5xl group-hover:scale-125 transition-transform duration-300">{game.emoji}</span>
                      <div className="absolute top-3 right-3">
                        <span className={`badge ${game.difficulty === "Easy" ? "badge-green" : game.difficulty === "Medium" ? "badge-orange" : "badge-purple"}`}>
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-1.5">{game.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed">{game.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Users size={12} /> {game.players} players
                        </span>
                        <span className="text-neon-blue text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Play <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="py-28 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-border p-12 sm:p-16"
          >
            <Gamepad2 size={40} className="mx-auto text-neon-purple mb-6" />
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Play?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Join thousands of players competing on Nexus. Create your free account and start climbing the leaderboards today.
            </p>
            <Link href="/register">
              <button className="btn-glow text-white flex items-center gap-2 mx-auto">
                Get Started Free <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
