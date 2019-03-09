import { RGB } from '@fantasy-color/types/src'
import luminanceRgb from '@fantasy-color/luminance-rgb/src'
import contrastRatioLuminance from '@fantasy-color/contrast-ratio-luminance/src'

export default (color1: RGB, color2: RGB): number =>
  contrastRatioLuminance(
    luminanceRgb(color1),
    luminanceRgb(color2)
  )
