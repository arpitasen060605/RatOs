import { useState } from 'react'
import Window from '../window/Window'
import CheeseVault from '../apps/CheeseVault'
import RatMail from '../apps/RatMail'
import RatChat from '../apps/RatChat'
import Burrow from '../apps/Burrow'
import Terminal from '../apps/Terminal'
import RatMap from '../apps/RatMap'
import DoNotClick from '../apps/DoNotClick'
import Achievements from '../apps/Achievements'
import CheeseCatcher from '../games/CheeseCatcher'
import { AnimatePresence } from 'framer-motion'

const apps = [
  { id: "cheese-vault", name: "Cheese Vault", icon: "🧀" },
  { id: "ratmail", name: "RatMail", icon: "📬" },
  { id: "ratchat", name: "RatChat", icon: "💬" },
  { id: "ratmap", name: "RatMap", icon: "🗺️" },
  { id: "burrow", name: "My Burrow", icon: "📁" },
  { id: "terminal", name: "Rat Terminal", icon: "💻" },
  { id: "do-not-click", name: "DO_NOT_CLICK.exe", icon: "⚠️"},
  { id: "achievements", name: "Achievements", icon: "🏆"}, 
  { id: "ratgames", name: "RatGames", icon: "🎮"},
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
    <div className="bg-ratos-bg text-ratos-cream font-terminal min-h-screen p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-35 text-6xl">
      <span className="absolute top-10 left-1/4">🧀</span>
      <span className="absolute top-1/3 right-20">🐀</span>
      <span className="absolute bottom-20 left-16">💻</span>
      <span className="absolute bottom-1/4 right-1/3">🧀</span>
      <span className="absolute top-1/2 left-1/2">🐀</span>
      <span className="absolute top-20 right-1/4">📦</span>
      <span className="absolute top-1/4 left-10">🐀</span>
      <span className="absolute bottom-10 right-10">🧀</span>
      <span className="absolute top-1/2 right-1/4">📬</span>
      <span className="absolute bottom-1/3 left-1/3">🗺️</span>
      <span className="absolute top-2/3 left-1/4">💬</span>
      <span className="absolute bottom-40 right-1/2">🐀</span>
      <span className="absolute top-40 left-1/2">🧀</span>
      <span className="absolute bottom-1/2 right-40">📦</span>
    </div>
      <div className="flex flex-col flex-wrap gap-6 h-[calc(100vh-2rem)] content-start">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => handleIconClick(app.id)}
            className="flex flex-col items-center w-20 cursor-pointer transition-transform hover:scale-110 hover:-translate-y-1"
          >
            <div className="text-4xl">{app.icon}</div>
            <div className="text-sm text-center w-full break-words font-terminal">{app.name}</div>
          </div>
        ))}
      </div>

   <AnimatePresence>
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
  <CheeseVault flags={flags} setFlags={setFlags} />
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
): win.id === "achievements" ?(
  <Achievements flags={flags}/>
): win.id === "ratgames" ? (
  <CheeseCatcher/>
):(  
  `This is the ${app.name} window. Content coming soon.`
)}
</Window>
        )
      })}
      </AnimatePresence>
    </div>
  )
}

export default Desktop