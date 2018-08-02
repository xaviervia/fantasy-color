// Magical weights for calculating perceived relative brightness
// Taken from http://alienryderflex.com/hsp.html
export const RED_BRIGHTNESS_WEIGHT = 0.299
export const GREEN_BRIGHTNESS_WEIGHT = 0.587
export const BLUE_BRIGHTNESS_WEIGHT = 0.114

export const brightness = (red, green, blue, alpha) =>
  Math.sqrt(
    Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT +
    Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT +
    Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT
  ) * alpha

export const getRedForEquivalentBrightnessColor = (brightness, green, blue) =>
  Math.round(
    Math.sqrt(
      (
        Math.pow(brightness, 2) -
        Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT -
        Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT
      ) /
      RED_BRIGHTNESS_WEIGHT
    )
  )

export const getGreenForEquivalentBrightnessColor = (brightness, red, blue) =>
  Math.round(
    Math.sqrt(
      (
        Math.pow(brightness, 2) -
        Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT -
        Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT
      ) /
      GREEN_BRIGHTNESS_WEIGHT
    )
  )

export const getBlueForEquivalentBrightnessColor = (brightness, red, green) =>
  Math.round(
    Math.sqrt(
      (
        Math.pow(brightness, 2) -
        Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT -
        Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT
      ) /
      BLUE_BRIGHTNESS_WEIGHT
    )
  )

export const equivalentBrightnessSet = (
  brightness,
  equivalentBrightnessArray,
  options
) => {
  const lastEquivalentBrightnessColor = equivalentBrightnessArray[
    equivalentBrightnessArray.length - 1
  ]

  const red = options.affect === 'red'
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

  const green = options.affect === 'green'
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

  const blue = options.affect === 'blue'
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

  const next = [ red, green, blue ]

  if (
    !isNaN(red) && red >= 0 && red < 256 &&
    !isNaN(green) && green >= 0 && green < 256 &&
    !isNaN(blue) && blue >= 0 && blue < 256
  ) {
    return equivalentBrightnessSet(
      brightness,
      [...equivalentBrightnessArray, next],
      options
    )
  } else {
    return equivalentBrightnessArray
  }
}
