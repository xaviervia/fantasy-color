import test from 'blue-tape'

import rgbToHcl from '../src'

test('rgbToHcl: white', async (t) => {
  const color = rgbToHcl({
    red: 255,
    green: 255,
    blue: 255
  })

  t.deepEquals(
    color,
    {
      hue: 0,
      saturation: 0,
      value: 100
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: gray', async (t) => {
  const color = rgbToHcl({
    red: 127,
    green: 127,
    blue: 127
  })

  t.deepEquals(
    color,
    {
      hue: 0,
      saturation: 0,
      value: 50
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: black', async (t) => {
  const color = rgbToHcl({
    red: 0,
    green: 0,
    blue: 0
  })

  t.deepEquals(
    color,
    {
      hue: 0,
      saturation: 0,
      value: 0
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: red', async (t) => {
  const color = rgbToHcl({
    red: 255,
    green: 0,
    blue: 0
  })

  t.deepEquals(
    color,
    {
      hue: 0,
      saturation: 100,
      value: 100
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: green', async (t) => {
  const color = rgbToHcl({
    red: 0,
    green: 255,
    blue: 0
  })

  t.deepEquals(
    color,
    {
      hue: 120,
      saturation: 100,
      value: 100
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: blue', async (t) => {
  const color = rgbToHcl({
    red: 0,
    green: 0,
    blue: 255
  })

  t.deepEquals(
    color,
    {
      hue: 240,
      saturation: 100,
      value: 100
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: purple', async (t) => {
  const color = rgbToHcl({
    red: 255,
    green: 0,
    blue: 255
  })

  t.deepEquals(
    color,
    {
      hue: 300,
      saturation: 100,
      value: 100
    },
    'must turn to HCL'
  )
})

test('rgbToHcl: some color', async (t) => {
  const color = rgbToHcl({
    red: 60,
    green: 32,
    blue: 23
  })

  t.deepEquals(
    color,
    {
      hue: 15,
      saturation: 62,
      value: 24
    },
    'must turn to HCL'
  )
})
