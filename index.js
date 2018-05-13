const compose = require('ramda/src/compose')
const map = require('ramda/src/map')
const nth = require('ramda/src/nth')
const split = require('ramda/src/split')
const trim = require('ramda/src/trim')

function Color(input) {
  if (typeof input === 'string') {
    if (input[0] === '#') {
      return Color.of.apply(
        null,
        [input.slice(1, 3), input.slice(3, 5), input.slice(5, 7)]
          .map(function (x) { return parseInt(x, 16) })
          .concat(1)
      )
    } else if (input.slice(0, 4) === 'rgba') {
      return Color.of.apply(
        null,
        compose(
          map(
            compose(
              function (x) {
                return x.indexOf('.') !== -1
                  ? parseFloat(x, 10)
                  : parseInt(x, 10)
              },
              trim
            )
          ),
          split(','),
          nth(0),
          split(')'),
          nth(1),
          split('(')
        )(input)
      )
    } else if (input.slice(0, 3) === 'rgb') {
      return Color.of.apply(
        null,
        compose(
          map(
            compose(
              function (x) {
                return parseInt(x, 10)
              },
              trim
            )
          ),
          split(','),
          nth(0),
          split(')'),
          nth(1),
          split('(')
        )(input)
      )
    }
  } else {
    return Color.of.apply(
      null,
      input
    )
  }
}

function toRGBA(red, green, blue, alpha) {
  return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")"
}

Color.of = (red = 0, green = 0, blue = 0, alpha = 1) => ({
  red,
  green,
  blue,
  alpha,
  inspect: function () { return toRGBA(red, green, blue, alpha) },
  toRGBA: function () { return toRGBA(red, green, blue, alpha) },
  toString: function () { return toRGBA(red, green, blue, alpha) },
})

module.exports = Color
