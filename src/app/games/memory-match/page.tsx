"use client"

import { useState, useCallback, useEffect } from "react"
import GameWrapper from "@/components/game/GameWrapper"
import { motion } from "framer-motion"
import { 
  Gamepad2, Cpu, Rocket, Ghost, Sword, Shield, 
  Crown, Zap, Flame, Star, Hexagon, Triangle 
} from "lucide-react"

const ICONS = [
  Gamepad2, Cpu, Rocket, Ghost, Sword, Shield, 
  Crown, Zap, Flame, Star, Hexagon, Triangle
]

type CardType = {
  id: number
  iconIndex: number
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const initializeGame = useCallback(() => {
    // Select 8 pairs (16 cards total)
    const selectedIcons = ICONS.slice(0, 8)
    const deck = [...selectedIcons, ...selectedIcons].map((_, index) => ({
      id: index,
      iconIndex: index % 8,
      isFlipped: false,
      isMatched: false
    }))

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]
    }

    setCards(deck)
    setFlippedIndices([])
    setScore(0)
    setMoves(0)
    setIsGameOver(false)
    setIsPaused(false)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleCardClick = (index: number) => {
    if (isPaused || isGameOver || cards[index].isFlipped || cards[index].isMatched) return
    if (flippedIndices.length === 2) return // Wait for animation

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1)
      const [firstIndex, secondIndex] = newFlippedIndices
      
      if (newCards[firstIndex].iconIndex === newCards[secondIndex].iconIndex) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...newCards]
          matchedCards[firstIndex].isMatched = true
          matchedCards[secondIndex].isMatched = true
          setCards(matchedCards)
          setFlippedIndices([])
          
          // Calculate score based on moves (fewer moves = more points)
          setScore(s => s + Math.max(10, 50 - (moves * 2)))

          // Check if game over
          if (matchedCards.every(c => c.isMatched)) {
            setIsGameOver(true)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards]
          resetCards[firstIndex].isFlipped = false
          resetCards[secondIndex].isFlipped = false
          setCards(resetCards)
          setFlippedIndices([])
          setScore(s => Math.max(0, s - 5)) // Penalty for wrong guess
        }, 1000)
      }
    }
  }

  const handleSaveScore = async (finalScore: number) => {
    console.log("Saving score:", finalScore)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <GameWrapper
        gameId="memory-match"
        gameName="Memory Match"
        score={score}
        isGameOver={isGameOver}
        onRestart={initializeGame}
        onPause={setIsPaused}
        onSaveScore={handleSaveScore}
      >
        <div className="flex flex-col items-center py-8">
          <div className="mb-6 flex gap-8 text-xl font-bold neon-text">
            <span>Moves: {moves}</span>
            <span>Pairs: {cards.filter(c => c.isMatched).length / 2} / 8</span>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 glass-card border-neon-purple/30">
            {cards.map((card, index) => {
              const Icon = ICONS[card.iconIndex]
              return (
                <div 
                  key={card.id}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 perspective-1000"
                  onClick={() => handleCardClick(index)}
                >
                  <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    initial={false}
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Front (Hidden) */}
                    <div className="absolute w-full h-full backface-hidden bg-gaming-surface border-2 border-gaming-border hover:border-neon-purple/50 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-gaming-border/50" />
                    </div>

                    {/* Back (Revealed) */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gaming-surface-hover border-2 border-neon-blue rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                      <Icon 
                        size={32} 
                        className={card.isMatched ? "text-neon-green" : "text-neon-blue"} 
                      />
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </GameWrapper>
    </div>
  )
}
