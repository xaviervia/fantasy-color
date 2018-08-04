import { example, suite } from 'washington'
import Color from '../src/Color'

export default [
  example(
    'toString',
    () => Color.of(250, 167, 23, 0.8).toString(),
    'rgba(250, 167, 23, 0.8)',
  ),

  example(
    'inspect',
    () => Color.of(250, 167, 23, 0.8).inspect(),
    'rgba(250, 167, 23, 0.8)',
  ),

  example(
    'toHEX returns only the HEX part',
    () => Color.of(250, 167, 23, 0.8).toHEX(),
    '#FAA717',
  ),

  example('toHEX is super buggy'),
  example('toRGB'),
]
