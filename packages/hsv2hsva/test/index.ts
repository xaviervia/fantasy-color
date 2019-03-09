import test from 'blue-tape'

import hsv2hsva from '../src'

test('hsv2hsva', async (t) => {
  const color = hsv2hsva({
    hue: 60,
    saturation: 32,
    value: 23
  })

  t.deepEquals(
    color,
    {
      hue: 60,
      saturation: 32,
      value: 23,
      alpha: 1
    },
    'must add alpha 1'
  )
})
