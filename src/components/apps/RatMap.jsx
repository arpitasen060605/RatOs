import { useState } from 'react'
import rooms from '../../data/rooms'

function RatMap() {
  const [selectedId, setSelectedId] = useState(null)

  const selectedRoom = rooms.find((room) => room.id === selectedId)

  return (
    <div className="h-80 flex flex-col">
      <div className="grid grid-cols-3 gap-2 p-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => !room.locked && setSelectedId(room.id)}
            className={`border-2 rounded p-2 text-center text-xs ${
              room.locked
                ? "border-stone-300 bg-stone-100 text-stone-400 cursor-not-allowed"
                : "border-stone-400 cursor-pointer hover:bg-amber-50"
            } ${selectedId === room.id ? "bg-amber-100 border-amber-500" : ""}`}
          >
            <div className="text-2xl">{room.locked ? "🔒" : room.icon}</div>
            <div>{room.name}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 p-3 border-t border-stone-300 text-sm">
        {selectedRoom ? (
          <div>
            <div className="font-bold">{selectedRoom.name}</div>
            <div className="text-stone-600 mt-1">{selectedRoom.description}</div>
          </div>
        ) : (
          <div className="text-stone-400">Click a room to explore it.</div>
        )}
      </div>
    </div>
  )
}

export default RatMap