import Color from '../src/Color'

export default [
  {
    description: 'builds from hex - test red',
    test: () => Color('#452312').red,
    shouldEqual: 69,
  },
  {
    description: 'builds from hex - test green',
    test: () => Color('#452312').green,
    shouldEqual: 35,
  },
  {
    description: 'builds from hex - test blue',
    test: () => Color('#452312').blue,
    shouldEqual: 18,
  },
  {
    description: 'builds from hex - test alpha',
    test: () => Color('#452312').alpha,
    shouldEqual: 1,
  },
  {
    description: 'builds from hex - incomplete is undefined',
    test: () => Color('#45'),
    shouldEqual: undefined,
  },
  {
    description: 'builds from hex - incomplete is undefined - other example',
    test: () => Color('#0099E'),
    shouldEqual: undefined,
  },
]
