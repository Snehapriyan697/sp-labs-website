"use client"

import { useState, useCallback } from "react"
import GameWrapper from "@/components/game/GameWrapper"
import { motion } from "framer-motion"
import { Flag, Bomb } from "lucide-react"

type CellState = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

const DIFFICULTIES = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 30 },
  hard: { rows: 16, cols: 16, mines: 60 },
} as const

type Difficulty = keyof typeof DIFFICULTIES

export default function MinesweeperGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [board, setBoard] = useState<CellState[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [flagCount, setFlagCount] = useState(0)

  const { rows, cols, mines } = DIFFICULTIES[difficulty]

  const createBoard = useCallback((diff: Difficulty, safeR?: number, safeC?: number) => {
    const { rows: r, cols: c, mines: m } = DIFFICULTIES[diff]
    const grid: CellState[][] = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => ({
        isMine: false, isRevealed: false, isFlagged: false, adjacentMines: 0,
      }))
    )

    // Place mines
    let placed = 0
    while (placed < m) {
      const mr = Math.floor(Math.random() * r)
      const mc = Math.floor(Math.random() * c)
      if (grid[mr][mc].isMine) continue
      // Don't place mine on safe cell or its neighbors
      if (safeR !== undefined && safeC !== undefined && Math.abs(mr - safeR) <= 1 && Math.abs(mc - safeC) <= 1) continue
      grid[mr][mc].isMine = true
      placed++
    }

    // Count adjacents
    for (let row = 0; row < r; row++) {
      for (let col = 0; col < c; col++) {
        if (grid[row][col].isMine) continue
        let count = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr, nc = col + dc
            if (nr >= 0 && nr < r && nc >= 0 && nc < c && grid[nr][nc].isMine) count++
          }
        }
        grid[row][col].adjacentMines = count
      }
    }

    return grid
  }, [])

  const restartGame = useCallback(() => {
    setBoard([])
    setGameOver(false)
    setWon(false)
    setScore(0)
    setStarted(false)
    setFlagCount(0)
  }, [])

  const flood = (grid: CellState[][], r: number, c: number, rCount: number, cCount: number) => {
    if (r < 0 || r >= rCount || c < 0 || c >= cCount) return
    if (grid[r][c].isRevealed || grid[r][c].isFlagged || grid[r][c].isMine) return
    grid[r][c].isRevealed = true
    if (grid[r][c].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          flood(grid, r + dr, c + dc, rCount, cCount)
        }
      }
    }
  }

  const handleClick = (r: number, c: number) => {
    if (gameOver || won) return

    let currentBoard: CellState[][]

    if (!started) {
      currentBoard = createBoard(difficulty, r, c)
      setStarted(true)
    } else {
      currentBoard = board.map(row => row.map(cell => ({ ...cell })))
    }

    if (currentBoard[r][c].isFlagged || currentBoard[r][c].isRevealed) return

    if (currentBoard[r][c].isMine) {
      // Reveal all mines
      for (let row of currentBoard) for (let cell of row) { if (cell.isMine) cell.isRevealed = true }
      setBoard(currentBoard)
      setGameOver(true)
      return
    }

    flood(currentBoard, r, c, rows, cols)

    // Calculate score
    const revealed = currentBoard.flat().filter(c => c.isRevealed && !c.isMine).length
    setScore(revealed * 5)

    // Check win
    const totalSafe = rows * cols - mines
    if (revealed === totalSafe) {
      setWon(true)
      setScore(revealed * 10 + mines * 50) // Bonus for winning
      setGameOver(true)
    }

    setBoard(currentBoard)
  }

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault()
    if (gameOver || won || !started) return

    const newBoard = board.map(row => row.map(cell => ({ ...cell })))
    if (newBoard[r][c].isRevealed) return

    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged
    setFlagCount(newBoard.flat().filter(c => c.isFlagged).length)
    setBoard(newBoard)
  }

  const getNumberColor = (n: number) => {
    const colors = ["", "text-neon-blue", "text-neon-green", "text-neon-orange", "text-neon-purple", "text-neon-red", "text-cyan-300", "text-white", "text-gray-400"]
    return colors[n] || "text-white"
  }

  const displayBoard = started ? board : Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false, isRevealed: false, isFlagged: false, adjacentMines: 0,
    }))
  )

  const cellSize = difficulty === "hard" ? "w-7 h-7 text-xs" : difficulty === "medium" ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="minesweeper"
        gameName="Minesweeper"
        score={score}
        isGameOver={gameOver}
        onRestart={restartGame}
        onPause={() => {}}
      >
        <div className="flex flex-col items-center py-6 gap-4">
          {/* Difficulty selector */}
          <div className="flex gap-2">
            {(Object.keys(DIFFICULTIES) as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => { setDifficulty(d); restartGame() }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  difficulty === d
                    ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                    : "bg-gaming-surface text-gray-500 border border-gaming-border hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Info bar */}
          <div className="flex gap-6 text-sm font-bold">
            <span className="flex items-center gap-1.5 text-neon-orange">
              <Bomb size={14} /> {mines - flagCount}
            </span>
            <span className="flex items-center gap-1.5 text-neon-blue">
              <Flag size={14} /> {flagCount}
            </span>
          </div>

          {/* Board */}
          <div
            className="inline-grid gap-0.5 bg-gaming-border/50 p-1 rounded-xl"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {displayBoard.map((row, r) =>
              row.map((cell, c) => (
                <motion.button
                  key={`${r}-${c}`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                  className={`${cellSize} rounded-md flex items-center justify-center font-bold transition-all select-none ${
                    cell.isRevealed
                      ? cell.isMine
                        ? "bg-neon-red/20 border border-neon-red/40"
                        : "bg-gaming-bg border border-gaming-border/30"
                      : "bg-gaming-surface-hover border border-gaming-border hover:bg-gaming-surface hover:border-neon-blue/30 cursor-pointer"
                  }`}
                  disabled={cell.isRevealed || gameOver}
                >
                  {cell.isRevealed && cell.isMine && <Bomb size={14} className="text-neon-red" />}
                  {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && (
                    <span className={getNumberColor(cell.adjacentMines)}>{cell.adjacentMines}</span>
                  )}
                  {!cell.isRevealed && cell.isFlagged && <Flag size={12} className="text-neon-orange" />}
                </motion.button>
              ))
            )}
          </div>

          {won && (
            <div className="text-neon-green font-bold text-lg animate-pulse">🎉 You Won!</div>
          )}

          <p className="text-xs text-gray-600">Left click to reveal &nbsp;|&nbsp; Right click to flag</p>
        </div>
      </GameWrapper>
    </div>
  )
}
