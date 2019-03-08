import { RGB } from '@fantasy-color/types/src'

export default (hex: string): RGB => ({
  red: parseInt(hex.slice(1, 3), 16),
  green: parseInt(hex.slice(3, 5), 16),
  blue: parseInt(hex.slice(5, 7), 16)
})
