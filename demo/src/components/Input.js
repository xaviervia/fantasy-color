import React from 'react'
import { fontFamily } from '../constants'

export default props => (
  <input
    {...props}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck="false"
    style={{
      fontFamily,
      fontSize: 16,
      fontWeight: 500,
      outline: 0,
      margin: 0,
      lineHeight: '20px',
      borderColor: '#EEEEEE',
      borderStyle: 'dashed',
    }}
  />
)
