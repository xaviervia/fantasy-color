import { RGB } from '@fantasy-color/types/src'
import luminanceRgb from '@fantasy-color/luminance-rgb/src'

export default (color1: RGB, color2: RGB): number => {
  const luminance1 = luminanceRgb(color1)
  const luminance2 = luminanceRgb(color2)

  return luminance1 >= luminance2
    ? (luminance1 + .05) / (luminance2 + .05)
    : (luminance2 + .05) / (luminance1 + .05)
}
