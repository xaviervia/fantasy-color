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
  return {
    red: red != null ? red : 0,
    green: green != null ? green : 0,
    blue: blue != null ? blue : 0,
    alpha: alpha != null ? alpha : 1,
    inspect: function () { return toRGBA(red, green, blue, alpha) },
    toRGBA: function () { return toRGBA(red, green, blue, alpha) },
    toString: function () { return toRGBA(red, green, blue, alpha) },
  }
}

Color.parseHex = function (hex) {
  var red = parseInt(hex.slice(1,3), 16)
  var green = parseInt(hex.slice(3,5), 16)
  var blue = parseInt(hex.slice(5,7), 16)
  return Color.of(red, green, blue, 1)
}

Color.parseRgb = function (rgb) {
  var parts = rgb.split('(')[1].split(')')[0].split(',')
  var red = parseInt(parts[0], 10)
  var green = parseInt(parts[1], 10)
  var blue = parseInt(parts[2], 10)
  return Color.of(red, green, blue, 1)
}

module.exports = Color