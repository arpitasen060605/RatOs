function Window({ title, onClose, children }) {
  return (
    <div className="absolute top-20 left-20 w-80 bg-stone-200 text-black rounded-md shadow-xl border-2 border-stone-400">
      <div className="bg-indigo-900 text-amber-300 flex justify-between items-center px-3 py-1 rounded-t-sm">
        <span className="font-mono text-sm">{title}</span>
        <button
          onClick={onClose}
          className="bg-red-500 text-white w-5 h-5 rounded-sm text-xs leading-none hover:bg-red-600"
        >
          ✕
        </button>
      </div>
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}

export default Window