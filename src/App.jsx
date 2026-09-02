
import { useState, useEffect } from 'react'
import Desktop from './components/desktop/Desktop'

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
  const [openWindows, setOpenWindows] = useState([])
  const [flags, setFlags] = useState({
  unlockedDoNotClick: false,
})

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
    <div className="bg-black text-amber-400 text-xl font-mono min-h-screen">
      {booted ? (
        <Desktop openWindows={openWindows}
         setOpenWindows={setOpenWindows} 
         flags= {flags}
         setFlags={setFlags}/>
      ) : (
        <div className="p-8">
          {visibleLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App