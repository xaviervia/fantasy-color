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

  if (input.slice(0, 3) === 'rgb') {
    const colors = fromRGB(input)

    return colors === undefined || colors.length !== 3
      ? undefined
      : colors
  }
}
