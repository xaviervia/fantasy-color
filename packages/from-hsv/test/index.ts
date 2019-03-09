import test from 'blue-tape'

import fromHSV from '../src'

test('from-hsv: valid', async (t) => {
  const color = fromHSV('   hsv(  60, 70,   40   )')

  t.deepEquals(
    color,
    {
      hue: 60,
      saturation: 70,
      value: 40
    },
    'must parse into object'
  )
})

test('from-hsv: invalid', async (t) => {
  const color = fromHSV('asdf00')

  t.equals(
    color,
    null,
    'must not parse'
  )
})
