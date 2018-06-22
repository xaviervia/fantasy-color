import React from 'react'
import { fontFamily } from '../constants'

export default ({ children }) => (
  <main
    style={{
      boxSizing: 'border-box',
      width: 1040,
      fontFamily,
      margin: '0 auto',
      paddingLeft: 20,
      paddingRight: 20,
    }}
  >
    {children}
  </main>
)
