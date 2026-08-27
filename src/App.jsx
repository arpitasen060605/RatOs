import { useState, useEffect } from 'react'

function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooted(true)
    }, 2000)
  }, [])

  return (
    <div className="bg-black text-amber-400 text-2xl font-mono p-8 min-h-screen">
      {booted ? (
        <div>Welcome to the Desktop (coming soon)</div>
      ) : (
        <div>RATOS BIOS v1.0</div>
      )}
    </div>
  )
}

export default App