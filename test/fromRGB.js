import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'fromRGB',
  example(
    'test red',
    () => Color('rgb(23, 234, 67)').red,
    23,
  ),
  example(
    'test green',
    () => Color('rgb(23, 234, 67)').green,
    234,
  ),
  example(
    'test blue',
    () => Color('rgb(23, 234, 67)').blue,
    67,
  ),
  example(
    'test alpha',
    () => Color('rgb(23, 234, 67)').alpha,
    1,
  ),
  example(
    'incomplete is undefined',
    () => Color('rgb(2'),
    undefined,
  ),
  example(
    'incomplete is undefined - other example',
    () => Color('rgb'),
    undefined,
  ),
  example(
    'incomplete is undefined - third example',
    () => Color('rgb(255,22, '),
    undefined,
  ),
)
