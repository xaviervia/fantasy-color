import { Map } from 'immutable'
import { createSelector } from 'reselect'

import Color from '../../../'

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
  const seed = [roundedBrightness, roundedBrightness, roundedBrightness]

  const initiallyCollected = [
    Color.equivalentBrightnessSet(brightness, [seed], {
      modify: 'green',
      affect: 'red',
      variation: 1,
    }),
    Color.equivalentBrightnessSet(brightness, [seed], {
      modify: 'green',
      affect: 'red',
      variation: -1,
    }),
  ]

  const nudgingBlueUpByAffectingRed = nextOnesNudgingBlueUpByAffectingRed(brightness, [], seed)
  const nudgingBlueDownByAffectingRed = nextOnesNudgingBlueDownByAffectingRed(brightness, [], seed)

  const spectrumOfEquivalents = initiallyCollected
    .concat(nudgingBlueDownByAffectingRed)
    .concat(nudgingBlueUpByAffectingRed)
    .reduce((a, b) => a.concat(b), [])

  global.spectrumOfEquivalents = spectrumOfEquivalents

  return spectrumOfEquivalents
})

const nextOnesNudgingBlueUpByAffectingRed = (brightness, collectedNextOnes, seed) => {
  const red = Color.getRedForEquivalentBrightnessColor(brightness, seed[1], seed[2] + 1)
  const green = seed[1]
  const blue = seed[2] + 1

  const nextSeed = [red, green, blue]

  if (blue < 256 && !isNaN(red) && red < 256) {
    const decreasingGreen = Color.equivalentBrightnessSet(brightness, [nextSeed], {
      modify: 'green',
      affect: 'red',
      variation: -1,
    })
    const increasingGreen = Color.equivalentBrightnessSet(brightness, [nextSeed], {
      modify: 'green',
      affect: 'red',
      variation: 1,
    })

    const nextOne = decreasingGreen.concat(increasingGreen)

    if (nextOne.length > 0) {
      return nextOnesNudgingBlueUpByAffectingRed(
        brightness,
        collectedNextOnes.concat([nextOne]),
        nextSeed
      )
    } else {
      return collectedNextOnes
    }
  } else {
    return collectedNextOnes
  }
}

const nextOnesNudgingBlueDownByAffectingRed = (brightness, collectedNextOnes, seed) => {
  const red = Color.getRedForEquivalentBrightnessColor(brightness, seed[1], seed[2] - 1)
  const green = seed[1]
  const blue = seed[2] - 1

  const nextSeed = [red, green, blue]

  if (blue >= 0 && !isNaN(red) && red >= 0) {
    const decreasingGreen = Color.equivalentBrightnessSet(brightness, [nextSeed], {
      modify: 'green',
      affect: 'red',
      variation: -1,
    })
    const increasingGreen = Color.equivalentBrightnessSet(brightness, [nextSeed], {
      modify: 'green',
      affect: 'red',
      variation: 1,
    })

    const nextOne = decreasingGreen.concat(increasingGreen)

    if (nextOne.length > 0) {
      return nextOnesNudgingBlueDownByAffectingRed(
        brightness,
        collectedNextOnes.concat([nextOne]),
        nextSeed
      )
    } else {
      return collectedNextOnes
    }
  } else {
    return collectedNextOnes
  }
}
