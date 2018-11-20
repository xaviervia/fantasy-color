import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'invert',
  example(
    'arbitrary value with alpha',
    () => Color('rgba(23, 234, 67, .6)').invert().toString(),
    Color('rgba(232, 21, 188, .6)').toString(),
  ),
  example(
    'low border value with alpha',
    () => Color('rgba(0, 0, 0, 0)').invert().toString(),
    Color('rgba(255, 255, 255, 0)').toString(),
  ),
  example(
    'high border value with alpha',
    () => Color('rgba(255, 255, 255, 1)').invert().toString(),
    Color('rgba(0, 0, 0, 1)').toString(),
  ),
  example(
    'arbitrary value without alpha',
    () => Color('rgb(23, 234, 67)').invert().toString(),
    Color('rgb(232, 21, 188)').toString(),
  ),
  example(
    'low border value without alpha',
    () => Color('rgb(0, 0, 0)').invert().toString(),
    Color('rgb(255, 255, 255)').toString(),
  ),
  example(
    'high border value without alpha',
    () => Color('rgb(255, 255, 255)').invert().toString(),
    Color('rgb(0, 0, 0)').toString(),
  ),
)
