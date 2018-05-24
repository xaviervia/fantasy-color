var compose = require('ramda/src/compose')
var map = require('ramda/src/map')
var nth = require('ramda/src/nth')
var split = require('ramda/src/split')
var trim = require('ramda/src/trim')

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

module.exports = Color
