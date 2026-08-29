import { useState } from 'react'
import emails from '../../data/emails'

function RatMail() {
  const [emailList, setEmailList] = useState(emails)
  const [selectedId, setSelectedId] = useState(null)

  const selectedEmail = emailList.find((email) => email.id === selectedId)

  function handleSelect(id) {
    setSelectedId(id)
    setEmailList((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, read: true } : email
      )
    )
  }

  return (
    <div className="flex h-80">
      <div className="w-1/3 border-r border-stone-300 overflow-y-auto">
        {emailList.map((email) => (
          <div
            key={email.id}
            onClick={() => handleSelect(email.id)}
            className={`p-2 border-b border-stone-200 cursor-pointer text-xs ${
              selectedId === email.id ? "bg-amber-100" : ""
            } ${email.read ? "text-stone-500" : "font-bold"}`}
          >
            <div>{email.from}</div>
            <div className="truncate">{email.subject}</div>
          </div>
        ))}
      </div>

      <div className="w-2/3 p-3 overflow-y-auto">
        {selectedEmail ? (
          <div>
            <div className="font-bold">{selectedEmail.subject}</div>
            <div className="text-xs text-stone-500 mb-2">
              From: {selectedEmail.from} — {selectedEmail.time}
            </div>
            <div className="text-sm whitespace-pre-line">
              {selectedEmail.body}
            </div>
          </div>
        ) : (
          <div className="text-stone-400 text-sm">Select an email to read it.</div>
        )}
      </div>
    </div>
  )
}

export default RatMail