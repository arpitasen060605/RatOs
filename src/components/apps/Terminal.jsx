import { useState } from 'react'
import filesystem from '../../data/filesystem'

function Terminal({flags, setFlags}) {
  const [path, setPath] = useState([filesystem])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([
    { type: "output", text: "Welcome to Rat Terminal. Type 'help' for commands." },
  ])

  const currentFolder = path[path.length - 1]

  function runCommand(rawInput) {
    const parts = rawInput.trim().split(" ")
    const command = parts[0]
    const args = parts.slice(1)

    let output = []

    if (command === "") {
      output = []
    } else if (command === "help") {
      output = ["Commands: ls, cd, cat, pwd, whoami, clear, help, steal_cheese"]
    } else if (command === "pwd") {
      output = ["/" + path.map((p) => p.name).join("/")]
    } else if (command === "whoami") {
      output = ["a very good rat"]
    } else if (command === "ls") {
      if (currentFolder.children) {
        output = currentFolder.children.map((child) =>
          child.type === "folder" ? child.name + "/" : child.name
        )
      } else {
        output = ["Not a folder."]
      }
    } else if (command === "cd") {
      const target = args[0]
      if (target === "..") {
        if (path.length > 1) {
          setPath((prev) => prev.slice(0, -1))
        }
        output = []
      } else {
        const found = currentFolder.children?.find(
          (child) => child.name === target && child.type === "folder"
        )
        if (found) {
          setPath((prev) => [...prev, found])
          output = []
        } else {
          output = [`cd: no such folder: ${target}`]
        }
      }
    } else if (command === "cat") {
      const target = args[0]
      const found = currentFolder.children?.find(
        (child) => child.name === target && child.type === "file"
      )
      output = found ? [found.content] : [`cat: no such file: ${target}`]
    } else if (command === "clear") {
      setHistory([])
      return
    } else if (command === "steal_cheese") {
      output = ["Permission denied.", "Reason: You are not sneaky enough."]
    } else if (command === "sudo" && args[0] === "steal_cheese") {
      output = ["Nice try."]
    } else if (command === "sudo" && args[0] === "open" && args[1] === "DO_NOT_CLICK.exe") {
      setFlags((prev) => ({ ...prev, unlockedDoNotClick: true }))
       output = ["Access granted.", "Something feels different now."]
    } else {
      output = [`command not found: ${command}`]
    }

    setHistory((prev) => [
      ...prev,
      { type: "command", text: rawInput },
      ...output.map((line) => ({ type: "output", text: line })),
    ])
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      runCommand(input)
      setInput("")
    }
  }

  return (
    <div className="bg-black text-green-400 font-mono text-sm p-2 h-80 overflow-y-auto overflow-x-hidden flex flex-col">
      <div className="flex-1">
        {history.map((line, index) => (
  <div key={index} className="whitespace-pre-wrap break-words">
    {line.type === "command" ? (
      <span>
        rat@burrow:~{path.map((p) => p.name).join("/")}$ {line.text}
      </span>
    ) : (
      <span className="text-stone-300">{line.text}</span>
    )}
  </div>
))}
      </div>
      <div className="flex">
        <span>
          rat@burrow:~{path.map((p) => p.name).join("/")}${" "}
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 ml-1"
          autoFocus
        />
      </div>
    </div>
  )
}

export default Terminal