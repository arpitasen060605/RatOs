function DoNotClick({ flags }) {
  if (!flags.unlockedDoNotClick) {
    return (
      <div className="text-center p-6">
        <div className="text-3xl mb-2">🔒</div>
        <div className="font-bold">Access Denied</div>
        <div className="text-xs text-stone-500 mt-2">
          You are not supposed to be here.
        </div>
      </div>
    )
  }

  return (
    <div className="text-center p-6">
      <div className="text-3xl mb-2">👁️</div>
      <div className="font-bold">PROJECT RATOS</div>
      <div className="text-xs text-stone-500 mt-2">
        Status: ACTIVE
        <br />
        The subjects remain unaware.
      </div>
    </div>
  )
}

export default DoNotClick 