import React, { Component } from 'react'
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
    this.handleMouseMove = this.handleMouseMove.bind(this)
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

    this.props.spectrum.forEach(values => {
      values.forEach(color => {
        this.scene.add(cube(this.geometry, color))
      })
    })

    const axesHelper = new AxesHelper(500)

    this.scene.add(axesHelper)

    const material = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.1,
    })

    const boundaries = new Mesh(new BoxGeometry(256, 256, 256), material)
    boundaries.position.x = 128
    boundaries.position.y = 128
    boundaries.position.z = 128
    this.scene.add(boundaries)

    this.renderer.render(this.scene, this.camera)
  }

  componentDidUpdate() {
    this.scene = new Scene()

    this.props.spectrum.forEach(values => {
      values.forEach(color => {
        this.scene.add(cube(this.geometry, color))
      })
    })

    const axesHelper = new AxesHelper(500)

    this.scene.add(axesHelper)

    const material = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
    })

    const boundaries = new Mesh(new BoxGeometry(256, 256, 256), material)
    boundaries.position.x = 128
    boundaries.position.y = 128
    boundaries.position.z = 128
    this.scene.add(boundaries)

    this.renderer.render(this.scene, this.camera)
  }

  handleMouseMove(e) {
    const relativeLeft = ((e.clientX - this.boundingClientRect.left - width / 2) / width) * 2
    const relativeTop = ((e.clientY - this.boundingClientRect.top - height / 2) / height) * 2
    console.log('relativeLeft', relativeLeft + 1)
    console.log('relativeTop', relativeTop + 1)

    this.camera.position.x = Math.sin(Math.PI / 2 * (relativeLeft + 1 / 2)) * 400
    this.camera.position.y = 400 + (Math.cos(Math.PI / 2  * (relativeLeft + 1 / 2)) * 400)
    this.camera.position.z = Math.sin(Math.PI / 2) * 256
    this.camera.lookAt(128, 128, 128)
    this.camera.rotation.z = Math.sin(Math.PI)

    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return <div ref={this.onRef} width={width} height={height} onMouseMove={this.handleMouseMove} />
  }
}

export default Spectrum
