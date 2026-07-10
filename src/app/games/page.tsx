import Link from "next/link"
import { Gamepad2, ArrowRight } from "lucide-react"

const GAMES = [
  { id: 'snake', name: 'Snake', desc: 'The classic snake game.', color: 'bg-green-500/20', border: 'hover:border-green-500' },
  { id: '2048', name: '2048', desc: 'Slide tiles to reach 2048.', color: 'bg-yellow-500/20', border: 'hover:border-yellow-500' },
  { id: 'memory-match', name: 'Memory Match', desc: 'Test your memory.', color: 'bg-pink-500/20', border: 'hover:border-pink-500' },
  { id: 'flappy-bird', name: 'Flappy Bird', desc: 'Fly through the pipes.', color: 'bg-cyan-500/20', border: 'hover:border-cyan-500' },
  { id: 'space-shooter', name: 'Space Shooter', desc: 'Defend the galaxy.', color: 'bg-indigo-500/20', border: 'hover:border-indigo-500' },
  { id: 'tic-tac-toe', name: 'Tic Tac Toe', desc: 'Classic X and O.', color: 'bg-red-500/20', border: 'hover:border-red-500' },
  { id: 'minesweeper', name: 'Minesweeper', desc: 'Clear the minefield.', color: 'bg-gray-500/20', border: 'hover:border-gray-500' }
]

export default function GamesDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 neon-text">Game Library</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose a game, set a high score, and climb the leaderboards. More games are added regularly!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {GAMES.map((game) => (
          <Link href={`/games/${game.id}`} key={game.id}>
            <div className={`glass-card h-full flex flex-col cursor-pointer transition-all ${game.border} group`}>
              <div className={`h-40 ${game.color} rounded-t-xl flex items-center justify-center`}>
                <Gamepad2 size={48} className="opacity-70 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-white">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{game.desc}</p>
                <div className="flex items-center text-neon-blue text-sm font-bold group-hover:translate-x-2 transition-transform">
                  Play Now <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
