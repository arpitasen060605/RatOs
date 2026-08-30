import { useState } from 'react'
import filesystem from '../../data/filesystem'

function FileTreeItem({ item }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  if (item.type === "file") {
    return (
      <div>
        <div
          onClick={() => setSelectedFile(selectedFile ? null : item)}
          className="cursor-pointer pl-4 text-sm hover:bg-stone-100"
        >
          📄 {item.name}
        </div>
        {selectedFile && (
          <div className="pl-8 text-xs text-stone-600 whitespace-pre-line py-1">
            {item.content}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer text-sm font-bold hover:bg-stone-100"
      >
        {expanded ? "📂" : "📁"} {item.name}
      </div>
      {expanded && (
        <div className="pl-4">
          {item.children.map((child) => (
            <FileTreeItem key={child.name} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}

function Burrow() {
  return (
    <div className="h-80 overflow-y-auto text-sm">
      <FileTreeItem item={filesystem} />
    </div>
  )
}

export default Burrow