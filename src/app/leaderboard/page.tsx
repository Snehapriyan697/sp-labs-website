import { createClient } from "@/utils/supabase/server"
import { Trophy, Medal, Star, Crown } from "lucide-react"

const MOCK_SCORES = [
  { score: 95200, game_id: "flappy-bird", profiles: { username: "NeonNinja" } },
  { score: 82400, game_id: "2048", profiles: { username: "CyberPunk" } },
  { score: 75000, game_id: "space-shooter", profiles: { username: "StarLord" } },
  { score: 62100, game_id: "snake", profiles: { username: "PixelKing" } },
  { score: 54300, game_id: "minesweeper", profiles: { username: "Brainiac" } },
  { score: 48900, game_id: "memory-match", profiles: { username: "QuickMind" } },
  { score: 41200, game_id: "tic-tac-toe", profiles: { username: "Strategist" } },
  { score: 38700, game_id: "flappy-bird", profiles: { username: "SkyRunner" } },
  { score: 35100, game_id: "2048", profiles: { username: "TileMaster" } },
  { score: 29800, game_id: "snake", profiles: { username: "CoilKing" } },
]

const GAME_EMOJIS: Record<string, string> = {
  snake: "🐍", "2048": "🔢", "tic-tac-toe": "⭕", "memory-match": "🃏",
  "flappy-bird": "🐦", "space-shooter": "🚀", minesweeper: "💣",
}

export default async function LeaderboardPage() {
  const supabase = await createClient()

  const { data: scores } = await supabase
    .from("scores")
    .select(`score, game_id, profiles ( username )`)
    .order("score", { ascending: false })
    .limit(10)

  const displayScores = scores && scores.length > 0 ? scores : MOCK_SCORES

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-neon-purple mb-3">Rankings</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Global <span className="neon-text">Leaderboard</span>
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          The top players across all games. Set a high score to claim your spot.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 mb-10 max-w-lg mx-auto">
        {[1, 0, 2].map((idx) => {
          const entry = displayScores[idx] as any
          if (!entry) return null
          const isFirst = idx === 0
          return (
            <div key={idx} className={`glass-card-static p-4 text-center border ${isFirst ? "border-neon-yellow/30 -mt-4" : "border-gaming-border/30 mt-2"}`}>
              <div className={`text-2xl mb-2 ${isFirst ? "text-3xl" : ""}`}>
                {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
              </div>
              <p className="font-bold text-white text-sm truncate">{entry.profiles?.username}</p>
              <p className="text-xs text-gray-500 mt-1">{GAME_EMOJIS[entry.game_id] || ""} {entry.game_id.replace("-", " ")}</p>
              <p className="text-lg font-black text-neon-green mt-2">{entry.score.toLocaleString()}</p>
            </div>
          )
        })}
      </div>

      {/* Full Table */}
      <div className="glass-card-static overflow-hidden border border-gaming-border/30">
        <div className="grid grid-cols-12 gap-2 p-4 bg-gaming-surface/50 border-b border-gaming-border/20 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-3">Game</div>
          <div className="col-span-3 text-right pr-2">Score</div>
        </div>

        <div className="divide-y divide-gaming-border/15">
          {displayScores.map((entry: any, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-white/[0.02] transition-colors">
              <div className="col-span-1 text-center">
                {index < 3 ? (
                  <span className="text-lg">{["🥇", "🥈", "🥉"][index]}</span>
                ) : (
                  <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                )}
              </div>

              <div className="col-span-5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gaming-surface border border-gaming-border flex items-center justify-center">
                  <Star size={12} className="text-neon-blue" />
                </div>
                <span className="font-bold text-white text-sm truncate">{entry.profiles?.username || "Unknown"}</span>
              </div>

              <div className="col-span-3 text-gray-500 text-sm flex items-center gap-1.5">
                <span>{GAME_EMOJIS[entry.game_id] || "🎮"}</span>
                <span className="capitalize truncate">{entry.game_id.replace("-", " ")}</span>
              </div>

              <div className="col-span-3 text-right pr-2 font-mono font-bold text-neon-green text-sm">
                {entry.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
