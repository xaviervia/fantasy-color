import washington from 'washington'
import brightnessCalculation from './brightnessCalculation'
import fromArray from './fromArray'
import fromHEX from './fromHEX'
import fromOf from './fromOf'
import fromRGB from './fromRGB'
import fromRGBA from './fromRGBA'
import toStringForm from './toStringForm'

washington(
  [
    ...brightnessCalculation,
    ...fromArray,
    ...fromHEX,
    ...fromOf,
    ...fromRGB,
    ...fromRGBA,
    ...toStringForm,
  ]
)
