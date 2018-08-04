import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'fromOf',
  example(
    'test red',
    () => Color.of(250, 167, 23, 0.8).red,
    250,
  ),
  example(
    'test green',
    () => Color.of(250, 167, 23, 0.8).green,
    167,
  ),
  example(
    'test blue',
    () => Color.of(250, 167, 23, 0.8).blue,
    23,
  ),
  example(
    'test alpha',
    () => Color.of(250, 167, 23, 0.8).alpha,
    0.8,
  ),
)
