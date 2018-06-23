const Color = require('../')

module.exports = [
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
  {
    description: 'toHEX is super buggy',
  },
  {
    description: 'toRGB',
  },
]
