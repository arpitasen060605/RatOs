import { useState } from 'react'
import Window from '../window/Window'
import CheeseVault from '../apps/CheeseVault'
import RatMail from '../apps/RatMail'
import RatChat from '../apps/RatChat'
import Burrow from '../apps/Burrow'
import Terminal from '../apps/Terminal'
import RatMap from '../apps/RatMap'
import DoNotClick from '../apps/DoNotClick'

const apps = [
  { id: "cheese-vault", name: "Cheese Vault", icon: "🧀" },
  { id: "ratmail", name: "RatMail", icon: "📬" },
  { id: "ratchat", name: "RatChat", icon: "💬" },
  { id: "ratmap", name: "RatMap", icon: "🗺️" },
  { id: "burrow", name: "My Burrow", icon: "📁" },
  { id: "terminal", name: "Rat Terminal", icon: "💻" },
  {id: "do-not-click", name: "DO_NOT_CLICK.exe", icon: "⚠️"}
]

function Desktop({ openWindows, setOpenWindows, flags,setFlags }) {
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
  {win.id === "cheese-vault" ? (
  <CheeseVault />
) : win.id === "ratmail" ? (
  <RatMail />
) : win.id === "ratchat" ? (
  <RatChat />
) : win.id ==="burrow" ? (
  <Burrow />
) : win.id === "ratmap" ? (
  <RatMap/>
) : win.id === "terminal" ? (
  <Terminal flags={flags} setFlags={setFlags} />
) : win.id === "do-not-click"? (
  <DoNotClick flags={flags}/>
):(
  `This is the ${app.name} window. Content coming soon.`
)}
</Window>
        )
      })}
    </div>
  )
}

export default Desktop