import { HSV, HSVA } from '@fantasy-color/types/src'

export default ({ hue, saturation, value }: HSVA): HSV => ({
  hue,
  saturation,
  value
})
