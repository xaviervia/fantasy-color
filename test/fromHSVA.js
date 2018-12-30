import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'fromHSVA',
  example(
    'test white',
    () => Color('hsva(0, 0, 100, 1)').toArray(),
    [255, 255, 255, 1],
  ),
  example(
    'test red',
    () => Color('hsva(0, 100, 100, 1)').toArray(),
    [255, 0, 0, 1],
  ),
  example(
    'test green',
    () => Color('hsva(120, 100, 100, 1)').toArray(),
    [0, 255, 0, 1],
  ),
  example(
    'test blue',
    () => Color('hsva(240, 100, 100, 1)').toArray(),
    [0, 0, 255, 1],
  ),
  example(
    'test yellow',
    () => Color('hsva(60, 100, 100, 1)').toArray(),
    [255, 255, 0, 1],
  ),
  example(
    'test cyan',
    () => Color('hsva(180, 100, 100, 1)').toArray(),
    [0, 255, 255, 1],
  ),
  example(
    'test magenta',
    () => Color('hsva(300, 100, 100, 1)').toArray(),
    [255, 0, 255, 1],
  ),
  example(
    'test some turquoise',
    () => Color('hsva(205, 100, 100, 1)').toArray(),
    [0, 149, 255, 1],
  ),
  example(
    'test some greener turquoise',
    () => Color('hsva(199, 100, 100, 1)').toArray(),
    [0, 174, 255, 1],
  ),
  example(
    'test some green',
    () => Color('hsva(145, 100, 100, 1)').toArray(),
    [0, 255, 106, 1],
  ),
  example(
    'test some other turquoise',
    () => Color('hsva(211, 100, 100, 1)').toArray(),
    [0, 123, 255, 1],
  ),
  example(
    'test some unsaturated shade',
    () => Color('hsva(211, 51, 37, 1)').toArray(),
    [46, 69, 94, 1],
  ),
  example(
    'test some purple unsaturated shade',
    () => Color('hsva(301, 57, 71, 1)').toArray(),
    [181, 78, 179, 1],
  ),
)
