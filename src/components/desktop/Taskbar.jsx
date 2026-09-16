import { useState, useEffect } from 'react'

function Taskbar({ openWindows, apps, onTaskbarClick }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-ratos-accent border-t-4 border-ratos-cream flex items-center justify-between px-3 z-50">
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="font-pixel text-xs bg-ratos-cream text-ratos-bg px-3 py-2 border-2 border-black">
          🐀 Start
        </div>

        {openWindows.map((win) => {
          const app = apps.find((a) => a.id === win.id)
          return (
            <div
              key={win.id}
              onClick={() => onTaskbarClick(win.id)}
              className="font-terminal text-sm bg-ratos-bg text-ratos-cream px-3 py-2 border-2 border-ratos-cream cursor-pointer whitespace-nowrap hover:brightness-125"
            >
              {app.icon} {app.name}
            </div>
          )
        })}
      </div>

      <div className="font-pixel text-xs text-ratos-cream whitespace-nowrap">
        {formattedTime}
      </div>
    </div>
  )
}

export default Taskbar