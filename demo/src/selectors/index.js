import { List, Map } from 'immutable'
import { createSelector } from 'reselect'

import Color from '../../../'

const red = (brightness, green, blue) =>
  Math.round(
    Math.sqrt(
      (Math.pow(brightness, 2) - Math.pow(blue, 2) * 0.114 - Math.pow(green, 2) * 0.587) / 0.299
    )
  )

const green = (brightness, red, blue) =>
  Math.round(
    Math.sqrt(
      (Math.pow(brightness, 2) - Math.pow(red, 2) * 0.299 - Math.pow(blue, 2) * 0.114) / 0.587
    )
  )

const blue = (brightness, red, green) =>
  Math.round(
    Math.sqrt(
      (Math.pow(brightness, 2) - Math.pow(red, 2) * 0.299 - Math.pow(green, 2) * 0.587) / 0.114
    )
  )

export const getColorObject = state => {
  const { red, green, blue, alpha } = Color(state.get('color'))

  return Map({
    red,
    green,
    blue,
    alpha,
  })
}

export const getBrightness = createSelector(getColorObject, colorObject =>
  Color.brightness(colorObject.get('red'), colorObject.get('green'), colorObject.get('blue'), 1)
)

export const getEquivalentBrightnessColor = createSelector(getBrightness, brightness =>
  Color.toHEX(Math.round(brightness), Math.round(brightness), Math.round(brightness))
)

// TODO:
// - Are there duplicates?

export const getSpectrumOfEquivalents = createSelector(getBrightness, brightness => {
  const roundedBrightness = Math.round(brightness)
  const seed = Map({
    red: roundedBrightness,
    green: roundedBrightness,
    blue: roundedBrightness,
  })

  const nudgingBlueUpByAffectingRed = nextOnesNudgingBlueUpByAffectingRed(brightness, List(), seed)
  const nudgingBlueDownByAffectingRed = nextOnesNudgingBlueDownByAffectingRed(brightness, List(), seed)

  const nudgingBlueUpByAffectingGreen = nextOnesNudgingBlueUpByAffectingGreen(brightness, List(), seed)
  const nudgingBlueDownByAffectingGreen = nextOnesNudgingBlueDownByAffectingGreen(brightness, List(), seed)

  const spectrumOfEquivalents = nudgingBlueDownByAffectingRed.reverse().concat(nudgingBlueUpByAffectingRed)
  .concat(nudgingBlueDownByAffectingGreen.reverse().concat(nudgingBlueUpByAffectingGreen))
  .reduce((a, b) => a.concat(b), List())

  global.spectrumOfEquivalents = spectrumOfEquivalents

  return spectrumOfEquivalents
})

const nextOnesNudgingBlueUpByAffectingRed = (brightness, collectedNextOnes, seed) => {
  console.log('nudgingBlueUp', brightness)
  const nextOnes =
    collectedNextOnes.size === 0
      ? collectedNextOnes.push(
          nextOnesIncreasingGreenAndModifyingRed(brightness, List().push(seed))
        )
      : collectedNextOnes

  const nextSeed = Map({
    red: red(brightness, seed.get('green'), seed.get('blue') + 1),
    green: seed.get('green'),
    // red: seed.get('red'),
    // green: green(brightness, seed.get('red'), seed.get('blue') + 1),
    blue: seed.get('blue') + 1,
  })

  if (nextSeed.get('blue') < 256 && !isNaN(nextSeed.get('red')) && nextSeed.get('red') < 256) {
    const decreasingGreen = nextOnesDecreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )
    const increasingGreen = nextOnesIncreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )

    const nextOne = decreasingGreen.reverse().concat(increasingGreen)

    if (nextOne.size > 0) {
      return nextOnesNudgingBlueUpByAffectingRed(brightness, collectedNextOnes.push(nextOne), nextSeed)
    } else {
      return collectedNextOnes
    }
  } else {
    return collectedNextOnes
  }
}

const nextOnesNudgingBlueUpByAffectingGreen = (brightness, collectedNextOnes, seed) => {
  console.log('nudgingBlueUp', brightness)
  const nextOnes =
    collectedNextOnes.size === 0
      ? collectedNextOnes.push(
          nextOnesIncreasingGreenAndModifyingRed(brightness, List().push(seed))
        )
      : collectedNextOnes

  const nextSeed = Map({
    // red: red(brightness, seed.get('green'), seed.get('blue') + 1),
    // green: seed.get('green'),
    red: seed.get('red'),
    green: green(brightness, seed.get('red'), seed.get('blue') + 1),
    blue: seed.get('blue') + 1,
  })

  if (nextSeed.get('blue') < 256 && !isNaN(nextSeed.get('red')) && nextSeed.get('red') < 256) {
    const decreasingGreen = nextOnesDecreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )
    const increasingGreen = nextOnesIncreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )

    const nextOne = decreasingGreen.reverse().concat(increasingGreen)

    if (nextOne.size > 0) {
      return nextOnesNudgingBlueUpByAffectingGreen(brightness, collectedNextOnes.push(nextOne), nextSeed)
    } else {
      return collectedNextOnes
    }
  } else {
    return collectedNextOnes
  }
}

const nextOnesNudgingBlueDownByAffectingRed = (brightness, collectedNextOnes, seed) => {
  const nextOnes =
    collectedNextOnes.size === 0
      ? collectedNextOnes.push(
          nextOnesIncreasingGreenAndModifyingRed(brightness, List().push(seed))
        )
      : collectedNextOnes

  const nextSeed = Map({
    red: red(brightness, seed.get('green'),seed.get('blue') - 1),
    green: seed.get('green'),
    // red: seed.get('red'),
    // green: green(brightness, seed.get('red'), seed.get('blue') - 1),
    blue: seed.get('blue') - 1,
  })

  if (nextSeed.get('blue') >= 0 && !isNaN(nextSeed.get('red')) && nextSeed.get('red') >= 0) {
    const decreasingGreen = nextOnesDecreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )
    const increasingGreen = nextOnesIncreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )

    const nextOne = decreasingGreen.reverse().concat(increasingGreen)

    if (nextOne.size > 0) {
      return nextOnesNudgingBlueDownByAffectingRed(brightness, collectedNextOnes.push(nextOne), nextSeed)
    } else {
      return collectedNextOnes
    }
  } else {
    return collectedNextOnes
  }
}

const nextOnesNudgingBlueDownByAffectingGreen = (brightness, collectedNextOnes, seed) => {
  const nextOnes =
    collectedNextOnes.size === 0
      ? collectedNextOnes.push(
          nextOnesIncreasingGreenAndModifyingRed(brightness, List().push(seed))
        )
      : collectedNextOnes

  const nextSeed = Map({
    // red: red(brightness, seed.get('green'),seed.get('blue') - 1),
    // green: seed.get('green'),
    red: seed.get('red'),
    green: green(brightness, seed.get('red'), seed.get('blue') - 1),
    blue: seed.get('blue') - 1,
  })

  if (nextSeed.get('blue') >= 0 && !isNaN(nextSeed.get('red')) && nextSeed.get('red') >= 0) {
    const decreasingGreen = nextOnesDecreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )
    const increasingGreen = nextOnesIncreasingGreenAndModifyingRed(
      brightness,
      List().push(nextSeed)
    )

    const nextOne = decreasingGreen.reverse().concat(increasingGreen)

    if (nextOne.size > 0) {
      return nextOnesNudgingBlueDownByAffectingGreen(brightness, collectedNextOnes.push(nextOne), nextSeed)
    } else {
      return collectedNextOnes
    }
  } else {
    return collectedNextOnes
  }
}

const nextOnesIncreasingGreenAndModifyingRed = (brightness, nextOnes) => {
  const nextOne = Map({
    red: red(brightness, nextOnes.last().get('green') + 1, nextOnes.last().get('blue')),
    green: nextOnes.last().get('green') + 1,
    blue: nextOnes.last().get('blue'),
  })

  if (nextOne.get('green') < 256 && !isNaN(nextOne.get('red')) && nextOne.get('red') < 256) {
    return nextOnesIncreasingGreenAndModifyingRed(brightness, nextOnes.push(nextOne))
  } else {
    return nextOnes
  }
}

const nextOnesDecreasingGreenAndModifyingRed = (brightness, nextOnes) => {
  const nextOne = Map({
    red: red(brightness, nextOnes.last().get('green') - 1, nextOnes.last().get('blue')),
    green: nextOnes.last().get('green') - 1,
    blue: nextOnes.last().get('blue'),
  })

  if (nextOne.get('green') >= 0 && !isNaN(nextOne.get('red')) && nextOne.get('red') >= 0) {
    return nextOnesDecreasingGreenAndModifyingRed(brightness, nextOnes.push(nextOne))
  } else {
    return nextOnes
  }
}
