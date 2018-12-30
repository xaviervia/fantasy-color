import {
  brightness,
  getRedForEquivalentBrightnessColor,
  getGreenForEquivalentBrightnessColor,
  getBlueForEquivalentBrightnessColor,
  equivalentBrightnessSet
} from './brightness'

import fromString from './fromString'
import { 
  toHEX, 
  toRGB, 
  toRGBA,
  toHSVA
} from './toString'

const Color = (input) => {
  const x = typeof input === 'string'
    ? fromString(input)
    : input

  return x === undefined ? undefined : Color.of(...x)
}

const of = (red = 0, green = 0, blue = 0, alpha = 1) => ({
  red,
  green,
  blue,
  alpha,

  brightness: () => brightness(red, green, blue, alpha),
  toHEX: () => toHEX(red, green, blue),
  inspect: () => toRGBA(red, green, blue, alpha),
  toRGBA: () => toRGBA(red, green, blue, alpha),
  toHSVA: () => toHSVA(red, green, blue, alpha),
  toString: () => toRGBA(red, green, blue, alpha),
  invert: () => {
    const invertColor = (color) => 255 - color
    return Color.of(invertColor(red), invertColor(green), invertColor(blue), alpha)
  }
})

Color.brightness = brightness
Color.getRedForEquivalentBrightnessColor = getRedForEquivalentBrightnessColor
Color.getGreenForEquivalentBrightnessColor = getGreenForEquivalentBrightnessColor
Color.getBlueForEquivalentBrightnessColor = getBlueForEquivalentBrightnessColor
Color.equivalentBrightnessSet = equivalentBrightnessSet

Color.toHEX = toHEX
Color.toRGB = toRGB
Color.toRGBA = toRGBA
Color.toHSVA = toHSVA

Color.of = of

export default Color
