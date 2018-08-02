import Color from '../src/Color'

export default [
  {
    description: 'builds from array - test red',
    test: () => Color([254, 213, 92, 0.3]).red,
    shouldEqual: 254,
  },
  {
    description: 'builds from array - test green',
    test: () => Color([254, 213, 92, 0.3]).green,
    shouldEqual: 213,
  },
  {
    description: 'builds from array - test blue',
    test: () => Color([254, 213, 92, 0.3]).blue,
    shouldEqual: 92,
  },
  {
    description: 'builds from array - test alpha',
    test: () => Color([254, 213, 92, 0.3]).alpha,
    shouldEqual: 0.3,
  },
]
