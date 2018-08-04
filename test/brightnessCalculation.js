import { example, suite } from 'washington'
import Color from '../src/Color'

const brightnessSuite = suite(
  'brightness',

  example(
    'example 1',
    () => Color('#FF0000').brightness(),
    139.43627576782163,
  ),

  example(
    'example 2',
    () => Color('#00FF00').brightness(),
    195.37060935565512,
  ),

  example(
    'example 3',
    () => Color('#0000FF').brightness(),
    86.09790938228407,
  )
)

const equivalentBrightnessSuite = suite(
  'equivalent brightness',

  example(
    'get red - example 1',
    () => Color.getRedForEquivalentBrightnessColor(128, 125, 134),
    131,
  ),

  example(
    'get green - example 1',
    () => Color.getGreenForEquivalentBrightnessColor(128, 125, 134),
    128,
  ),

  example(
    'get blue - example 1',
    () => Color.getBlueForEquivalentBrightnessColor(128, 125, 134),
    101,
  ),

  example(
    'nudging green up, affecting red - example 1',
    () => Color.equivalentBrightnessSet(
      128,
      [[128, 125, 134]],
      {
        modify: 'green',
        affect: 'red',
        variation: 1,
      }
    ),
    [
      [ 128, 125, 134 ],
      [ 130, 126, 134 ],
      [ 128, 127, 134 ],
      [ 126, 128, 134 ],
      [ 124, 129, 134 ],
      [ 122, 130, 134 ],
      [ 119, 131, 134 ],
      [ 117, 132, 134 ],
      [ 115, 133, 134 ],
      [ 113, 134, 134 ],
      [ 110, 135, 134 ],
      [ 108, 136, 134 ],
      [ 105, 137, 134 ],
      [ 103, 138, 134 ],
      [ 100, 139, 134 ],
      [ 97, 140, 134 ],
      [ 94, 141, 134 ],
      [ 91, 142, 134 ],
      [ 88, 143, 134 ],
      [ 85, 144, 134 ],
      [ 82, 145, 134 ],
      [ 78, 146, 134 ],
      [ 74, 147, 134 ],
      [ 70, 148, 134 ],
      [ 66, 149, 134 ],
      [ 61, 150, 134 ],
      [ 56, 151, 134 ],
      [ 51, 152, 134 ],
      [ 45, 153, 134 ],
      [ 37, 154, 134 ],
      [ 28, 155, 134 ],
      [ 13, 156, 134 ]
    ],
  ),
)

export default brightnessSuite.concat(equivalentBrightnessSuite)
