import { HSVA } from '@fantasy-color/types/src'

const hsvaRegex = /^\s*hsva\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d+)\s*\)\s*$/

export default (hsva: string): HSVA | null => {
  const matches = hsva.match(hsvaRegex)

  if (matches === null) {
    return null
  }

  return {
    hue: parseInt(matches[1]),
    saturation: parseInt(matches[2]),
    value: parseInt(matches[3]),
    alpha: parseFloat(matches[4])
  }
}
