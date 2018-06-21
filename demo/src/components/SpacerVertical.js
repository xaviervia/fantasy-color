import React from 'react'
import elegir from 'elegir'

export default ({ big, small, medium }) => (
  <div
    style={{
      height: elegir(big, 30, medium, 15, small, 5),
    }}
  />
)
