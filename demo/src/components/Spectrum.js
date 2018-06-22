import React, { Component } from 'react'
import { shouldUpdate } from 'recompose'
import {AxesHelper, Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer, BoxGeometry, Vector3, MeshBasicMaterial, Mesh} from 'three'
import Layout from '@primitives/layout'
import Color from '../../../'

const height = 600
const width = 600

const cube = (geometry, color) => {
  const material = new MeshBasicMaterial( {
    color: Color.toRGB(color.get('red'), color.get('green'), color.get('blue'))
  } )
  const cube = new Mesh( geometry, material )
  cube.position.x = (color.get('red'))
  cube.position.y = (color.get('green'))
  cube.position.z = color.get('blue')
  return cube
}

class Spectrum extends Component {
  constructor () {
    super()

    // this.camera = new PerspectiveCamera( 75, width/height, 1, 1000 );
    this.camera = new OrthographicCamera( -100, 100, -100, 100, 1, 3000 );
		// this.camera.position.z = 5;
		this.camera.position.z = 1400;
		this.camera.position.y = 1400;
		this.camera.position.x = 1400;
		// this.camera.position.y = 450;
		// this.camera.position.x = 450;
    //
    this.camera.rotation.y = 0.62;
    this.camera.rotation.x = -0.78;
    // this.camera.rotation.z = -0.3;

    this.renderer = new WebGLRenderer();
    this.renderer.setSize( width, height );
    this.geometry = new BoxGeometry( 1, 1, 1 );

    this.onRef = this.onRef.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  onRef (domElement) {
    this.domElement = domElement
  }

  componentDidMount() {
		this.domElement.appendChild( this.renderer.domElement );

    this.boundingClientRect = this.domElement.getBoundingClientRect()

    global.addEventListener('scroll', () => this.boundingClientRect = this.domElement.getBoundingClientRect())

		// const material = new MeshBasicMaterial( { color: 0x00ff00 } )
		// const material2 = new MeshBasicMaterial( { color: 0xff0000 } )
    // this.props.spectrum.forEach((values, index) => {
		// const cube = new Mesh( this.geometry, material )
		// const cube2 = new Mesh( this.geometry, material2 )
		// this.scene.add( cube )
		// this.scene.add( cube2 )

    // this.props.spectrum.forEach((values, index) => {
    this.scene = new Scene()

    this.props.spectrum.forEach((values) => {
      values.forEach((color) => {
        this.scene.add( cube(this.geometry, color) )
      })
    })

  const axesHelper = new AxesHelper( 500 );

  this.scene.add(axesHelper)

const cube2 = new Mesh( this.geometry, new MeshBasicMaterial( {
  color: 0xff0000
} ) )
this.scene.add(cube2)
		// cube.rotation.x += 0.1;
		// cube.rotation.y += 0.1;

		this.renderer.render( this.scene, this.camera )
  }

  componentDidUpdate() {
    this.scene = new Scene()

    this.props.spectrum.forEach((values) => {
      values.forEach((color) => {
        this.scene.add( cube(this.geometry, color) )
      })
    })

  const axesHelper = new AxesHelper( 500 );

  this.scene.add(axesHelper)

		this.renderer.render( this.scene, this.camera )
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.values !== nextProps.values
  // }

  handleMouseMove (e) {
    			// this.camera.rotation.x += e.clientX / 1000
    			// this.camera.rotation.y += e.clientY / 1000

    const relativeLeft = (width / 2) - (e.clientX - this.boundingClientRect.left)
    const relativeTop = (height / 2) - (e.clientY - this.boundingClientRect.top)
    console.log('relativeLeft', relativeLeft)
    console.log('relativeTop', relativeTop)

    this.camera.position.x = 1400 + relativeLeft / 200
    this.camera.position.y = 1400  -(relativeTop / 200)

    this.camera.rotation.y = 0.62  - (relativeLeft / 1000)
    this.camera.rotation.x = -0.78 - (relativeTop / 1000)
    this.renderer.render( this.scene, this.camera )
  }

  render () {
    return <div
      ref={this.onRef}
      width={width}
      height={height}
      onMouseMove={this.handleMouseMove}
    />
  }
}


export default Spectrum
