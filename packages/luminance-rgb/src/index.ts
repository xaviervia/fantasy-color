import { RGB } from '@fantasy-color/types/src'
import rgbToSrgb from '@fantasy-color/rgb-to-srgb/src'

export default (color: RGB): number => {
  const { red, green, blue } = rgbToSrgb(color)

  return 0.2126 * red +
    0.7152 * green +
    0.0722 * blue
}
