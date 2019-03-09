import test from 'blue-tape'

import rgba2rgb from '../src'

test('rgba2rgb: standalone', async (t) => {
  const color = rgba2rgb({
    red: 60,
    green: 32,
    blue: 23,
    alpha: 0.4
  })

  t.deepEquals(
    color,
    {
      red: 60,
      green: 32,
      blue: 23
    },
    'must remove alpha'
  )
})

// test('rgba2rgb: with background')
