import { HSV } from '@fantasy-color/types/src'

const hsvRegex = /^\s*hsv\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/

export default (hsv: string): HSV | null => {
  const matches = hsv.match(hsvRegex)

  if (matches === null) {
    return null
  }

  return {
    hue: parseInt(matches[1]),
    saturation: parseInt(matches[2]),
    value: parseInt(matches[3]),
  }
}
