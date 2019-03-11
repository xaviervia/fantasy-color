import { useState } from 'react'
import * as d3 from 'd3-color'

const areThereValuesForRgb = (state) =>
  getValue('red')(state) !== undefined && getValue('red')(state) !== '' &&
  getValue('green')(state) !== undefined && getValue('green')(state) !== '' &&
  getValue('blue')(state) !== undefined && getValue('blue')(state) !== ''

const areThereValuesforHcl = (state) =>
  getValue('hue')(state) !== undefined && getValue('hue')(state) !== '' &&
  getValue('chroma')(state) !== undefined && getValue('chroma')(state) !== '' &&
  getValue('luminance')(state) !== undefined && getValue('luminance')(state) !== ''

const d3hclToStateHcl = ({ h, c, l }) => ({
  hue: String(h), chroma: String(c), luminance: String(l)
})

const d3rgbToStateRgb = ({ r, g, b }) => ({
  red: String(r), green: String(g), blue: String(b)
})

const rgbToD3Rgb = ({ red, green, blue }) =>
  d3.rgb(red, green, blue)

const hclToD3Hcl = ({ hue, chroma, luminance }) =>
  d3.rgb(hue, chroma, luminance)

const getValue = (name) => (state) =>
  state.buffer[name] || state[name]

const rgbToD3Lab = ({ red, green, blue }) =>
  d3.lab(d3.rgb(red, green, blue))

const hclToD3Lab = ({ hue, chroma, luminance }) =>
  d3.lab(d3.hcl(hue, chroma, luminance))

const chopDecimals = (howMany) => (number) =>
  Math.floor(number * Math.pow(10, howMany)) / Math.pow(10, howMany)

const threeDecimals = chopDecimals(3)

const getRgb = ({ luminance, a, b }) => {
  const { r: red, g: green, b: blue } = d3.rgb(d3.lab(luminance, a, b))
  return { red, green, blue }
}

const getHcl = ({ luminance, a, b }) => {
  const { h: hue, c: chroma, l } = d3.hcl(d3.lab(luminance, a, b))
  return { hue, chroma, luminance: l }
}

const printLab = (rgb) => {
  const {l, a, b} = rgbToD3Lab(rgb)
  return `${threeDecimals(l)}, ${threeDecimals(a)}, ${threeDecimals(b)}`
}

const update = (state) => (action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'TYPE':
      return {
        ...state,
        buffer: {
          ...state.buffer,
          [action.payload.name]: action.payload.value
        }
      }

    case 'UPDATE_RGB': {
      const newRgb = {
        ...getRgb(state),
        ...buffer
      }

      return {
        ...state,
        ...rgbToD3Lab(newRgb),
        buffer: {}
      }
    }

    case 'UPDATE_HCL': {
      const newHcl = {
        ...getHcl(state),
        ...buffer
      }

      return {
        ...state,
        ...hclToD3Lab(newHcl),
        buffer: {}
      }
    }

    case 'UPDATE_LAB': {
      return {
        ...state,
        luminance: getValue('luminance')(state),
        a: getValue('a')(state),
        b: getValue('b')(state),
        buffer: {}
      }
    }

    default:
      return state
  }
}

const Input = ({ name, value, dispatch }) => (
  <input
    onChange={
      ({ target: { value } }) => dispatch({
        type: 'TYPE',
        payload: {
          name,
          value
        }
      })
    }
    type='number'
    placeholder={name}
    value={value || ''}
  />
)

const Rgb = ({ luminance, a, b }) => {
  const { red, green, blue } = getRgb({ luminance, a, b })

  return <p>{threeDecimals(red)}, {threeDecimals(green)}, {threeDecimals(blue)}</p>
}

const Hcl = ({ luminance: l, a, b }) => {
  const { hue, chroma, luminance } = getHcl({ l, a, b })

  return <p>{threeDecimals(hue)}, {threeDecimals(chroma)}, {threeDecimals(luminance)}</p>
}

const Square = ({ luminance, a, b }) => {
  const { red, green, blue } = getRgb({ luminance, a, b })

  return <div
    style={{
      width: 100,
      height: 100,
      backgroundColor: `rgb(${red}, ${green}, ${blue})`
    }}
  />
}

const Swatch = ({ luminance, a, b }) => (
  <div>
    <Rgb luminance={luminance} a={a} b={b} />
    <Hcl luminance={luminance} a={a} b={b} />
    <Square luminance={luminance} a={a} b={b} />
  </div>
)

export default () => {
  const [state, setState] = useState({
    buffer: {},
    luminance: 100,
    a: 100,
    b: 10
  })

  const dispatch = (action) => setState(update(state)(action))

  const { red, green, blue } = getRgb(state)
  const { hue, chroma, luminance } = getRgb(state)

  return <div>
    <Swatch {...state} />

    <fieldset>
      <legend>RGB</legend>
      <Input name='red' value={red} dispatch={dispatch} />
      <Input name='green' value={green} dispatch={dispatch} />
      <Input name='blue' value={blue} dispatch={dispatch} />

      <button
        onClick={() => dispatch({ type: 'UPDATE_RGB' })}>
        Update RGB
      </button>
    </fieldset>

    <fieldset>
      <legend>HCL</legend>
      <Input name='hue' value={hue} dispatch={dispatch} />
      <Input name='chroma' value={chroma} dispatch={dispatch} />
      <Input name='luminance' value={luminance} dispatch={dispatch} />

      <button
        onClick={() => dispatch({ type: 'UPDATE_HCL' })}>
        Update HCL
      </button>
    </fieldset>

    <fieldset>
      <legend>LAB</legend>
      <Input name='luminance' value={getValue('luminance')(state)} dispatch={dispatch} />
      <Input name='a' value={getValue('a')(state)} dispatch={dispatch} />
      <Input name='b' value={getValue('b')(state)} dispatch={dispatch} />

      <button
        onClick={() => dispatch({ type: 'UPDATE_LAB' })}>
        Update LAB
      </button>
    </fieldset>
  </div>
}
