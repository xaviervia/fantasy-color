import React from 'react'
import Layout from '@primitives/layout'
import elegir from 'elegir'

export default ({ small, medium }) => (
  <Layout
    style={{
      width: elegir(medium, 15, small, 5),
    }}
  />
)
