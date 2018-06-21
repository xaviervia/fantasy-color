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

const ConnectedApp = withStore(
  store,
  ({ color, colorWhileEditing, initialized }) => {
    const fantasyColor = Color(color)
    const brightness = fantasyColor.brightness()
    const equivalentBrightnessFantasyColor = Color.of(
      Math.round(brightness),
      Math.round(brightness),
      Math.round(brightness),
      1
    )

    return {
      initialized,
      colorWhileEditing,
      color,
      fantasyColor,
      brightness,
      equivalentBrightnessFantasyColor,
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
