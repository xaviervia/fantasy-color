export const fromHEX = input =>
  input.length === 7
    ? [
        input.slice(1, 3),
        input.slice(3, 5),
        input.slice(5, 7)
      ]
        .map(x => parseInt(x, 16))
        .reduce(
          (acc, color) =>
            acc === undefined || isNaN(color)
              ? undefined
              : [...acc, color],
          []
        )
    : undefined

export const fromRGBA = input =>
  input.indexOf('(') === -1 || input.indexOf(')') === -1
    ? undefined
    : input
      .split('(')[1]
      .split(')')[0]
      .split(',')
      .map(y => y.trim())
      .map(z =>
        z.indexOf('.') !== -1
          ? parseFloat(z, 10)
          : parseInt(z, 10)
      )
      .reduce(
        (acc, color) =>
          acc === undefined || isNaN(color)
            ? undefined
            : [...acc, color],
        []
      )

export const fromRGB = input =>
  input.indexOf('(') === -1 || input.indexOf(')') === -1
    ? undefined
    : input
      .split('(')[1]
      .split(')')[0]
      .split(',')
      .map(y => parseInt(y.trim(), 10))
      .reduce(
        (acc, color) =>
          acc === undefined || isNaN(color)
            ? undefined
            : [...acc, color],
        []
      )

export const fromHSVA = input => {
  const parsed =
    input.indexOf('(') === -1 || input.indexOf(')') === -1
      ? undefined
      : input
        .split('(')[1]
        .split(')')[0]
        .split(',')
        .map(y => y.trim())
        .map(z =>
          z.indexOf('.') !== -1
            ? parseFloat(z, 10)
            : parseInt(z, 10)
        )
        .reduce(
          (acc, color) =>
            acc === undefined || isNaN(color)
              ? undefined
              : [...acc, color],
          []
        )
        
  if (parsed === undefined) {
    return undefined
  }

  // https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
  const [hue, saturation, value, alpha] = parsed
  const normalizedSaturation = saturation / 100
  const normalizedValue = value / 100

  const C = normalizedValue * normalizedSaturation
  const hueSixths = hue / 60
  const X = C * (1 - Math.abs( ( hueSixths % 2 ) - 1 ) )

  let red1, green1, blue1
  if (hueSixths <= 1) {
    red1 = C
    green1 = X
    blue1 = 0
  } else if (hueSixths <= 2) {
    red1 = X
    green1 = C
    blue1 = 0
  } else if (hueSixths <= 3) {
    red1 = 0
    green1 = C
    blue1 = X
  } else if (hueSixths <= 4) {
    red1 = 0
    green1 = X
    blue1 = C
  } else if (hueSixths <= 5) {
    red1 = X
    green1 = 0
    blue1 = C
  } else if (hueSixths <= 6) {
    red1 = C
    green1 = 0
    blue1 = X
  }

  const m = normalizedValue - C

  const red = Math.round((red1 + m) * 255)
  const green = Math.round((green1 + m) * 255)
  const blue = Math.round((blue1 + m) * 255)

  return [
    red,
    green,
    blue,
    alpha
  ]
}

export default input => {
  if (input[0] === '#') {
    const colors = fromHEX(input)

    return colors === undefined
      ? undefined
      : colors
  }

  if (input.slice(0, 4) === 'rgba') {
    const colors = fromRGBA(input)

    return colors === undefined
      ? undefined
      : colors
  }

  if (input.slice(0, 4) === 'hsva') {
    const colors = fromHSVA(input)

    return colors === undefined
      ? undefined
      : colors
  }

  if (input.slice(0, 3) === 'rgb') {
    const colors = fromRGB(input)

    return colors === undefined || colors.length !== 3
      ? undefined
      : colors
  }
}
