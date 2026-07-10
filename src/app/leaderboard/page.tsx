import { createClient } from "@/utils/supabase/server"
import { Trophy, Medal, Star } from "lucide-react"

export default async function LeaderboardPage() {
  const supabase = await createClient()

  // Fetch top scores
  // Because we don't have real data yet, we will fetch and fall back to mock data
  const { data: scores } = await supabase
    .from('scores')
    .select(`
      score,
      game_id,
      profiles ( username )
    `)
    .order('score', { ascending: false })
    .limit(10)

  // Mock data for visual purposes if DB is empty
  const displayScores = scores && scores.length > 0 ? scores : [
    { score: 95000, game_id: 'snake', profiles: { username: 'NeonNinja' } },
    { score: 82400, game_id: '2048', profiles: { username: 'CyberPunk' } },
    { score: 75000, game_id: 'space-shooter', profiles: { username: 'StarLord' } },
    { score: 62000, game_id: 'snake', profiles: { username: 'PixelKing' } },
    { score: 54300, game_id: 'memory-match', profiles: { username: 'Brainiac' } },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 neon-text flex items-center justify-center gap-4">
          <Trophy className="text-neon-purple" size={48} />
          Global Leaderboard
          <Trophy className="text-neon-purple" size={48} />
        </h1>
        <p className="text-gray-400">The best players across the Nexus.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gaming-surface border-b border-gaming-border font-bold text-gray-400 text-sm tracking-wider uppercase">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-3">Game</div>
          <div className="col-span-2 text-right pr-4">Score</div>
        </div>

        <div className="divide-y divide-gaming-border">
          {displayScores.map((entry: any, index: number) => (
            <div 
              key={index} 
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gaming-surface/50 transition-colors"
            >
              <div className="col-span-2 flex justify-center">
                {index === 0 ? (
                  <Medal className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" size={32} />
                ) : index === 1 ? (
                  <Medal className="text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]" size={28} />
                ) : index === 2 ? (
                  <Medal className="text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]" size={28} />
                ) : (
                  <span className="text-xl font-bold text-gray-500">#{index + 1}</span>
                )}
              </div>
              
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gaming-surface border border-neon-blue flex items-center justify-center">
                  <Star size={14} className="text-neon-blue" />
                </div>
                <span className="font-bold text-white">{entry.profiles?.username || 'Unknown'}</span>
              </div>
              
              <div className="col-span-3 text-gray-400 capitalize">
                {entry.game_id.replace('-', ' ')}
              </div>
              
              <div className="col-span-2 text-right pr-4 font-mono font-bold text-neon-green">
                {entry.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
