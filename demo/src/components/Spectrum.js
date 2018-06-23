import React, { Component } from 'react'
import { Map, List } from 'immutable'
import { shouldUpdate } from 'recompose'
import {
  AxesHelper,
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  BoxGeometry,
  Vector3,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import Layout from '@primitives/layout'
import Color from '../../../'

const height = 600
const width = 600

global.ImmutableMap = Map
global.ImmutableList = List

const cube = (geometry, color) => {
  const material = new MeshBasicMaterial({
    color: Color.toRGB(color.get('red'), color.get('green'), color.get('blue')),
  })
  const cube = new Mesh(geometry, material)
  cube.position.x = color.get('red') / 2
  cube.position.y = color.get('green') / 2
  cube.position.z = color.get('blue') / 2
  return cube
}

class Spectrum extends Component {
  constructor() {
    super()

    this.camera = new OrthographicCamera(-400, 400, -400, 400, 1, 5000)

    this.camera.position.x = Math.sin(Math.PI / 2) * 400
    this.camera.position.y = 400 // Math.sin(Math.PI / 2) * 400
    this.camera.position.z = Math.sin(Math.PI / 2) * 256
    this.camera.lookAt(128, 128, 128)
    this.camera.rotation.z = Math.sin(Math.PI)

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(width, height)
    this.geometry = new BoxGeometry(1, 1, 1)

    this.onRef = this.onRef.bind(this)
  }

  onRef(domElement) {
    this.domElement = domElement
  }

  componentDidMount() {
    this.domElement.appendChild(this.renderer.domElement)

    this.boundingClientRect = this.domElement.getBoundingClientRect()

    global.addEventListener(
      'scroll',
      () => (this.boundingClientRect = this.domElement.getBoundingClientRect())
    )

    this.scene = new Scene()

    this.props.spectrum.forEach(color => {
      this.scene.add(cube(this.geometry, color))
    })

    const axesHelper = new AxesHelper(500)

    this.scene.add(axesHelper)

    this.renderer.render(this.scene, this.camera)
  }

  componentDidUpdate() {
    this.scene = new Scene()

    this.props.spectrum.forEach(color => {
      this.scene.add(cube(this.geometry, color))
    })

    const axesHelper = new AxesHelper(500)

    this.scene.add(axesHelper)

    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return <div ref={this.onRef} width={width} height={height} />
  }
}

export default Spectrum
