import { motion, useDragControls } from 'framer-motion'

function Window({ title, onClose, onFocus, children, offset = 0, zIndex = 10 }) {
  const top = 80 + offset * 30
  const left = 80 + offset * 30
  const dragControls = useDragControls()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onMouseDown={onFocus}
      className="absolute w-80 bg-ratos-cream text-ratos-bg border-4 border-ratos-accent shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]"
      style={{ top: `${top}px`, left: `${left}px`, zIndex }}
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="bg-ratos-accent text-ratos-cream flex justify-between items-center px-3 py-1 cursor-grab active:cursor-grabbing font-pixel text-xs"
      >
        <span>{title}</span>
        <button
          onClick={onClose}
          className="bg-ratos-red text-white w-5 h-5 text-xs leading-none hover:brightness-110 border-2 border-black"
        >
          ✕
        </button>
      </div>
      <div className="p-4 font-terminal text-lg">
        {children}
      </div>
    </motion.div>
  )
}

export default Window