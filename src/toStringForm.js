function toHEX (red, green, blue) {
  return '#' +
    red.toString(16).toUpperCase() +
    green.toString(16).toUpperCase() +
    blue.toString(16).toUpperCase()
}

function toRGB (red, green, blue) {
  return "rgb(" + red + ", " + green + ", " + blue + ")"
}

function toRGBA (red, green, blue, alpha) {
  return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")"
}

module.exports.toHEX = toHEX
module.exports.toRGB = toRGB
module.exports.toRGBA = toRGBA
