import { RGB } from '@fantasy-color/types/src'

export default ({ red, green, blue }: RGB): RGB => ({
  red: red / 255,
  green: green / 255,
  blue: blue / 255
})
