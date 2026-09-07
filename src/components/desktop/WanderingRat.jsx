import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  "🐀 Gerald walked across your desktop.",
  "🐀 Kevin is definitely not supposed to be here.",
  "🐀 Someone scurried by. Probably nothing.",
  "🐀 Ravi says this activity has been logged.",
  "🐀 A rat passed through. It looked busy.",
]

function WanderingRat() {
  const [visible, setVisible] = useState(false)
  const [fromTop, setFromTop] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    function scheduleNext() {
      const delay = 20000 + Math.random() * 20000
      return setTimeout(() => {
        setFromTop(Math.random() > 0.5)
        setMessage(messages[Math.floor(Math.random() * messages.length)])
        setVisible(true)

        setTimeout(() => {
          setVisible(false)
        }, 4000)

        scheduleNext()
      }, delay)
    }

    const timer = scheduleNext()
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: "-10vw" }}
            animate={{ x: "110vw" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            className="fixed text-4xl pointer-events-none"
            style={{ top: fromTop ? "20%" : "70%" }}
          >
            🐀
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ratos-accent text-ratos-cream font-terminal text-lg px-4 py-2 border-4 border-ratos-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] pointer-events-none"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WanderingRat