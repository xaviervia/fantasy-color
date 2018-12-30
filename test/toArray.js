import { example, suite } from 'washington'
import Color from '../src/Color'

export default suite(
  'toArray',
  example(
    'test white',
    () => Color.of(255, 255, 255, 1).toArray(),
    [255, 255, 255, 1],
  )
)
