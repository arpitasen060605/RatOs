import { useState, useEffect } from 'react'

const bootLines = [
  "RATOS BIOS v1.3",
  "Checking cheese............... OK",
  "Checking whiskers.............. OK",
  "Checking suspicious activity... OK",
  "Welcome back, Rat."
]

function App() {
  const [booted, setBooted] = useState(false)
  const [visibleLines, setVisibleLines] = useState([])

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, index * 500)
    })

    const finishTimer = setTimeout(() => {
      setBooted(true)
    }, bootLines.length * 500 + 800)

    return () => clearTimeout(finishTimer)
  }, [])

  return (
    <div className="bg-black text-amber-400 text-xl font-mono p-8 min-h-screen">
      {booted ? (
        <div>Welcome to the Desktop (coming soon)</div>
      ) : (
        <div>
          {visibleLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App