function playBeep(frequency = 440, duration = 0.08, type = "square") {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  oscillator.start()
  oscillator.stop(ctx.currentTime + duration)
}

export function playClickSound() {
  playBeep(300, 0.05, "square")
}

export function playOpenSound() {
  playBeep(500, 0.1, "square")
}

export function playCloseSound() {
  playBeep(200, 0.1, "square")
}

export function playSuccessSound() {
  playBeep(700, 0.15, "square")
}

export default { playClickSound, playOpenSound, playCloseSound, playSuccessSound }