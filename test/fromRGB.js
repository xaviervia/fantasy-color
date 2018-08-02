import Color from '../src/Color'

export default [
  {
    description: 'builds from rgb - test red',
    test: () => Color('rgb(23, 234, 67)').red,
    shouldEqual: 23,
  },
  {
    description: 'builds from rgb - test green',
    test: () => Color('rgb(23, 234, 67)').green,
    shouldEqual: 234,
  },
  {
    description: 'builds from rgb - test blue',
    test: () => Color('rgb(23, 234, 67)').blue,
    shouldEqual: 67,
  },
  {
    description: 'builds from rgb - test alpha',
    test: () => Color('rgb(23, 234, 67)').alpha,
    shouldEqual: 1,
  },
  {
    description: 'builds from rgb - incomplete is undefined',
    test: () => Color('rgb(2'),
    shouldEqual: undefined,
  },
  {
    description: 'builds from rgb - incomplete is undefined - other example',
    test: () => Color('rgb'),
    shouldEqual: undefined,
  },
  {
    description: 'builds from rgb - incomplete is undefined - third example',
    test: () => Color('rgb(255,22, '),
    shouldEqual: undefined,
  },
]
