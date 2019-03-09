import test from 'blue-tape'

import fromHSVA from '../src'

test('from-hsva: valid', async (t) => {
  const color = fromHSVA('   hsva(  60, 70,   40 , 0.6  )')

  t.deepEquals(
    color,
    {
      hue: 60,
      saturation: 70,
      value: 40,
      alpha: 0.6
    },
    'must parse into object'
  )
})

test('from-hsva: invalid', async (t) => {
  const color = fromHSVA('asdf00')

  t.equals(
    color,
    null,
    'must not parse'
  )
})
