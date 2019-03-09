import { RGB } from '@fantasy-color/types/src'

const rgbRegex = /^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/

export default (rgb: string): RGB | null => {
  const matches = rgb.match(rgbRegex)
  if (matches === null) {
    return null
  }

  return {
    red: parseInt(matches[1]),
    green: parseInt(matches[2]),
    blue: parseInt(matches[3]),
  }
}