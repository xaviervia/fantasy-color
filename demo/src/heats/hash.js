const updateHash = color => {
  if (global !== undefined) {
    global.location.hash = `#${color}`
  }
}

export default state => ({
  fn: updateHash,
  args: [state.color],
})
