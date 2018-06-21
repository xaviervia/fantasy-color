import React from 'react'
import { fontFamily } from '../constants'

export default ({ children }) => (
  <h2
    style={{
      fontFamily,
      fontSize: 16,
      fontWeight: 500,
      margin: 0,
      lineHeight: '25px',
    }}
  >
    {children}
  </h2>
)
