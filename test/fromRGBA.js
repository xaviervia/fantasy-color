import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'fromRGBA',
  example(
    'test red',
    () => Color('rgba(23, 234, 67, .6)').red,
    23,
  ),
  example(
    'test green',
    () => Color('rgba(23, 234, 67, .6)').green,
    234,
  ),
  example(
    'test blue',
    () => Color('rgba(23, 234, 67, .6)').blue,
    67,
  ),
  example(
    'test alpha',
    () => Color('rgba(23, 234, 67, .6)').alpha,
    0.6,
  ),
  example(
    'incomplete is undefined',
    () => Color('rgba(2, 32, 2,'),
    undefined,
  ),
  example(
    'incomplete is undefined - other example',
    () => Color('rgba'),
    undefined,
  ),
)
