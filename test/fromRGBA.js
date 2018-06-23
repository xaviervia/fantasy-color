const Color = require('../')

module.exports = [
  {
    description: 'builds from rgba - test red',
    test: () => Color('rgba(23, 234, 67, .6)').red,
    shouldEqual: 23,
  },
  {
    description: 'builds from rgba - test green',
    test: () => Color('rgba(23, 234, 67, .6)').green,
    shouldEqual: 234,
  },
  {
    description: 'builds from rgba - test blue',
    test: () => Color('rgba(23, 234, 67, .6)').blue,
    shouldEqual: 67,
  },
  {
    description: 'builds from rgba - test alpha',
    test: () => Color('rgba(23, 234, 67, .6)').alpha,
    shouldEqual: 0.6,
  },
  {
    description: 'builds from rgba - incomplete is undefined',
    test: () => Color('rgba(2, 32, 2,'),
    shouldEqual: undefined,
  },
  {
    description: 'builds from rgba - incomplete is undefined - other example',
    test: () => Color('rgba'),
    shouldEqual: undefined,
  },
]
