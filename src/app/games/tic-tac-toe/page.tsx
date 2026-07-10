"use client"

import { useState, useCallback, useEffect } from "react"
import GameWrapper from "@/components/game/GameWrapper"
import { motion } from "framer-motion"

type Player = 'X' | 'O' | null

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Player | 'Draw'>(null)
  const [score, setScore] = useState(0) // Win = +100, Draw = +10, Loss = 0
  const [isGameOver, setIsGameOver] = useState(false)

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner || !isXNext) return // Prevent clicking if filled, game over, or AI's turn

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsXNext(false)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setScore(s => s + 100)
      setIsGameOver(true)
    } else if (!newBoard.includes(null)) {
      setWinner('Draw')
      setScore(s => s + 10)
      setIsGameOver(true)
    }
  }

  // AI Move (Simple Random)
  useEffect(() => {
    if (!isXNext && !winner && !isGameOver) {
      const timer = setTimeout(() => {
        const availableSpots = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[]
        
        if (availableSpots.length > 0) {
          const randomIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)]
          const newBoard = [...board]
          newBoard[randomIndex] = 'O'
          setBoard(newBoard)
          setIsXNext(true)

          const newWinner = checkWinner(newBoard)
          if (newWinner) {
            setWinner(newWinner)
            setIsGameOver(true)
          } else if (!newBoard.includes(null)) {
            setWinner('Draw')
            setScore(s => s + 10)
            setIsGameOver(true)
          }
        }
      }, 500) // slight delay for AI thinking
      return () => clearTimeout(timer)
    }
  }, [isXNext, board, winner, isGameOver])

  const restartGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setIsGameOver(false)
  }, [])

  const handlePause = useCallback((paused: boolean) => {
    // Tic Tac Toe is turn-based, pause is just visual here
  }, [])

  const handleSaveScore = async (finalScore: number) => {
    console.log("Saving score:", finalScore)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="tic-tac-toe"
        gameName="Tic Tac Toe"
        score={score}
        isGameOver={isGameOver}
        onRestart={restartGame}
        onPause={handlePause}
        onSaveScore={handleSaveScore}
      >
        <div className="flex flex-col items-center">
          <div className="mb-6 text-xl font-bold neon-text">
            {winner === 'Draw' ? "It's a Draw!" : winner ? `${winner} Wins!` : isXNext ? "Your Turn (X)" : "AI's Turn (O)"}
          </div>
          
          <div className="grid grid-cols-3 gap-2 bg-gaming-border p-2 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.1)]">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: cell || !isXNext ? 1 : 1.05 }}
                whileTap={{ scale: cell || !isXNext ? 1 : 0.95 }}
                onClick={() => handleClick(index)}
                disabled={!!cell || !isXNext || !!winner}
                className="w-24 h-24 sm:w-32 sm:h-32 bg-gaming-surface rounded-lg flex items-center justify-center text-5xl sm:text-7xl font-bold transition-colors disabled:cursor-default hover:bg-gaming-surface-hover"
              >
                {cell === 'X' && <span className="text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">X</span>}
                {cell === 'O' && <span className="text-neon-red drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]">O</span>}
              </motion.button>
            ))}
          </div>
        </div>
      </GameWrapper>
    </div>
  )
}
