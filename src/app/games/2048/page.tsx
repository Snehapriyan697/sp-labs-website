"use client"

import { useState, useCallback, useEffect } from "react"
import GameWrapper from "@/components/game/GameWrapper"
import { motion, AnimatePresence } from "framer-motion"

const GRID_SIZE = 4

export default function Game2048() {
  const [grid, setGrid] = useState<number[][]>(Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(0)))
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Initialize game
  useEffect(() => {
    restartGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addRandomTile = (currentGrid: number[][]) => {
    const emptyCells: {r: number, c: number}[] = []
    currentGrid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === 0) emptyCells.push({r, c})
      })
    })

    if (emptyCells.length === 0) return currentGrid

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const newGrid = currentGrid.map(row => [...row])
    newGrid[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4
    return newGrid
  }

  const restartGame = useCallback(() => {
    let newGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0))
    newGrid = addRandomTile(newGrid)
    newGrid = addRandomTile(newGrid)
    setGrid(newGrid)
    setScore(0)
    setIsGameOver(false)
    setIsPaused(false)
  }, [])

  const handlePause = useCallback((paused: boolean) => {
    setIsPaused(paused)
  }, [])

  const handleSaveScore = async (finalScore: number) => {
    console.log("Saving score:", finalScore)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const checkGameOver = (currentGrid: number[][]) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c] === 0) return false
        if (r < GRID_SIZE - 1 && currentGrid[r][c] === currentGrid[r+1][c]) return false
        if (c < GRID_SIZE - 1 && currentGrid[r][c] === currentGrid[r][c+1]) return false
      }
    }
    return true
  }

  const move = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (isGameOver || isPaused) return

    let newGrid = grid.map(row => [...row])
    let newScore = score
    let moved = false

    const slideAndMerge = (line: number[]) => {
      let newLine = line.filter(val => val !== 0)
      for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i+1]) {
          newLine[i] *= 2
          newScore += newLine[i]
          newLine.splice(i + 1, 1)
        }
      }
      while (newLine.length < GRID_SIZE) {
        newLine.push(0)
      }
      return newLine
    }

    if (direction === 'LEFT' || direction === 'RIGHT') {
      for (let r = 0; r < GRID_SIZE; r++) {
        let row = newGrid[r]
        if (direction === 'RIGHT') row.reverse()
        const newRow = slideAndMerge(row)
        if (direction === 'RIGHT') newRow.reverse()
        if (newGrid[r].join(',') !== newRow.join(',')) moved = true
        newGrid[r] = newRow
      }
    } else if (direction === 'UP' || direction === 'DOWN') {
      for (let c = 0; c < GRID_SIZE; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]]
        if (direction === 'DOWN') col.reverse()
        const newCol = slideAndMerge(col)
        if (direction === 'DOWN') newCol.reverse()
        for (let r = 0; r < GRID_SIZE; r++) {
          if (newGrid[r][c] !== newCol[r]) moved = true
          newGrid[r][c] = newCol[r]
        }
      }
    }

    if (moved) {
      newGrid = addRandomTile(newGrid)
      setGrid(newGrid)
      setScore(newScore)
      if (checkGameOver(newGrid)) {
        setIsGameOver(true)
      }
    }
  }, [grid, score, isGameOver, isPaused])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
      }
      switch (e.key) {
        case 'ArrowUp': case 'w': move('UP'); break;
        case 'ArrowDown': case 's': move('DOWN'); break;
        case 'ArrowLeft': case 'a': move('LEFT'); break;
        case 'ArrowRight': case 'd': move('RIGHT'); break;
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move])

  const getTileColor = (value: number) => {
    switch (value) {
      case 2: return 'bg-gray-800 text-gray-300'
      case 4: return 'bg-gray-700 text-white'
      case 8: return 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]'
      case 16: return 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.6)]'
      case 32: return 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.7)]'
      case 64: return 'bg-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.8)]'
      case 128: return 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.9)]'
      case 256: return 'bg-yellow-400 text-black shadow-[0_0_35px_rgba(250,204,21,1)]'
      case 512: return 'bg-yellow-300 text-black shadow-[0_0_40px_rgba(253,224,71,1)]'
      case 1024: return 'bg-yellow-200 text-black shadow-[0_0_45px_rgba(254,240,138,1)]'
      case 2048: return 'bg-white text-black shadow-[0_0_50px_rgba(255,255,255,1)]'
      default: return 'bg-gaming-surface border border-gaming-border'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="2048"
        gameName="2048"
        score={score}
        isGameOver={isGameOver}
        onRestart={restartGame}
        onPause={handlePause}
        onSaveScore={handleSaveScore}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-gaming-border p-3 rounded-2xl">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {grid.map((row, r) => 
                row.map((val, c) => (
                  <div 
                    key={`${r}-${c}`}
                    className={`w-16 h-16 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center text-2xl sm:text-4xl font-bold transition-all duration-200 ${getTileColor(val)}`}
                  >
                    <AnimatePresence>
                      {val > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          {val}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </GameWrapper>
      
      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 max-w-[200px] mx-auto sm:hidden">
        <div />
        <button className="p-4 glass-card flex justify-center active:bg-white/10" onClick={() => move('UP')}>↑</button>
        <div />
        <button className="p-4 glass-card flex justify-center active:bg-white/10" onClick={() => move('LEFT')}>←</button>
        <button className="p-4 glass-card flex justify-center active:bg-white/10" onClick={() => move('DOWN')}>↓</button>
        <button className="p-4 glass-card flex justify-center active:bg-white/10" onClick={() => move('RIGHT')}>→</button>
      </div>
    </div>
  )
}
