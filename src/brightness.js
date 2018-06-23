// Magical weights for calculating perceived relative brightness
// Taken from http://alienryderflex.com/hsp.html
var RED_BRIGHTNESS_WEIGHT = 0.299
var GREEN_BRIGHTNESS_WEIGHT = 0.587
var BLUE_BRIGHTNESS_WEIGHT = 0.114

function brightness (red, green, blue, alpha) {
  return Math.sqrt(
    Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT +
    Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT +
    Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT
  ) * alpha
}

function getRedForEquivalentBrightnessColor (brightness, green, blue) {
  return Math.round(
    Math.sqrt(
      (
        Math.pow(brightness, 2) -
        Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT -
        Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT
      ) /
      RED_BRIGHTNESS_WEIGHT
    )
  )
}

function getGreenForEquivalentBrightnessColor (brightness, red, blue) {
  return Math.round(
    Math.sqrt(
      (
        Math.pow(brightness, 2) -
        Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT -
        Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT
      ) /
      GREEN_BRIGHTNESS_WEIGHT
    )
  )
}

function getBlueForEquivalentBrightnessColor (brightness, red, green) {
  return Math.round(
    Math.sqrt(
      (
        Math.pow(brightness, 2) -
        Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT -
        Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT
      ) /
      BLUE_BRIGHTNESS_WEIGHT
    )
  )
}

function equivalentBrightnessSet (
  brightness,
  equivalentBrightnessArray,
  options
) {
  var lastEquivalentBrightnessColor = equivalentBrightnessArray[
    equivalentBrightnessArray.length - 1
  ]

  var red = options.affect === 'red'
    ? getRedForEquivalentBrightnessColor(
      brightness,
      options.modify === 'green'
        ? lastEquivalentBrightnessColor[1] + options.variation
        : lastEquivalentBrightnessColor[1],
      options.modify === 'blue'
        ? lastEquivalentBrightnessColor[2] + options.variation
        : lastEquivalentBrightnessColor[2],
    )
    : (
      options.modify === 'red'
        ? lastEquivalentBrightnessColor[0] + options.variation
        : lastEquivalentBrightnessColor[0]
    )

  var green = options.affect === 'green'
    ? getGreenForEquivalentBrightnessColor(
      brightness,
      options.modify === 'red'
        ? lastEquivalentBrightnessColor[0] + options.variation
        : lastEquivalentBrightnessColor[0],
      options.modify === 'blue'
        ? lastEquivalentBrightnessColor[2] + options.variation
        : lastEquivalentBrightnessColor[2],
    )
    : (
      options.modify === 'green'
        ? lastEquivalentBrightnessColor[1] + options.variation
        : lastEquivalentBrightnessColor[1]
    )

  var blue = options.affect === 'blue'
    ? getBlueForEquivalentBrightnessColor(
      brightness,
      options.modify === 'red'
        ? lastEquivalentBrightnessColor[0] + options.variation
        : lastEquivalentBrightnessColor[0],
      options.modify === 'green'
        ? lastEquivalentBrightnessColor[1] + options.variation
        : lastEquivalentBrightnessColor[1],
    )
    : (
      options.modify === 'blue'
        ? lastEquivalentBrightnessColor[2] + options.variation
        : lastEquivalentBrightnessColor[2]
    )

  var next = [
    red,
    green,
    blue,
  ]

  if (
    !isNaN(red) && red >= 0 && red < 256 &&
    !isNaN(green) && green >= 0 && green < 256 &&
    !isNaN(blue) && blue >= 0 && blue < 256
  ) {
    return equivalentBrightnessSet(
      brightness,
      equivalentBrightnessArray.concat([next]),
      options
    )
  } else {
    return equivalentBrightnessArray
  }
}

module.exports.brightness = brightness
module.exports.getRedForEquivalentBrightnessColor = getRedForEquivalentBrightnessColor
module.exports.getGreenForEquivalentBrightnessColor = getGreenForEquivalentBrightnessColor
module.exports.getBlueForEquivalentBrightnessColor = getBlueForEquivalentBrightnessColor
module.exports.equivalentBrightnessSet = equivalentBrightnessSet
module.exports.RED_BRIGHTNESS_WEIGHT = RED_BRIGHTNESS_WEIGHT
module.exports.GREEN_BRIGHTNESS_WEIGHT = GREEN_BRIGHTNESS_WEIGHT
module.exports.BLUE_BRIGHTNESS_WEIGHT = BLUE_BRIGHTNESS_WEIGHT
