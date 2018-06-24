import React from 'react'
import Layout from '@primitives/layout'
import elegir from 'elegir'

export default ({ big, small, medium }) => (
  <Layout
    style={{
      height: elegir(big, 30, medium, 15, small, 5),
    }}
  />
)
