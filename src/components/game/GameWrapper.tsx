"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, Minimize2, Volume2, VolumeX, RotateCcw, Pause, Play, Trophy } from "lucide-react"

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
  const [isMuted, setIsMuted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
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
      className={`relative glass-card flex flex-col overflow-hidden ${
        isFullscreen ? "w-screen h-screen rounded-none z-[100] bg-gaming-bg" : "w-full aspect-video min-h-[500px]"
      }`}
    >
      {/* Game Header Bar */}
      <div className="absolute top-0 w-full z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <h2 className="text-xl font-bold text-white tracking-widest uppercase pointer-events-auto">
          {gameName}
        </h2>
        <div className="flex items-center gap-4 font-mono text-xl font-bold text-neon-blue pointer-events-auto">
          SCORE: {score.toString().padStart(6, '0')}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-grow flex items-center justify-center relative bg-black/40">
        {children}

        {/* Overlays (Pause / Game Over) */}
        <AnimatePresence>
          {isPaused && !isGameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20"
            >
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-6 tracking-widest">PAUSED</h3>
                <button 
                  onClick={handlePauseToggle}
                  className="px-8 py-3 bg-neon-blue text-black font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  RESUME
                </button>
              </div>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30"
            >
              <div className="glass p-8 text-center border-neon-purple/50 max-w-sm w-full">
                <h3 className="text-3xl font-bold text-red-500 mb-2">GAME OVER</h3>
                <p className="text-xl text-gray-300 mb-6">Final Score: <span className="text-neon-blue font-bold">{score}</span></p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleRestart}
                    className="w-full py-3 bg-neon-purple text-white font-bold rounded-xl hover:shadow-[0_0_15px_rgba(188,19,254,0.4)] transition-all flex justify-center items-center gap-2"
                  >
                    <RotateCcw size={18} /> Play Again
                  </button>
                  
                  {onSaveScore && (
                    <button 
                      onClick={handleSaveScore}
                      disabled={isSaving || score === 0}
                      className="w-full py-3 bg-gaming-surface border border-neon-blue/30 text-neon-blue font-bold rounded-xl hover:bg-neon-blue/10 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      <Trophy size={18} /> {isSaving ? "Saving..." : "Submit Score"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Controls Footer */}
      <div className="h-14 bg-gaming-surface border-t border-gaming-border flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePauseToggle}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button 
            onClick={handleRestart}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Restart Game"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="text-xs text-gray-500 hidden sm:block">
          Use Keyboard or Touch to Play
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}
