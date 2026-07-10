"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import GameWrapper from "@/components/game/GameWrapper"

const CANVAS_W = 400
const CANVAS_H = 600
const BIRD_SIZE = 20
const GRAVITY = 0.35
const JUMP = -6.5
const PIPE_WIDTH = 52
const PIPE_GAP = 150
const PIPE_SPEED = 2.5

type Pipe = { x: number; topH: number }

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const birdRef = useRef({ y: CANVAS_H / 2, vel: 0 })
  const pipesRef = useRef<Pipe[]>([])
  const scoreRef = useRef(0)
  const frameRef = useRef(0)
  const animRef = useRef<number>(0)
  const gameOverRef = useRef(false)
  const pausedRef = useRef(false)
  const startedRef = useRef(false)

  const jump = useCallback(() => {
    if (gameOverRef.current) return
    if (!startedRef.current) {
      startedRef.current = true
      setStarted(true)
    }
    birdRef.current.vel = JUMP
  }, [])

  const restartGame = useCallback(() => {
    birdRef.current = { y: CANVAS_H / 2, vel: 0 }
    pipesRef.current = []
    scoreRef.current = 0
    frameRef.current = 0
    gameOverRef.current = false
    startedRef.current = false
    pausedRef.current = false
    setScore(0)
    setGameOver(false)
    setStarted(false)
    setIsPaused(false)
  }, [])

  const handlePause = useCallback((paused: boolean) => {
    pausedRef.current = paused
    setIsPaused(paused)
  }, [])

  // Input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [jump])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const loop = () => {
      animRef.current = requestAnimationFrame(loop)

      // Draw background
      const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H)
      grad.addColorStop(0, "#0a0a1a")
      grad.addColorStop(1, "#06060b")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

      // Grid lines
      ctx.strokeStyle = "rgba(30,32,53,0.4)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < CANVAS_W; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_H); ctx.stroke()
      }
      for (let i = 0; i < CANVAS_H; i += 30) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(CANVAS_W, i); ctx.stroke()
      }

      if (!startedRef.current) {
        // Draw bird
        ctx.shadowBlur = 12
        ctx.shadowColor = "#ffe14d"
        ctx.fillStyle = "#ffe14d"
        ctx.beginPath()
        ctx.arc(80, birdRef.current.y, BIRD_SIZE / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // "Tap to start" text
        ctx.fillStyle = "rgba(255,255,255,0.6)"
        ctx.font = "bold 18px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("Press SPACE or TAP to start", CANVAS_W / 2, CANVAS_H / 2 + 60)
        return
      }

      if (pausedRef.current || gameOverRef.current) return

      const bird = birdRef.current
      frameRef.current++

      // Physics
      bird.vel += GRAVITY
      bird.y += bird.vel

      // Spawn pipes
      if (frameRef.current % 90 === 0) {
        const topH = Math.random() * (CANVAS_H - PIPE_GAP - 100) + 50
        pipesRef.current.push({ x: CANVAS_W, topH })
      }

      // Move pipes & check collisions
      const pipes = pipesRef.current
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= PIPE_SPEED

        // Score
        if (Math.abs(pipes[i].x - 80) < PIPE_SPEED) {
          scoreRef.current++
          setScore(scoreRef.current)
        }

        // Collision
        const bx = 80, by = bird.y, br = BIRD_SIZE / 2
        const pLeft = pipes[i].x, pRight = pipes[i].x + PIPE_WIDTH
        const gapTop = pipes[i].topH, gapBot = pipes[i].topH + PIPE_GAP

        if (bx + br > pLeft && bx - br < pRight) {
          if (by - br < gapTop || by + br > gapBot) {
            gameOverRef.current = true
            setGameOver(true)
            return
          }
        }

        if (pipes[i].x + PIPE_WIDTH < 0) pipes.splice(i, 1)
      }

      // Floor/ceiling
      if (bird.y - BIRD_SIZE / 2 < 0 || bird.y + BIRD_SIZE / 2 > CANVAS_H) {
        gameOverRef.current = true
        setGameOver(true)
        return
      }

      // Draw pipes
      for (const pipe of pipes) {
        // Top pipe
        ctx.fillStyle = "#1e2035"
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topH)
        ctx.strokeStyle = "#00e5ff"
        ctx.lineWidth = 2
        ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topH)

        // Bottom pipe
        const botY = pipe.topH + PIPE_GAP
        ctx.fillStyle = "#1e2035"
        ctx.fillRect(pipe.x, botY, PIPE_WIDTH, CANVAS_H - botY)
        ctx.strokeStyle = "#00e5ff"
        ctx.strokeRect(pipe.x, botY, PIPE_WIDTH, CANVAS_H - botY)
      }

      // Draw bird
      ctx.shadowBlur = 15
      ctx.shadowColor = "#ffe14d"
      ctx.fillStyle = "#ffe14d"
      ctx.beginPath()
      ctx.arc(80, bird.y, BIRD_SIZE / 2, 0, Math.PI * 2)
      ctx.fill()
      // Eye
      ctx.shadowBlur = 0
      ctx.fillStyle = "#06060b"
      ctx.beginPath()
      ctx.arc(85, bird.y - 3, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="flappy-bird"
        gameName="Flappy Bird"
        score={score}
        isGameOver={gameOver}
        onRestart={restartGame}
        onPause={handlePause}
      >
        <div
          className="relative rounded-xl overflow-hidden border-2 border-gaming-border cursor-pointer"
          onClick={jump}
          onTouchStart={(e) => { e.preventDefault(); jump() }}
        >
          <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="block max-w-full h-auto" />
        </div>
      </GameWrapper>
    </div>
  )
}
