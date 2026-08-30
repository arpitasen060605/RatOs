import { useState } from 'react'
import rats from '../../data/rats'

function RatChat() {
  const [selectedId, setSelectedId] = useState(null)

  const selectedRat = rats.find((rat) => rat.id === selectedId)

  return (
    <div className="flex h-80">
      <div className="w-1/3 border-r border-stone-300 overflow-y-auto overflow-x-hidden">
        {rats.map((rat) => (
          <div
            key={rat.id}
            onClick={() => setSelectedId(rat.id)}
            className={`p-2 border-b border-stone-200 cursor-pointer text-xs flex items-center gap-2 ${
              selectedId === rat.id ? "bg-amber-100" : ""
            }`}
          >
            <span className="text-lg">{rat.avatar}</span>
            <div className="min-w-0">
              <div className="font-bold">{rat.name}</div>
              <div className="text-stone-500 truncate">{rat.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/3 p-3 overflow-y-auto">
        {selectedRat ? (
          <div className="flex flex-col gap-2">
            {selectedRat.messages.map((msg, index) => (
              <div
                key={index}
                className="bg-stone-100 rounded-lg px-3 py-2 text-sm max-w-[80%]"
              >
                {msg.text}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-stone-400 text-sm">Select a rat to chat.</div>
        )}
      </div>
    </div>
  )
}

export default RatChat