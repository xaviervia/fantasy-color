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

function equivalentBrightnessNudgingGreenUpAffectingRed (
  brightness,
  equivalentBrightnessArray
) {
  var lastEquivalentBrightnessColor = equivalentBrightnessArray[
    equivalentBrightnessArray.length - 1
  ]

  var next = [
    getRedForEquivalentBrightnessColor(
      brightness,
      lastEquivalentBrightnessColor[1] + 1,
      lastEquivalentBrightnessColor[2]
    ),
    lastEquivalentBrightnessColor[1] + 1,
    lastEquivalentBrightnessColor[2],
  ]

  if (next[1] < 256 && !isNaN(next[0]) && next[0] >= 0 && next[0] < 256) {
    return equivalentBrightnessNudgingGreenUpAffectingRed(
      brightness,
      equivalentBrightnessArray.concat([next])
    )
  } else {
    return equivalentBrightnessArray
  }
}

module.exports.brightness = brightness
module.exports.getRedForEquivalentBrightnessColor = getRedForEquivalentBrightnessColor
module.exports.getGreenForEquivalentBrightnessColor = getGreenForEquivalentBrightnessColor
module.exports.getBlueForEquivalentBrightnessColor = getBlueForEquivalentBrightnessColor
module.exports.equivalentBrightnessNudgingGreenUpAffectingRed = equivalentBrightnessNudgingGreenUpAffectingRed
module.exports.RED_BRIGHTNESS_WEIGHT = RED_BRIGHTNESS_WEIGHT
module.exports.GREEN_BRIGHTNESS_WEIGHT = GREEN_BRIGHTNESS_WEIGHT
module.exports.BLUE_BRIGHTNESS_WEIGHT = BLUE_BRIGHTNESS_WEIGHT
