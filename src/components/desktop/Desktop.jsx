
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

      <div className="mt-8 text-sm">
        Open windows: {openWindows.join(", ") || "none"}
      </div>
    </div>
  )
}

export default Desktop