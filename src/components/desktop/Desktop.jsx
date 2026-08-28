import { useState } from 'react'
import Window from '../window/Window'

const apps = [
  { id: "cheese-vault", name: "Cheese Vault", icon: "🧀" },
  { id: "ratmail", name: "RatMail", icon: "📬" },
  { id: "ratchat", name: "RatChat", icon: "💬" },
  { id: "ratmap", name: "RatMap", icon: "🗺️" },
  { id: "burrow", name: "My Burrow", icon: "📁" },
  { id: "terminal", name: "Rat Terminal", icon: "💻" },
]

function Desktop({ openWindows, setOpenWindows }) {
  const [nextZ, setNextZ] = useState(10)

  function handleIconClick(appId) {
    const alreadyOpen = openWindows.find((w) => w.id === appId)
    if (!alreadyOpen) {
      const offset = openWindows.length
      setOpenWindows((prev) => [...prev, { id: appId, offset, zIndex: nextZ }])
      setNextZ((z) => z + 1)
    } else {
      handleFocus(appId)
    }
  }

  function handleClose(appId) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId))
  }

  function handleFocus(appId) {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, zIndex: nextZ } : w))
    )
    setNextZ((z) => z + 1)
  }

  return (
    <div className="bg-indigo-950 text-amber-400 font-mono min-h-screen p-4">
      <div className="flex flex-wrap gap-6">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => handleIconClick(app.id)}
            className="flex flex-col items-center w-20 cursor-pointer hover:opacity-75"
          >
            <div className="text-4xl">{app.icon}</div>
            <div className="text-sm text-center">{app.name}</div>
          </div>
        ))}
      </div>

      {openWindows.map((win) => {
        const app = apps.find((a) => a.id === win.id)
        return (
          <Window
            key={win.id}
            title={app.name}
            onClose={() => handleClose(win.id)}
            onFocus={() => handleFocus(win.id)}
            offset={win.offset}
            zIndex={win.zIndex}
          >
            This is the {app.name} window. Content coming soon.
          </Window>
        )
      })}
    </div>
  )
}

export default Desktop