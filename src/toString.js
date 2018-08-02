export const toHEX = (red, green, blue) =>
  '#' +
  red.toString(16).toUpperCase() +
  green.toString(16).toUpperCase() +
  blue.toString(16).toUpperCase()

export const toRGB = (red, green, blue) =>
  `rgb(${red}, ${green}, ${blue})`

export const toRGBA = (red, green, blue, alpha) =>
  `rgba(${red}, ${green}, ${blue}, ${alpha})`
