import React from 'react'
import Layout from '@primitives/layout'
import { fontFamily } from '../constants'

export default ({ children }) => (
  <Layout
    style={{
      boxSizing: 'border-box',
      width: 1060,
      fontFamily,
      margin: '0 auto',
    }}
  >
    {children}
  </Layout>
)
