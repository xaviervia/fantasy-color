import { RGB } from '@fantasy-color/types/src'

export default ({ red, green, blue }: RGB): number =>
  0.2126 * red + 0.7152 * green + 0.0722 * blue
