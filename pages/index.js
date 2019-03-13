import { useState, useEffect } from 'react'
import * as d3 from 'd3-color'
import contrastRatioRgb from '@fantasy-color/contrast-ratio-rgb'

const getValue = (name) => (state) =>
  state.buffer[name] || state[name]

const rgbToD3Lab = ({ red, green, blue }) =>
  d3.lab(d3.rgb(red, green, blue))

const hclToD3Lab = ({ hue, chroma, luminance }) =>
  d3.lab(d3.hcl(hue, chroma, luminance))

const rgbToLab = color => {
  const { l: luminance, a, b } = rgbToD3Lab(color)

  return { luminance, a, b }
}

const hclToLab = color => {
  const { l: luminance, a, b } = hclToD3Lab(color)

  return { luminance, a, b }
}

const clipRgb = ({ red, green, blue }) =>
  ({
    red: Math.max(Math.min(Math.round(red), 255), 0),
    green: Math.max(Math.min(Math.round(green), 255), 0),
    blue: Math.max(Math.min(Math.round(blue), 255), 0),
  })

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

const update = (state) => (action) => {
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
        ...state.buffer
      }

      return {
        ...state,
        ...rgbToLab(newRgb),
        buffer: {}
      }
    }

    case 'UPDATE_HCL': {
      const newHcl = {
        ...getHcl(state),
        ...state.buffer
      }

      return {
        ...state,
        ...hclToLab(newHcl),
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
  const clipped = clipRgb({ red, green, blue })

  return <div>
    <p>{threeDecimals(clipped.red)}, {threeDecimals(clipped.green)}, {threeDecimals(clipped.blue)} - <small>{threeDecimals(red)}, {threeDecimals(green)}, {threeDecimals(blue)}</small></p>
  </div>
}

const Hcl = ({ luminance: l, a, b }) => {
  const { hue, chroma, luminance } = getHcl({ luminance: l, a, b })

  return <p>{threeDecimals(hue)}, {threeDecimals(chroma)}, {threeDecimals(luminance)}</p>
}

const Lab = ({ luminance: l, a, b }) => (
  <p>{threeDecimals(l)}, {threeDecimals(a)}, {threeDecimals(b)}</p>
)

const Square = ({ luminance, a, b }) => {
  const { red, green, blue } = clipRgb(getRgb({ luminance, a, b }))

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
    <Lab luminance={luminance} a={a} b={b} />
    <Square luminance={luminance} a={a} b={b} />
  </div>
)

const DEFAULT_COLOR = {
  luminance: 100,
  a: 100,
  b: 10
}

const MiniApp = ({ onColor }) => {
  const [state, setState] = useState({
    buffer: {},
    ...DEFAULT_COLOR
  })

  useEffect(() => {
    onColor(state.luminance, state.a, state.b)
  }, [state.luminance, state.a, state.b])

  const dispatch = (action) => setState(update(state)(action))

  const { red, green, blue } = {
    ...getRgb(state),
    ...state.buffer
  }

  const { hue, chroma, luminance } = {
    ...getHcl(state),
    ...state.buffer
  }

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

export default () => {
  const [colors, setColors] = useState({
    left: DEFAULT_COLOR,
    right: DEFAULT_COLOR
  })

  return <div>
    <p>
      <strong>
        {contrastRatioRgb(
          clipRgb(getRgb(colors.left)),
          clipRgb(getRgb(colors.right))
        )}
      </strong>
    </p>
    <table>
      <tbody>
        <tr>
          <td>
            <MiniApp
              onColor={(l, a, b) => setColors({
                ...colors,
                left: { luminance: l, a, b }
              })}
            />
          </td>
          <td>
            <MiniApp
              onColor={(l, a, b) => setColors({
                ...colors,
                right: { luminance: l, a, b }
              })}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
}
