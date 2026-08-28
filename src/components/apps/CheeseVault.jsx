import { useState } from 'react'
import cheeses from '../../data/cheeses'

const rarityColors = {
  1: "text-stone-500",
  2: "text-green-600",
  3: "text-blue-600",
  4: "text-purple-600",
  5: "text-amber-600",
}

function CheeseVault() {
  const [collection, setCollection] = useState(cheeses)

  function toggleCollected(id) {
    setCollection((prev) =>
      prev.map((cheese) =>
        cheese.id === id ? { ...cheese, collected: !cheese.collected } : cheese
      )
    )
  }

  return (
    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
      {collection.map((cheese) => (
        <div
          key={cheese.id}
          onClick={() => toggleCollected(cheese.id)}
          className={`border-2 rounded p-2 cursor-pointer ${
            cheese.collected ? "border-amber-500 bg-amber-50" : "border-stone-300"
          }`}
        >
          <div className="flex justify-between">
            <span className="font-bold">{cheese.name}</span>
            <span className={rarityColors[cheese.rarity]}>
              {"⭐".repeat(cheese.rarity)}
            </span>
          </div>
          <div className="text-xs text-stone-600">Found: {cheese.foundAt}</div>
          <div className="text-xs mt-1">{cheese.description}</div>
          <div className="text-xs mt-1 font-bold">
            {cheese.collected ? "✅ Collected" : "❌ Not collected"}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CheeseVault