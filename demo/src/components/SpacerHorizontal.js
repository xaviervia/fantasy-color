import React from 'react'
import elegir from 'elegir'

export default ({ small, medium }) => (
  <div
    style={{
      width: elegir(medium, 15, small, 5),
    }}
  />
)
