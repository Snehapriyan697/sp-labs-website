"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users } from "lucide-react"

const GAMES = [
  { id: "snake", name: "Snake", emoji: "🐍", desc: "Navigate the snake, eat food, and grow longer without hitting walls or yourself.", color: "from-green-500/20 to-emerald-500/10", difficulty: "Easy", players: "12.4K", category: "Arcade" },
  { id: "2048", name: "2048", emoji: "🔢", desc: "Slide numbered tiles on a grid, merging them together to reach the tile 2048.", color: "from-yellow-500/20 to-amber-500/10", difficulty: "Medium", players: "9.8K", category: "Puzzle" },
  { id: "tic-tac-toe", name: "Tic Tac Toe", emoji: "⭕", desc: "Classic X and O strategy game. Challenge our AI across three difficulty levels.", color: "from-red-500/20 to-rose-500/10", difficulty: "Easy", players: "15.1K", category: "Strategy" },
  { id: "memory-match", name: "Memory Match", emoji: "🃏", desc: "Flip cards to find matching pairs. Test your memory and beat the clock.", color: "from-pink-500/20 to-fuchsia-500/10", difficulty: "Medium", players: "7.2K", category: "Puzzle" },
  { id: "flappy-bird", name: "Flappy Bird", emoji: "🐦", desc: "Tap to fly through narrow gaps between pipes. One hit and you're out!", color: "from-cyan-500/20 to-sky-500/10", difficulty: "Hard", players: "18.6K", category: "Arcade" },
  { id: "space-shooter", name: "Space Shooter", emoji: "🚀", desc: "Defend the galaxy! Shoot down waves of alien enemies in this fast-paced shooter.", color: "from-indigo-500/20 to-violet-500/10", difficulty: "Hard", players: "11.3K", category: "Action" },
  { id: "minesweeper", name: "Minesweeper", emoji: "💣", desc: "Clear the minefield by revealing safe squares. Flag the bombs, don't detonate them.", color: "from-gray-500/20 to-slate-500/10", difficulty: "Hard", players: "6.3K", category: "Strategy" },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
}

export default function GamesDirectoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-widest text-neon-blue mb-3">Game Library</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Choose Your <span className="neon-text">Challenge</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {GAMES.length} games available. Pick one, set a high score, and climb the global leaderboards.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {GAMES.map((game) => (
          <motion.div key={game.id} variants={item}>
            <Link href={`/games/${game.id}`}>
              <div className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col">
                <div className={`h-40 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}>
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
                    {game.emoji}
                  </span>
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${
                      game.difficulty === "Easy" ? "badge-green" :
                      game.difficulty === "Medium" ? "badge-orange" : "badge-purple"
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-blue">{game.category}</span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-1.5">{game.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed">{game.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gaming-border/30">
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
  )
}
