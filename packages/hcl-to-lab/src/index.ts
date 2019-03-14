import { HCL, LAB } from '@fantasy-color/types/src'

// from https://github.com/d3/d3-color/blob/f666cf09dc21efcf570c0cb08e2bc4c864cc3c7c/src/lab.js
export default ({ luminance, hue, chroma }: HCL): LAB => {
  const h = hue * (Math.PI / 180)

  return {
    luminance,
    a: Math.cos(h) * chroma,
    b: Math.sin(h) * chroma
  }
}
