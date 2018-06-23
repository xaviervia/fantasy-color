var Color = require('./src/Color').Color
var brightness = require('./src/brightness')
var toStringForm = require('./src/toStringForm')

Color.brightness = brightness.brightness
Color.getRedForEquivalentBrightnessColor = brightness.getRedForEquivalentBrightnessColor
Color.getGreenForEquivalentBrightnessColor = brightness.getGreenForEquivalentBrightnessColor
Color.getBlueForEquivalentBrightnessColor = brightness.getBlueForEquivalentBrightnessColor
Color.equivalentBrightnessNudgingGreenUpAffectingRed = brightness.equivalentBrightnessNudgingGreenUpAffectingRed
Color.toHEX = toStringForm.toHEX
Color.toRGB = toStringForm.toRGB
Color.toRGBA = toStringForm.toRGBA

module.exports = Color
