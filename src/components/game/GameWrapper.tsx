"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, Minimize2, RotateCcw, Pause, Play, Trophy, ArrowLeft, Keyboard } from "lucide-react"
import Link from "next/link"

interface GameWrapperProps {
  gameName: string;
  gameId: string;
  children: React.ReactNode;
  onRestart: () => void;
  onPause: (paused: boolean) => void;
  score: number;
  isGameOver: boolean;
  onSaveScore?: (score: number) => Promise<void>;
}

export default function GameWrapper({ 
  gameName, 
  gameId, 
  children, 
  onRestart, 
  onPause, 
  score, 
  isGameOver,
  onSaveScore 
}: GameWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [bestScore, setBestScore] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load best score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`nexus-best-${gameId}`)
    if (saved) setBestScore(parseInt(saved))
  }, [gameId])

  // Update best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem(`nexus-best-${gameId}`, score.toString())
    }
  }, [score, bestScore, gameId])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handlePauseToggle = () => {
    const newPausedState = !isPaused
    setIsPaused(newPausedState)
    onPause(newPausedState)
  }

  const handleRestart = () => {
    setIsPaused(false)
    onPause(false)
    onRestart()
  }

  const handleSaveScore = async () => {
    if (onSaveScore && score > 0) {
      setIsSaving(true)
      await onSaveScore(score)
      setIsSaving(false)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative glass-card-static flex flex-col overflow-hidden border border-gaming-border/40 ${
        isFullscreen ? "w-screen h-screen rounded-none z-[100] bg-gaming-bg" : "w-full"
      }`}
    >
      {/* Game Header Bar */}
      <div className="w-full z-10 px-4 py-3 flex justify-between items-center bg-gaming-surface/80 border-b border-gaming-border/30 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/games" className="p-1.5 text-gray-600 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <ArrowLeft size={16} />
          </Link>
          <h2 className="text-sm font-bold text-white tracking-wider uppercase">
            {gameName}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-500">
            BEST: <span className="text-neon-green font-bold">{bestScore.toLocaleString()}</span>
          </div>
          <div className="text-sm font-mono font-bold text-neon-blue">
            {score.toLocaleString().padStart(4, ' ')}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-grow flex items-center justify-center relative bg-black/20 min-h-[400px]">
        {children}

        {/* Overlays */}
        <AnimatePresence>
          {isPaused && !isGameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20"
            >
              <div className="text-center glass-card-static p-8 border border-gaming-border/30">
                <Pause size={32} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-6 tracking-widest">PAUSED</h3>
                <button 
                  onClick={handlePauseToggle}
                  className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(179,71,234,0.3)] transition-all"
                >
                  RESUME
                </button>
              </div>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-30"
            >
              <div className="glass-card-static p-8 text-center border border-gaming-border/40 max-w-sm w-full mx-4">
                <h3 className="text-2xl font-black text-red-400 mb-1">GAME OVER</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {score > bestScore - score ? "🎉 New Personal Best!" : "Better luck next time!"}
                </p>
                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-black text-neon-blue">{score.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-neon-green">{bestScore.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Best</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <button 
                    onClick={handleRestart}
                    className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(179,71,234,0.3)] transition-all flex justify-center items-center gap-2"
                  >
                    <RotateCcw size={16} /> Play Again
                  </button>
                  
                  {onSaveScore && (
                    <button 
                      onClick={handleSaveScore}
                      disabled={isSaving || score === 0}
                      className="w-full py-3 bg-gaming-surface border border-neon-green/30 text-neon-green font-bold rounded-xl hover:bg-neon-green/5 transition-all flex justify-center items-center gap-2 disabled:opacity-40"
                    >
                      <Trophy size={16} /> {isSaving ? "Saving..." : "Submit Score"}
                    </button>
                  )}

                  <Link href="/games" className="text-xs text-gray-500 hover:text-white mt-1 transition-colors">
                    ← Back to Games
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Controls Footer */}
      <div className="h-12 bg-gaming-surface/80 border-t border-gaming-border/30 flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handlePauseToggle}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button 
            onClick={handleRestart}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Restart Game"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="text-xs text-gray-600 hidden sm:flex items-center gap-1.5">
          <Keyboard size={12} /> Keyboard or Touch
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
