import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'fromHEX',
  example(
    'test red',
    () => Color('#452312').red,
    69,
  ),
  example(
    'test green',
    () => Color('#452312').green,
    35,
  ),
  example(
    'test blue',
    () => Color('#452312').blue,
    18,
  ),
  example(
    'test alpha',
    () => Color('#452312').alpha,
    1,
  ),
  example(
    'incomplete is undefined',
    () => Color('#45'),
    undefined,
  ),
  example(
    'incomplete is undefined - other example',
    () => Color('#0099E'),
    undefined,
  ),
)
