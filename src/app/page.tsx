"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Gamepad2, Trophy, ArrowRight, Zap, Star, Shield } from "lucide-react"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-bg/50 via-gaming-bg/80 to-gaming-bg" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 inline-flex items-center justify-center p-4 glass rounded-full neon-border"
          >
            <Gamepad2 size={48} className="text-neon-blue" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Enter the <span className="neon-text">Nexus</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            The ultimate competitive gaming platform. Play retro classics, climb the global leaderboards, and unlock exclusive achievements.
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/games">
              <button className="px-8 py-4 rounded-xl font-bold text-lg bg-neon-purple text-white shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] transition-all flex items-center gap-2 group">
                Play Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/register">
              <button className="px-8 py-4 rounded-xl font-bold text-lg glass-card hover:bg-gaming-surface-hover transition-all">
                Create Account
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="glass-card p-8 text-center group">
              <div className="w-16 h-16 mx-auto bg-neon-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={32} className="text-neon-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Play</h3>
              <p className="text-gray-400">Jump right into browser-based games instantly. No downloads, no waiting.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 text-center group">
              <div className="w-16 h-16 mx-auto bg-neon-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy size={32} className="text-neon-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Rankings</h3>
              <p className="text-gray-400">Compete against players worldwide. Climb the daily, weekly, and all-time leaderboards.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 text-center group">
              <div className="w-16 h-16 mx-auto bg-neon-green/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star size={32} className="text-neon-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">XP & Achievements</h3>
              <p className="text-gray-400">Earn coins, level up your profile, and unlock exclusive badges to show off your skills.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Games Preview */}
      <section className="py-24 relative bg-gaming-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured <span className="neon-text">Games</span></h2>
              <p className="text-gray-400">Our most popular classics</p>
            </div>
            <Link href="/games" className="hidden sm:flex items-center gap-2 text-neon-blue hover:text-white transition-colors">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'snake', name: 'Snake', color: 'bg-green-500/20', border: 'hover:border-green-500' },
              { id: '2048', name: '2048', color: 'bg-yellow-500/20', border: 'hover:border-yellow-500' },
              { id: 'space-shooter', name: 'Space Shooter', color: 'bg-blue-500/20', border: 'hover:border-blue-500' },
            ].map((game) => (
              <Link href={`/games/${game.id}`} key={game.id}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className={`glass rounded-xl overflow-hidden cursor-pointer transition-colors ${game.border}`}
                >
                  <div className={`h-48 ${game.color} flex items-center justify-center`}>
                    <Gamepad2 size={64} className="opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield size={16} /> Multiplayer Leaderboard
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
