import { RGB } from '@fantasy-color/types/src'
import rgbToSrgb from '@fantasy-color/rgb-to-srgb'
import luminanceSrgb from '@fantasy-color/luminance-srgb'

export default (color: RGB): number => luminanceSrgb(rgbToSrgb(color))
