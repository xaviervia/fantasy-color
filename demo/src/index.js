import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import subscribe from 'redux-heat'
import withStore from 'hoc-with-store'
import { reducer } from './store'
import hashHeat from './heats/hash'
import getHashDispatcher from './dispatchers/hash'
import App from './App'
import * as selectors from './selectors'

import R from 'ramda'

global.R = R

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
  state => ({
    initialized: state.get('initialized'),
    colorWhileEditing: state.get('colorWhileEditing'),
    color: state.get('color'),
    colorObject: selectors.getColorObject(state),
    hoveredAltColor: state.get('hoveredAltColor'),
    brightness: selectors.getBrightness(state),
    equivalentBrightnessColor: selectors.getEquivalentBrightnessColor(state),
    spectrumOfEquivalents: selectors.getSpectrumOfEquivalents(state),
  }),
  dispatch => ({
    onSetColor: value =>
      dispatch({
        type: 'COLOR_CHANGE',
        payload: value,
      }),
    onHoverColor: value =>
      dispatch({
        type: 'HOVER_ALT_COLOR',
        payload: value,
      }),
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
