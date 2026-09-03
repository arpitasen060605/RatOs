import achievements from '../../data/achievements'

function Achievements({ flags }) {
  return (
    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
      {achievements.map((ach) => {
        const unlocked = ach.check(flags)
        return (
          <div
            key={ach.id}
            className={`border-2 rounded p-2 text-sm ${
              unlocked ? "border-amber-500 bg-amber-50" : "border-stone-300 text-stone-400"
            }`}
          >
            <div className="font-bold">
              {unlocked ? "🏆" : "🔒"} {ach.name}
            </div>
            <div className="text-xs">{ach.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Achievements