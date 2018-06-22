import { Map } from 'immutable'
import Color from '../../'

export const initialState = Map()
  .set('initialized', false)
  .set('color', '#0099EE')
  .set('colorWhileEditing', '#0099EE')

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COLOR_CHANGE': {
      const maybeColor = Color(action.payload)

      return state
        .set('colorWhileEditing', action.payload)
        .set('color', maybeColor === undefined ? state.get('color') : action.payload)
    }

    case 'HOVER_ALT_COLOR': {
      return state.set('hoveredAltColor', action.payload)
    }

    case 'FROM_HASH': {
      const maybeColor = Color(action.payload)

      return maybeColor === undefined
        ? state.set('initialized', true)
        : state
            .set('initialized', true)
            .set('colorWhileEditing', action.payload)
            .set('color', action.payload)
    }

    case 'INITIALIZE': {
      return state.set('initialized', true)
    }

    default:
      return state
  }
}
