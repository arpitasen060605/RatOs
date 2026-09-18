import { useState, useEffect, useRef } from 'react'

const GAME_WIDTH = 280
const GAME_HEIGHT = 280
const MOVE_STEP = 10

function AvoidTheCat() {
  const [ratPos, setRatPos] = useState({ x: 20, y: 20 })
  const [catPos, setCatPos] = useState({ x: 240, y: 240 })
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const ratPosRef = useRef(ratPos)

  useEffect(() => {
    ratPosRef.current = ratPos
  }, [ratPos])

  function resetGame() {
    setRatPos({ x: 20, y: 20 })
    setCatPos({ x: 240, y: 240 })
    setScore(0)
    setGameOver(false)
  }

  // Keyboard controls
  useEffect(() => {
    if (gameOver) return

    function handleKeyDown(e) {
      setRatPos((pos) => {
        let { x, y } = pos
        if (e.key === "ArrowLeft") x = Math.max(0, x - MOVE_STEP)
        if (e.key === "ArrowRight") x = Math.min(GAME_WIDTH - 20, x + MOVE_STEP)
        if (e.key === "ArrowUp") y = Math.max(0, y - MOVE_STEP)
        if (e.key === "ArrowDown") y = Math.min(GAME_HEIGHT - 20, y + MOVE_STEP)
        return { x, y }
      })
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameOver])

  // Game loop: cat chases, score ticks up, check collision
  useEffect(() => {
    if (gameOver) return

    const speed = 3 + Math.floor(score / 5)

    const interval = setInterval(() => {
      setCatPos((pos) => {
        const target = ratPosRef.current
        const dx = target.x - pos.x
        const dy = target.y - pos.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 15) {
          setGameOver(true)
          return pos
        }

        const moveX = dist === 0 ? 0 : (dx / dist) * speed
        const moveY = dist === 0 ? 0 : (dy / dist) * speed

        return { x: pos.x + moveX, y: pos.y + moveY }
      })
    }, 100)

    const scoreInterval = setInterval(() => {
      setScore((s) => s + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(scoreInterval)
    }
  }, [gameOver, score])

  return (
    <div>
      <div className="text-sm mb-2 font-bold">
        {gameOver ? `Caught! Survived: ${score}s` : `Survived: ${score}s`}
      </div>
      <div
        className="relative bg-indigo-950 overflow-hidden mx-auto"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <div
          className="absolute text-2xl"
          style={{ left: ratPos.x, top: ratPos.y }}
        >
          🐀
        </div>
        <div
          className="absolute text-2xl"
          style={{ left: catPos.x, top: catPos.y }}
        >
          🐈
        </div>
      </div>

      {gameOver ? (
        <button
          onClick={resetGame}
          className="mt-2 w-full bg-ratos-accent text-ratos-cream font-terminal text-sm py-1 border-2 border-black"
        >
          Try Again
        </button>
      ) : (
        <div className="text-xs text-stone-400 mt-2 text-center">
          Use arrow keys to run
        </div>
      )}
    </div>
  )
}

export default AvoidTheCat