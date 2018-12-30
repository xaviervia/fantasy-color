import washington from 'washington'
import brightnessCalculation from './brightnessCalculation'
import fromArray from './fromArray'
import fromHEX from './fromHEX'
import fromHSVA from './fromHSVA'
import fromOf from './fromOf'
import fromRGB from './fromRGB'
import fromRGBA from './fromRGBA'
import invert from './invert'
import toArray from './toArray'
import toHSVA from './toHSVA'
import toStringForm from './toStringForm'

washington(
  [
    ...brightnessCalculation,
    ...fromArray,
    ...fromHEX,
    ...fromHSVA,
    ...fromOf,
    ...fromRGB,
    ...fromRGBA,
    ...invert,
    ...toArray,
    ...toHSVA,
    ...toStringForm,
  ].filter(({description}) => /HSVA/.test(description))
)
