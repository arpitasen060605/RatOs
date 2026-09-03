const achievements = [
  {
    id: "cheese-addict",
    name: "Cheese Addict",
    description: "Collect 3 different cheeses.",
    check: (flags) => flags.cheeseCollectedCount >= 3,
  },
  {
    id: "cheese-lord",
    name: "Cheese Lord",
    description: "Collect every cheese.",
    check: (flags) => flags.cheeseCollectedCount >= 6,
  },
  {
    id: "suspicious",
    name: "Suspicious",
    description: "Open DO_NOT_CLICK.exe.",
    check: (flags) => flags.unlockedDoNotClick,
  },
  {
    id: "hacker-rat",
    name: "Hacker Rat",
    description: "Use 5 terminal commands.",
    check: (flags) => flags.terminalCommandsUsed >= 5,
  },
]

export default achievements