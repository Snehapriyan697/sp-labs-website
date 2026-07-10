"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import GameWrapper from "@/components/game/GameWrapper"

const W = 400, H = 600
const PLAYER_W = 30, PLAYER_H = 20
const BULLET_R = 3, ENEMY_SIZE = 22
const PLAYER_SPEED = 5, BULLET_SPEED = 7, ENEMY_SPEED_BASE = 1.5

type Bullet = { x: number; y: number }
type Enemy = { x: number; y: number; hp: number; type: number }
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string }

export default function SpaceShooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const stateRef = useRef({
    playerX: W / 2,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    keys: {} as Record<string, boolean>,
    score: 0,
    frame: 0,
    gameOver: false,
    paused: false,
    shootCooldown: 0,
  })

  const restartGame = useCallback(() => {
    const s = stateRef.current
    s.playerX = W / 2
    s.bullets = []
    s.enemies = []
    s.particles = []
    s.keys = {}
    s.score = 0
    s.frame = 0
    s.gameOver = false
    s.paused = false
    s.shootCooldown = 0
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
  }, [])

  const handlePause = useCallback((p: boolean) => {
    stateRef.current.paused = p
    setIsPaused(p)
  }, [])

  // Input
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      stateRef.current.keys[e.key] = true
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault()
    }
    const up = (e: KeyboardEvent) => { stateRef.current.keys[e.key] = false }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up) }
  }, [])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number

    const spawnExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5
        stateRef.current.particles.push({
          x, y,
          vx: Math.cos(angle) * (2 + Math.random() * 2),
          vy: Math.sin(angle) * (2 + Math.random() * 2),
          life: 20 + Math.random() * 10,
          color,
        })
      }
    }

    const loop = () => {
      animId = requestAnimationFrame(loop)
      const s = stateRef.current

      // Background
      ctx.fillStyle = "#06060b"
      ctx.fillRect(0, 0, W, H)
      // Stars
      ctx.fillStyle = "rgba(200,210,255,0.15)"
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 97 + s.frame * 0.3) % W)
        const sy = ((i * 53 + s.frame * (0.2 + (i % 3) * 0.1)) % H)
        ctx.fillRect(sx, sy, 1.5, 1.5)
      }

      if (s.paused || s.gameOver) return

      s.frame++

      // Player movement
      if (s.keys["ArrowLeft"] || s.keys["a"]) s.playerX -= PLAYER_SPEED
      if (s.keys["ArrowRight"] || s.keys["d"]) s.playerX += PLAYER_SPEED
      s.playerX = Math.max(PLAYER_W / 2, Math.min(W - PLAYER_W / 2, s.playerX))

      // Shooting
      s.shootCooldown--
      if ((s.keys[" "] || s.keys["ArrowUp"]) && s.shootCooldown <= 0) {
        s.bullets.push({ x: s.playerX, y: H - 50 })
        s.shootCooldown = 10
      }

      // Move bullets
      for (let i = s.bullets.length - 1; i >= 0; i--) {
        s.bullets[i].y -= BULLET_SPEED
        if (s.bullets[i].y < -5) s.bullets.splice(i, 1)
      }

      // Spawn enemies
      const spawnRate = Math.max(25, 60 - Math.floor(s.score / 5))
      if (s.frame % spawnRate === 0) {
        s.enemies.push({
          x: Math.random() * (W - 40) + 20,
          y: -ENEMY_SIZE,
          hp: 1 + Math.floor(s.score / 30),
          type: Math.floor(Math.random() * 3),
        })
      }

      // Move enemies
      const espeed = ENEMY_SPEED_BASE + s.score * 0.01
      for (let i = s.enemies.length - 1; i >= 0; i--) {
        s.enemies[i].y += espeed
        // Wobble
        s.enemies[i].x += Math.sin(s.frame * 0.05 + i) * 0.8

        // Hit player
        if (s.enemies[i].y > H - 50 && Math.abs(s.enemies[i].x - s.playerX) < PLAYER_W) {
          s.gameOver = true
          setGameOver(true)
          spawnExplosion(s.playerX, H - 40, "#ff2d78")
          return
        }

        // Off screen
        if (s.enemies[i].y > H + 20) s.enemies.splice(i, 1)
      }

      // Bullet-enemy collisions
      for (let bi = s.bullets.length - 1; bi >= 0; bi--) {
        for (let ei = s.enemies.length - 1; ei >= 0; ei--) {
          if (!s.enemies[ei] || !s.bullets[bi]) continue
          const dx = s.bullets[bi].x - s.enemies[ei].x
          const dy = s.bullets[bi].y - s.enemies[ei].y
          if (Math.abs(dx) < ENEMY_SIZE && Math.abs(dy) < ENEMY_SIZE) {
            s.enemies[ei].hp--
            s.bullets.splice(bi, 1)
            if (s.enemies[ei].hp <= 0) {
              spawnExplosion(s.enemies[ei].x, s.enemies[ei].y, "#00e5ff")
              s.enemies.splice(ei, 1)
              s.score += 10
              setScore(s.score)
            }
            break
          }
        }
      }

      // Draw particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i]
        p.x += p.vx; p.y += p.vy; p.life--
        if (p.life <= 0) { s.particles.splice(i, 1); continue }
        ctx.globalAlpha = p.life / 30
        ctx.fillStyle = p.color
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4)
        ctx.globalAlpha = 1
      }

      // Draw bullets
      ctx.shadowBlur = 8
      ctx.shadowColor = "#00ff88"
      ctx.fillStyle = "#00ff88"
      for (const b of s.bullets) {
        ctx.beginPath()
        ctx.arc(b.x, b.y, BULLET_R, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Draw enemies
      const enemyColors = ["#ff2d78", "#b347ea", "#ff6b2d"]
      for (const e of s.enemies) {
        ctx.fillStyle = enemyColors[e.type] || "#ff2d78"
        ctx.shadowBlur = 8
        ctx.shadowColor = ctx.fillStyle
        // Diamond shape
        ctx.beginPath()
        ctx.moveTo(e.x, e.y - ENEMY_SIZE)
        ctx.lineTo(e.x + ENEMY_SIZE * 0.7, e.y)
        ctx.lineTo(e.x, e.y + ENEMY_SIZE * 0.6)
        ctx.lineTo(e.x - ENEMY_SIZE * 0.7, e.y)
        ctx.closePath()
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw player (triangle ship)
      ctx.shadowBlur = 12
      ctx.shadowColor = "#00e5ff"
      ctx.fillStyle = "#00e5ff"
      ctx.beginPath()
      ctx.moveTo(s.playerX, H - 55)
      ctx.lineTo(s.playerX - PLAYER_W / 2, H - 30)
      ctx.lineTo(s.playerX + PLAYER_W / 2, H - 30)
      ctx.closePath()
      ctx.fill()
      // Engine glow
      ctx.fillStyle = "#b347ea"
      ctx.shadowColor = "#b347ea"
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(s.playerX, H - 27, 4 + Math.sin(s.frame * 0.3) * 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="space-shooter"
        gameName="Space Shooter"
        score={score}
        isGameOver={gameOver}
        onRestart={restartGame}
        onPause={handlePause}
      >
        <div className="relative rounded-xl overflow-hidden border-2 border-gaming-border">
          <canvas ref={canvasRef} width={W} height={H} className="block max-w-full h-auto" />
        </div>
      </GameWrapper>
      <div className="mt-4 text-center text-xs text-gray-600">
        ← → to move &nbsp;|&nbsp; SPACE or ↑ to shoot
      </div>
    </div>
  )
}
