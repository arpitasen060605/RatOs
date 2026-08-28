import { motion } from 'framer-motion'

function Window({ title, onClose, children, offset = 0 }) {
  const top = 80 + offset * 30
  const left = 80 + offset * 30

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute w-80 bg-stone-200 text-black rounded-md shadow-xl border-2 border-stone-400"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className="bg-indigo-900 text-amber-300 flex justify-between items-center px-3 py-1 rounded-t-sm cursor-grab active:cursor-grabbing">
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
    </motion.div>
  )
}

export default Window