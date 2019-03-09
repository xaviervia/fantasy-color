import test from 'blue-tape'

import contrastRatioLuminance from '../src'

test('contrast-ratio-luminance', async (t) => {
  const contrastRatio = contrastRatioLuminance(0.4, 0.9)

  t.deepEquals(
    contrastRatio,
    2.111111111111111,
    'must give contrast ratio'
  )
})
