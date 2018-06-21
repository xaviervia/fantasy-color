import React from 'react'
import { fontFamily } from '../constants'

export default ({ children }) => (
  <h1
    style={{
      fontFamily,
      fontSize: 20,
      fontWeight: 500,
      margin: 0,
      lineHeight: '30px',
    }}
  >
    {children}
  </h1>
)
