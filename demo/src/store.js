import Color from '../../'

export const initialState = {
  initialized: false,
  color: '#0099EE',
  colorWhileEditing: '#0099EE',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COLOR_CHANGE': {
      const maybeColor = Color(action.payload)

      return {
        ...state,
        colorWhileEditing: action.payload,
        color: maybeColor === undefined ? state.color : action.payload
      }
    }

    case 'FROM_HASH': {
      const maybeColor = Color(action.payload)

      return maybeColor === undefined
        ? {
          ...state,
          initialized: true,
        }
        : {
          ...state,
          colorWhileEditing: action.payload,
          color: action.payload,
          initialized: true,
        }
    }

    case 'INITIALIZE': {
      return {
        ...state,
        initialized: true,
      }
    }

    default:
      return state
  }
}
