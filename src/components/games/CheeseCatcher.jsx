import { useState, useEffect, useRef } from 'react'

const GAME_WIDTH = 280
const GAME_HEIGHT = 300
const PADDLE_WIDTH = 50

function CheeseCatcher() {
  const [paddleX, setPaddleX] = useState(GAME_WIDTH / 2 - PADDLE_WIDTH / 2)
  const [cheeses, setCheeses] = useState([])
  const [score, setScore] = useState(0)
  const paddleXRef = useRef(paddleX)

  useEffect(() => {
    paddleXRef.current = paddleX
  }, [paddleX])

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setPaddleX((x) => Math.max(0, x - 20))
      } else if (e.key === "ArrowRight") {
        setPaddleX((x) => Math.min(GAME_WIDTH - PADDLE_WIDTH, x + 20))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Game loop: move cheeses down, check catches, spawn new ones
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCheeses((prev) => {
        const moved = prev.map((c) => ({ ...c, y: c.y + 8 }))

        const stillFalling = []
        moved.forEach((c) => {
          if (c.y >= GAME_HEIGHT - 20) {
            const caught =
              c.x >= paddleXRef.current - 10 &&
              c.x <= paddleXRef.current + PADDLE_WIDTH
            if (caught) {
              setScore((s) => s + 1)
            }
          } else {
            stillFalling.push(c)
          }
        })

        return stillFalling
      })
    }, 100)

    const spawnInterval = setInterval(() => {
      setCheeses((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * (GAME_WIDTH - 20), y: 0 },
      ])
    }, 1000)

    return () => {
      clearInterval(moveInterval)
      clearInterval(spawnInterval)
    }
  }, [])

  return (
    <div>
      <div className="text-sm mb-2 font-bold">Score: {score}</div>
      <div
        className="relative bg-indigo-950 overflow-hidden mx-auto"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {cheeses.map((c) => (
          <div
            key={c.id}
            className="absolute text-2xl"
            style={{ left: c.x, top: c.y }}
          >
            🧀
          </div>
        ))}
        <div
          className="absolute text-3xl"
          style={{ left: paddleX, bottom: 0 }}
        >
          🐀
        </div>
      </div>
      <div className="text-xs text-stone-400 mt-2 text-center">
        Use ← → arrow keys to move
      </div>
    </div>
  )
}

export default CheeseCatcher