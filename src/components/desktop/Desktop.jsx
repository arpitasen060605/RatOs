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
  function handleIconClick(appId) {
    if (!openWindows.includes(appId)) {
      setOpenWindows((prev) => [...prev, appId])
    }
  }

  function handleClose(appId) {
    setOpenWindows((prev) => prev.filter((id) => id !== appId))
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

      {openWindows.map((appId) => {
        const app = apps.find((a) => a.id === appId)
        return (
          <Window key={appId} title={app.name} onClose={() => handleClose(appId)}>
            This is the {app.name} window. Content coming soon.
          </Window>
        )
      })}
    </div>
  )
}

export default Desktop
