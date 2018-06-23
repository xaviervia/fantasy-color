const Color = require('../')

module.exports = [
  {
    description: 'brightness - example 1',
    test: () => Color('#FF0000').brightness(),
    shouldEqual: 139.43627576782163,
  },
  {
    description: 'brightness - example 2',
    test: () => Color('#00FF00').brightness(),
    shouldEqual: 195.37060935565512,
  },
  {
    description: 'brightness - example 3',
    test: () => Color('#0000FF').brightness(),
    shouldEqual: 86.09790938228407,
  },
  {
    description: 'equivalent brightness - get red - example 1',
    test: () => Color.getRedForEquivalentBrightnessColor(128, 125, 134),
    shouldEqual: 131,
  },
  {
    description: 'equivalent brightness - get green - example 1',
    test: () => Color.getGreenForEquivalentBrightnessColor(128, 125, 134),
    shouldEqual: 128,
  },
  {
    description: 'equivalent brightness - get blue - example 1',
    test: () => Color.getBlueForEquivalentBrightnessColor(128, 125, 134),
    shouldEqual: 101,
  },
]
