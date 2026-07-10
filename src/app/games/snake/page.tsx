"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import GameWrapper from "@/components/game/GameWrapper"

// Constants
const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

type Point = { x: number, y: number }

export default function SnakeGame() {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Point>({ x: 15, y: 10 })
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 })
  const [nextDirection, setNextDirection] = useState<Point>({ x: 1, y: 0 })
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point
    let isOccupied = true
    while (isOccupied) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
      // eslint-disable-next-line no-loop-func
      isOccupied = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    }
    return newFood!
  }, [])

  const restartGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 1, y: 0 })
    setNextDirection({ x: 1, y: 0 })
    setFood({ x: 15, y: 10 })
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
  }, [])

  const handlePause = useCallback((paused: boolean) => {
    setIsPaused(paused)
  }, [])

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || isPaused) return

      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
      }

      setNextDirection(prev => {
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            return direction.y !== 1 ? { x: 0, y: -1 } : prev
          case 'ArrowDown':
          case 's':
          case 'S':
            return direction.y !== -1 ? { x: 0, y: 1 } : prev
          case 'ArrowLeft':
          case 'a':
          case 'A':
            return direction.x !== 1 ? { x: -1, y: 0 } : prev
          case 'ArrowRight':
          case 'd':
          case 'D':
            return direction.x !== -1 ? { x: 1, y: 0 } : prev
          default:
            return prev
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, gameOver, isPaused])

  // Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0]
        const currentDir = nextDirection
        setDirection(currentDir) // Lock in the direction for this tick

        const newHead = {
          x: head.x + currentDir.x,
          y: head.y + currentDir.y
        }

        // Wall collision
        if (
          newHead.x < 0 || 
          newHead.x >= GRID_SIZE || 
          newHead.y < 0 || 
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true)
          return prevSnake
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10)
          setFood(generateFood(newSnake))
          // Keep tail
        } else {
          newSnake.pop() // Remove tail
        }

        return newSnake
      })
    }

    const speed = Math.max(50, INITIAL_SPEED - (Math.floor(score / 50) * 10))
    gameLoopRef.current = setTimeout(moveSnake, speed)

    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current)
    }
  }, [snake, nextDirection, food, gameOver, isPaused, score, generateFood])

  // Rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#0a0a0f' // gaming-bg
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE)

    // Draw Grid (optional subtle lines)
    ctx.strokeStyle = '#13141f'
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw Food
    ctx.shadowBlur = 10
    ctx.shadowColor = '#00f3ff'
    ctx.fillStyle = '#00f3ff'
    ctx.beginPath()
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2, 
      food.y * CELL_SIZE + CELL_SIZE / 2, 
      CELL_SIZE / 2 - 2, 
      0, 
      2 * Math.PI
    )
    ctx.fill()
    ctx.shadowBlur = 0 // Reset shadow

    // Draw Snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ff66' : '#00cc52' // Head is brighter
      if (index === 0) {
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00ff66'
      } else {
        ctx.shadowBlur = 0
      }
      
      ctx.fillRect(
        segment.x * CELL_SIZE + 1, 
        segment.y * CELL_SIZE + 1, 
        CELL_SIZE - 2, 
        CELL_SIZE - 2
      )
    })
  }, [snake, food])

  const handleSaveScore = async (finalScore: number) => {
    // In a real app, this would call Supabase
    console.log("Saving score:", finalScore)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="snake"
        gameName="Snake"
        score={score}
        isGameOver={gameOver}
        onRestart={restartGame}
        onPause={handlePause}
        onSaveScore={handleSaveScore}
      >
        <div className="relative border-4 border-gaming-border rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,102,0.1)]">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="block"
          />
        </div>
      </GameWrapper>
      
      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 max-w-[200px] mx-auto sm:hidden">
        <div />
        <button className="p-4 glass-card flex justify-center" onClick={() => setNextDirection({x: 0, y: -1})}>↑</button>
        <div />
        <button className="p-4 glass-card flex justify-center" onClick={() => setNextDirection({x: -1, y: 0})}>←</button>
        <button className="p-4 glass-card flex justify-center" onClick={() => setNextDirection({x: 0, y: 1})}>↓</button>
        <button className="p-4 glass-card flex justify-center" onClick={() => setNextDirection({x: 1, y: 0})}>→</button>
      </div>
    </div>
  )
}
