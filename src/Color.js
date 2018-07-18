var compose = require('ramda/src/compose')
var map = require('ramda/src/map')
var reduce = require('ramda/src/reduce')
var nth = require('ramda/src/nth')
var split = require('ramda/src/split')
var trim = require('ramda/src/trim')

function Color(input) {
  var colors
  if (typeof input === 'string') {
    if (input[0] === '#') {
      if (input.length === 7) {
        colors = [
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
      }

      return undefined
    } else if (input.slice(0, 4) === 'rgba') {
      if (input.indexOf('(') === -1 || input.indexOf(')') === -1) {
        return undefined
      }

      colors = compose(
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
      if (input.indexOf('(') === -1 || input.indexOf(')') === -1) {
        return undefined
      }

      colors = compose(
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

      return colors === undefined
        ? undefined
        : (
          colors.length === 3
            ? Color.of.apply(null, colors)
            : undefined
        )
    }
  } else {
    return Color.of.apply(
      null,
      input
    )
  }
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
    inspect: function () { return Color.toRGBA(red, green, blue, alpha) },
    toRGBA: function () { return Color.toRGBA(red, green, blue, alpha) },
    toString: function () { return Color.toRGBA(red, green, blue, alpha) },
  }
}

module.exports.Color = Color
