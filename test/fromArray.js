import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'fromArray',
  example(
    'test red',
    () => Color([254, 213, 92, 0.3]).red,
    254,
  ),
  example(
    'test green',
    () => Color([254, 213, 92, 0.3]).green,
    213,
  ),
  example(
    'test blue',
    () => Color([254, 213, 92, 0.3]).blue,
    92,
  ),
  example(
    'test alpha',
    () => Color([254, 213, 92, 0.3]).alpha,
    0.3,
  ),
)
