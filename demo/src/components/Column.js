import React from 'react'
import Layout from '@primitives/layout'

export default ({ children }) => (
  <Layout
    style={{
      boxSizing: 'border-box',
      width: 500,
    }}
  >
    {children}
  </Layout>
)
