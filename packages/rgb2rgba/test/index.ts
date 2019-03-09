import test from 'blue-tape'

import rgb2rgba from '../src'

test('rgb2rgba', async (t) => {
  const color = rgb2rgba({
    red: 60,
    green: 32,
    blue: 23
  })

  t.deepEquals(
    color,
    {
      red: 60,
      green: 32,
      blue: 23,
      alpha: 1
    },
    'must add alpha 1'
  )
})
