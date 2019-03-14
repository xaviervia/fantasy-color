import test from 'blue-tape'

import luminanceRgb from '../src'

test('luminance-rgb: white', async (t) => {
  const luminance = luminanceRgb({
    red: 255,
    green: 255,
    blue: 255
  })

  t.deepEquals(
    luminance,
    1,
    'must return the luminance'
  )
})

test('luminance-rgb: grey', async (t) => {
  const luminance = luminanceRgb({
    red: 127,
    green: 127,
    blue: 127
  })

  t.deepEquals(
    luminance,
    0.2122307574140552,
    'must return the luminance'
  )
})

test('luminance-rgb: black', async (t) => {
  const luminance = luminanceRgb({
    red: 0,
    green: 0,
    blue: 0
  })

  t.deepEquals(
    luminance,
    0,
    'must return the luminance'
  )
})

test('luminance-rgb: red', async (t) => {
  const luminance = luminanceRgb({
    red: 255,
    green: 0,
    blue: 0
  })

  t.deepEquals(
    luminance,
    0.2126,
    'must return the luminance'
  )
})

test('luminance-rgb: green', async (t) => {
  const luminance = luminanceRgb({
    red: 0,
    green: 255,
    blue: 0
  })

  t.deepEquals(
    luminance,
    0.7152,
    'must return the luminance'
  )
})

test('luminance-rgb: blue', async (t) => {
  const luminance = luminanceRgb({
    red: 0,
    green: 0,
    blue: 255
  })

  t.deepEquals(
    luminance,
    0.0722,
    'must return the luminance'
  )
})

test('luminance-rgb: intermediate', async (t) => {
  const luminance = luminanceRgb({
    red: 255,
    green: 70,
    blue: 50
  })

  t.deepEquals(
    luminance,
    0.25870607157432435,
    'must return the luminance'
  )
})

test('luminance-rgb: dark color', async (t) => {
  const luminance = luminanceRgb({
    red: 10,
    green: 7,
    blue: 5
  })

  t.deepEquals(
    luminance,
    0.002274449098524859,
    'must return the luminance'
  )
})
