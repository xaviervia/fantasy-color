import fromHEX from '.'

export default [
  {
    description: '',
    test: () => fromHEX('#FF0000'),
    shouldEqual: {
      red: 255,
      green: 0,
      blue: 0
    }
  }
]
