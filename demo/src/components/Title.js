import React from 'react'
import { fontFamily } from '../constants'

export default ({ children }) => (
  <h1
    style={{
      fontFamily,
      fontSize: 30,
      fontWeight: 500,
      margin: 0,
      lineHeight: '40px',
    }}
  >
    {children}
  </h1>
)
