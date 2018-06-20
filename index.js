var compose = require('ramda/src/compose')
var map = require('ramda/src/map')
var reduce = require('ramda/src/reduce')
var nth = require('ramda/src/nth')
var split = require('ramda/src/split')
var trim = require('ramda/src/trim')

function Color(input) {
  if (typeof input === 'string') {
    if (input[0] === '#') {
      const colors = [
        input.slice(1, 3),
        input.slice(3, 5),
        input.slice(5, 7)
      ]
        .map(function (x) { return parseInt(x, 16) })
        .reduce(function (acc, color) {
          if (acc === undefined) {
            return undefined
          }

          return isNaN(color) ? undefined : acc.concat(color)
        }, [])

      return colors === undefined
        ? undefined
        : Color.of.apply(null, colors)
    } else if (input.slice(0, 4) === 'rgba') {
      const colors = compose(
        reduce(
          function (acc, color) {
            if (acc === undefined) {
              return undefined
            }

            return isNaN(color) ? undefined : acc.concat(color)
          }, []
        ),
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

      return colors === undefined
        ? undefined
        : Color.of.apply(null, colors)
    } else if (input.slice(0, 3) === 'rgb') {
      const colors = compose(
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

      return colors.length === 3
        ? Color.of.apply(null, colors)
        : undefined
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

Color.of = function (red, green, blue, alpha) {
  red = red != null ? red : 0
  green = green != null ? green : 0
  blue = blue != null ? blue : 0
  alpha = alpha != null ? alpha : 1
  return {
    red: red,
    green: green,
    blue: blue,
    alpha: alpha,
    brightness: function () { return Color.brightness(red, green, blue, alpha) },
    toHEX: function () { return Color.toHEX(red, green, blue) },
    inspect: function () { return toRGBA(red, green, blue, alpha) },
    toRGBA: function () { return toRGBA(red, green, blue, alpha) },
    toString: function () { return toRGBA(red, green, blue, alpha) },
  }
}

// Magical weights for calculating perceived relative brightness
// Taken from http://alienryderflex.com/hsp.html
var RED_BRIGHTNESS_WEIGHT = 0.299
var GREEN_BRIGHTNESS_WEIGHT = 0.587
var BLUE_BRIGHTNESS_WEIGHT = 0.114

Color.brightness = function (red, green, blue, alpha) {
  return Math.sqrt(
    Math.pow(red, 2) * RED_BRIGHTNESS_WEIGHT +
    Math.pow(green, 2) * GREEN_BRIGHTNESS_WEIGHT +
    Math.pow(blue, 2) * BLUE_BRIGHTNESS_WEIGHT
  ) * alpha
}

Color.toHEX = function (red, green, blue) {
  return '#' +
    red.toString(16).toUpperCase() +
    green.toString(16).toUpperCase() +
    blue.toString(16).toUpperCase()
}

module.exports = Color
