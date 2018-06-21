import React from 'react'
import { fontFamily } from '../constants'

export default ({ children, light }) => (
  <p
    style={{
      color: light ? '#999' : '#000',
      fontFamily,
      fontSize: 16,
      fontWeight: 400,
      margin: 0,
      lineHeight: '20px',
    }}
  >
    {children}
  </p>
)
