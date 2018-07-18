import React, { Component } from 'react'
import {
  AxesHelper,
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import boundaries from './boundaries'
import Color from '../../../../'

const cube = (geometry, color) => {
  const material = new MeshBasicMaterial({
    color: Color.toRGB(color[0], color[1], color[2]),
  })
  const cube = new Mesh(geometry, material)
  cube.position.x = color[0]
  cube.position.y = color[1]
  cube.position.z = color[2]
  return cube
}

class Spectrum extends Component {
  constructor(props, context) {
    super(props, context)

    this.camera = new OrthographicCamera(-256, 256, -256, 256, 1, 5000)

    this.camera.position.x = 256
    this.camera.position.y = 256
    this.camera.position.z = 256
    this.camera.lookAt(0, 0, 0)
    this.camera.rotation.z = -0.5238

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(props.width, props.height)
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

    boundaries.forEach(boundary => {
      this.scene.add(boundary)
    })

    this.renderer.render(this.scene, this.camera)
  }

  componentDidUpdate() {
    this.scene = new Scene()

    this.props.spectrum.forEach(color => {
      this.scene.add(cube(this.geometry, color))
    })

    const axesHelper = new AxesHelper(500)

    this.scene.add(axesHelper)

    boundaries.forEach(boundary => {
      this.scene.add(boundary)
    })

    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const { width, height } = this.props
    return <div ref={this.onRef} width={width} height={height} />
  }
}

export default Spectrum
