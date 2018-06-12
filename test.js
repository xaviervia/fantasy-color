const { deepEqual } = require('assert')
const Color = require('.')

module.exports = [
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
    description: 'builds from .of - test red',
    test: () => Color.of(250, 167, 23, 0.8).red,
    shouldEqual: 250,
  },
  {
    description: 'builds from .of - test green',
    test: () => Color.of(250, 167, 23, 0.8).green,
    shouldEqual: 167,
  },
  {
    description: 'builds from .of - test blue',
    test: () => Color.of(250, 167, 23, 0.8).blue,
    shouldEqual: 23,
  },
  {
    description: 'builds from .of - test alpha',
    test: () => Color.of(250, 167, 23, 0.8).alpha,
    shouldEqual: 0.8,
  },
  {
    description: 'toString',
    test: () => Color.of(250, 167, 23, 0.8).toString(),
    shouldEqual: 'rgba(250, 167, 23, 0.8)',
  },
  {
    description: 'inspect',
    test: () => Color.of(250, 167, 23, 0.8).inspect(),
    shouldEqual: 'rgba(250, 167, 23, 0.8)',
  },
  {
    description: 'toHEX returns only the HEX part',
    test: () => Color.of(250, 167, 23, 0.8).toHEX(),
    shouldEqual: '#FAA717',
  },
]
