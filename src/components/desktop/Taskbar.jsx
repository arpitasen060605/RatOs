import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Taskbar({
  openWindows,
  apps,
  onTaskbarClick,
  startMenuOpen,
  setStartMenuOpen,
  onStartMenuAppClick,
}) {
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
    <>
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-12 left-0 w-56 bg-ratos-cream text-ratos-bg border-4 border-ratos-accent shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] z-50"
          >
            {apps.map((app) => (
              <div
                key={app.id}
                onClick={() => onStartMenuAppClick(app.id)}
                className="flex items-center gap-2 px-3 py-2 font-terminal text-lg cursor-pointer hover:bg-ratos-accent hover:text-ratos-cream"
              >
                <span className="text-xl">{app.icon}</span>
                <span>{app.name}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-12 bg-ratos-accent border-t-4 border-ratos-cream flex items-center justify-between px-3 z-50">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div
            onClick={() => setStartMenuOpen((prev) => !prev)}
            className="font-pixel text-xs bg-ratos-cream text-ratos-bg px-3 py-2 border-2 border-black cursor-pointer hover:brightness-110"
          >
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
    </>
  )
}

export default Taskbar