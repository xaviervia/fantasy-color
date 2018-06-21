import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import subscribe from 'redux-heat'
import withStore from 'hoc-with-store'
import { reducer } from './store'
import hashHeat from './heats/hash'
import getHashDispatcher from './dispatchers/hash'
import Color from '../../'
import App from './App'
import { getFantasyColor } from './selectors'

const store = createStore(
  reducer,
  global && global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__()
)

subscribe(store, [hashHeat])

const hashDispatcher = getHashDispatcher(store.dispatch)

if (global !== undefined && global.addEventListener !== undefined) {
  global.addEventListener('hashchange', hashDispatcher)
}

hashDispatcher()

const red = (brightness, green, blue) =>
  Math.round(
    Math.sqrt(
      (Math.pow(brightness, 2) - Math.pow(blue, 2) * 0.114 - Math.pow(green, 2) * 0.587) / 0.299
    )
  )

const green = (brightness, red, blue) =>
  Math.round(
    Math.sqrt(
      (Math.pow(brightness, 2) - Math.pow(red, 2) * 0.299 - Math.pow(blue, 2) * 0.114) / 0.587
    )
  )

const blue = (brightness, red, green) =>
  Math.round(
    Math.sqrt(
      (Math.pow(brightness, 2) - Math.pow(red, 2) * 0.299 - Math.pow(green, 2) * 0.587) / 0.114
    )
  )

const ConnectedApp = withStore(
  store,
  state => {
    const { color, colorWhileEditing, initialized } = state
    const fantasyColor = getFantasyColor(state)
    const brightness = fantasyColor.brightness()
    const equivalentBrightnessFantasyColor = Color.of(
      Math.round(brightness),
      Math.round(brightness),
      Math.round(brightness),
      1
    )

    const aBitDifferentRed = red(brightness, fantasyColor.green + 5, fantasyColor.blue)
    const aBitDifferent = Color.of(
      aBitDifferentRed,
      fantasyColor.green,
      fantasyColor.blue,
      fantasyColor.alpha
    )

    return {
      initialized,
      colorWhileEditing,
      color,
      fantasyColor,
      brightness,
      equivalentBrightnessFantasyColor,
      aBitDifferentRed,
      aBitDifferent,
    }
  },
  dispatch => ({
    onColorChange: ({ target: { value } }) =>
      dispatch({
        type: 'COLOR_CHANGE',
        payload: value,
      }),
    onColorChangeFromPicker: ({ rgb: { r, g, b, a } }) =>
      dispatch({
        type: 'COLOR_CHANGE',
        payload: `rgba(${r},${g},${b},${a})`,
      }),
  })
)(App)

render(<ConnectedApp />, document.getElementById('root'))
