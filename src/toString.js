export const toHEX = (red, green, blue) =>
  '#' +
  red.toString(16).toUpperCase() +
  green.toString(16).toUpperCase() +
  blue.toString(16).toUpperCase()

export const toRGB = (red, green, blue) =>
  `rgb(${red}, ${green}, ${blue})`

export const toRGBA = (red, green, blue, alpha) =>
  `rgba(${red}, ${green}, ${blue}, ${alpha})`

// Implementation inspired from
// https://stackoverflow.com/a/4235146/5801727
export const toHSVA = (red, green, blue, alpha) => {
  const normalizedRed = red / 255
  const normalizedGreen = green / 255
  const normalizedBlue = blue / 255
  
  const maximumValue = Math.max(normalizedRed, normalizedGreen, normalizedBlue)
  const minimumValue = Math.min(normalizedRed, normalizedGreen, normalizedBlue)
  const delta = maximumValue - minimumValue

  const value = Math.round( maximumValue * 100 )

  if (delta === 0) {
    // This means that this is gray
    const hue = 0
    const saturation = 0
    return `hsva(${hue}, ${saturation}, ${value}, ${alpha})`
  }

  const saturation = Math.round( ( delta / maximumValue ) * 100 )

  const deltaRed = ( 
    ( (maximumValue - normalizedRed) / 6 ) + 
    ( delta / 2 )
  ) / delta
  const deltaGreen = ( 
    ( (maximumValue - normalizedGreen) / 6 ) + 
    ( delta / 2 )
  ) / delta
  const deltaBlue = ( 
    ( (maximumValue - normalizedBlue) / 6 ) + 
    ( delta / 2 )
  ) / delta
 
  switch (maximumValue) {
    case normalizedRed: {
      const hue = Math.round(
        ( ( ( deltaBlue - deltaGreen ) * 360 ) + 360 ) % 360
      )

      return `hsva(${hue}, ${saturation}, ${value}, ${alpha})`
    }

    case normalizedGreen: {
      const hue = Math.round(
        ( ( ( ( 1 / 3 ) + deltaRed - deltaBlue ) * 360 ) + 360 ) % 360
      )

      return `hsva(${hue}, ${saturation}, ${value}, ${alpha})`
    }

    case normalizedBlue: {
      const hue = Math.round(
        ( ( ( ( 2 / 3 ) + deltaGreen - deltaRed ) * 360 ) + 360 ) % 360
      )

      return `hsva(${hue}, ${saturation}, ${value}, ${alpha})`
    }
  } 
}

export const toHSBA = toHSVA

// export const toHSV = (red, green, blue) => toHSVA(red, green, blue, 1)