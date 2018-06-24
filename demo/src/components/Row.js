import React from 'react'
import Layout from '@primitives/layout'

export default ({ children }) => (
  <Layout
    style={{
      flexDirection: 'row',
    }}
  >
    {children}
  </Layout>
)
