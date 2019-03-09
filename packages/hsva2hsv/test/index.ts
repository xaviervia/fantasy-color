import test from 'blue-tape'

import hsva2hsv from '../src'

test('hsva2hsv: standalone', async (t) => {
  const color = hsva2hsv({
    hue: 60,
    saturation: 32,
    value: 23,
    alpha: 0.4
  })

  t.deepEquals(
    color,
    {
      hue: 60,
      saturation: 32,
      value: 23
    },
    'must remove alpha'
  )
})

// test('hsva2hsv: with background')
