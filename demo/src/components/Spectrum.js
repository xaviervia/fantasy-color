import React, { Component } from 'react'
import { shouldUpdate } from 'recompose'
import {Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three'
import Layout from '@primitives/layout'
import Color from '../../../'

class Swatch extends Component {
  constructor() {
    super()
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleMouseOver() {
    this.props.onColorHover(this.props.rgba)
  }

  handleClick() {
    this.props.onColorChange(this.props.rgba)
  }

  render() {
    const { rgba } = this.props
    return (
      <Layout
        title={rgba}
        onMouseOver={this.handleMouseOver}
        onClick={this.handleClick}
        style={{
          cursor: 'pointer',
          width: 2,
          height: 2,
          backgroundColor: rgba,
        }}
      />
    )
  }
}

const Spectrum2 = ({ values, onColorChange, onColorHover }) => (
  <Layout
    style={{
      flexDirection: 'row',
      overflow: 'hidden',
      justifyContent: 'center',
    }}
  >
    {values
      .map(color =>
        Color.toRGBA(color.get('red'), color.get('green'), color.get('blue'), 1).replace(/ /g, '')
      )
      .map((rgba, index) => (
        <Swatch key={index} rgba={rgba} onColorHover={onColorHover} onColorChange={onColorChange} />
      ))}
  </Layout>
)

const height = 600
const width = 600

const cube = (geometry, color) => {
  const material = new MeshBasicMaterial( {
    color: Color.toRGB(color.get('red'), color.get('green'), color.get('blue'))
  } )
  const cube = new Mesh( geometry, material )
  cube.position.x = (color.get('red')) / 2
  cube.position.y = (color.get('green')) / 2
  cube.position.z = color.get('blue') / 2
  return cube
}

class Spectrum extends Component {
  constructor () {
    super()

    this.camera = new PerspectiveCamera( 75, width/height, 1, 1000 );
		this.camera.position.z = 500;
		// this.camera.position.y = 500;
		// this.camera.position.x = 500;

    // this.camera.rotation.y = 120;
    // this.camera.rotation.x = 120;

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

		this.renderer.render( this.scene, this.camera )
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.values !== nextProps.values
  // }

  handleMouseMove (e) {
    			// this.camera.rotation.x += e.clientX / 1000
    			// this.camera.rotation.y += e.clientY / 1000

    // const relativeLeft = (width / 2) - (e.clientX - this.boundingClientRect.left)
    // const relativeTop = (height / 2) - (e.clientY - this.boundingClientRect.top)
    // console.log('relativeLeft', relativeLeft)
    // console.log('relativeTop', relativeTop)
    //
    // this.camera.position.x = relativeLeft / 200
    // this.camera.position.y = -(relativeTop / 200)
    //
    // this.camera.rotation.y = -(relativeLeft / 1000)
    // this.camera.rotation.x = -(relativeTop / 1000)
    // this.renderer.render( this.scene, this.camera )
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
