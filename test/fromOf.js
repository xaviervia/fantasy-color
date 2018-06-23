const Color = require('../')

module.exports = [
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
]
