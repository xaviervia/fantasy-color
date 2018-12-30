import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'toHSVA',
  example(
    'test white',
    () => Color.of(255, 255, 255, 1).toHSVA(),
    'hsva(0, 0, 100, 1)',
  ),
  example(
    'test red',
    () => Color.of(255, 0, 0, 1).toHSVA(),
    'hsva(0, 100, 100, 1)',
  ),
  example(
    'test green',
    () => Color.of(0, 255, 0, 1).toHSVA(),
    'hsva(120, 100, 100, 1)',
  ),
  example(
    'test blue',
    () => Color.of(0, 0, 255, 1).toHSVA(),
    'hsva(240, 100, 100, 1)',
  ),
  example(
    'test yellow',
    () => Color.of(255, 255, 0, 1).toHSVA(),
    'hsva(60, 100, 100, 1)',
  ),
  example(
    'test cyan',
    () => Color.of(0, 255, 255, 1).toHSVA(),
    'hsva(180, 100, 100, 1)',
  ),
  example(
    'test magenta',
    () => Color.of(255, 0, 255, 1).toHSVA(),
    'hsva(300, 100, 100, 1)',
  ),
  example(
    'test some turquoise',
    () => Color.of(0, 147, 255, 1).toHSVA(),
    'hsva(205, 100, 100, 1)',
  ),
  example(
    'test some other turquoise',
    () => Color.of(0, 124, 255, 1).toHSVA(),
    'hsva(211, 100, 100, 1)',
  ),
  example(
    'test some unsaturated shade',
    () => Color.of(47, 70, 95, 1).toHSVA(),
    'hsva(211, 51, 37, 1)',
  ),
)
