import test from 'blue-tape'

import redForLuminanceSrgb from '../src'

test('redForLuminanceSrgb: light color with mid green and blue', async (t) => {
  const red = redForLuminanceSrgb(0.6, 0.5, 0.5)

  t.deepEquals(
    red,
    0.4,
    'must return a red value'
  )
})
