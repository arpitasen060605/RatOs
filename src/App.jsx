import { useState, useEffect } from 'react'
import Desktop from './components/desktop/Desktop'
import ratMascot from './assets/rat-mascot.png'

const bootLines = [
  "RATOS BIOS v1.3",
  "Checking cheese............... OK",
  "Checking whiskers.............. OK",
  "Checking suspicious activity... OK",
  "Welcome back, Rat."
]

function App() {
  const [stage, setStage] = useState("landing")
  const [visibleLines, setVisibleLines] = useState([])
  const [openWindows, setOpenWindows] = useState([])
  const [flags, setFlags] = useState({
    unlockedDoNotClick: false,
    cheeseCollectedCount: 0,
    terminalCommandsUsed: 0,
  })

  useEffect(() => {
    if (stage !== "booting") return

    const timers = []

    bootLines.forEach((line, index) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, index * 500)
      timers.push(t)
    })

    const finishTimer = setTimeout(() => {
      setStage("desktop")
    }, bootLines.length * 500 + 800)
    timers.push(finishTimer)

    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [stage])

  return (
    <div className="bg-black text-ratos-cream font-terminal text-xl min-h-screen">
      {stage === "landing" ? (
        <div
    onClick={() => setStage("booting")}
    className="relative min-h-screen cursor-pointer"
  >
    <img
      src={ratMascot}
      alt="RatOS mascot"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute bottom-10 left-0 right-0 text-center font-pixel text-sm animate-pulse text-ratos-cream drop-shadow-[2px_2px_0px_black]">
      Click to boot RatOS
    </div>
  </div>
      ) : stage === "booting" ? (
        <div className="p-8">
          {visibleLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      ) : (
        <Desktop
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          flags={flags}
          setFlags={setFlags}
        />
      )}
    </div>
  )
}

export default App