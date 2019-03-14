import Head from 'next/head'
import { Fragment, useState, useEffect, useRef } from 'react'
// import normalizeRgb from '@fantasy-color/normalize-rgb'
import luminanceSrgb from '@fantasy-color/luminance-srgb'
import luminanceRgb from '@fantasy-color/luminance-rgb'
import * as d3color from 'd3-color'

const Viewport = ({ children }) => {
  const [viewportSize, updateViewportSize] = useState({ width: undefined, height: undefined })

  useEffect(() => {
    if (global.innerWidth !== undefined) {
      const doTheUpdate = () => updateViewportSize({
        height: global.innerHeight,
        width: global.innerWidth
      })

      global.addEventListener('resize', doTheUpdate)

      doTheUpdate()

      return global.removeEventListener('resize', doTheUpdate)
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <style>
          {`* { margin: 0; padding: 0 }`}
        </style>
      </Head>
      {viewportSize.width !== undefined && (
        children({
          width: viewportSize.width,
          height: viewportSize.height,
          devicePixelRatio:
            global.devicePixelRatio !== undefined
              ? global.devicePixelRatio
              : 1
        })
      )}
    </Fragment>
  )
}

const canvas = (drawer) => ({ width, height, devicePixelRatio }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current !== undefined) {
      const context2d = ref.current.getContext('2d')
      drawer({
        width: width * devicePixelRatio,
        height: height * devicePixelRatio,
        context2d
      })
    }
  })

  return (
    <canvas
      ref={ref}
      width={width * devicePixelRatio}
      height={height * devicePixelRatio}
      style={{
        width,
        height,
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  )
}

const varying = (scale, origin, context2d) => (fx) => {
  context2d.moveTo(...origin)

  const zoom = 1

  for (let i = 0; i <= zoom; i += 0.01) {
    context2d.lineTo(
      origin[0] + i * scale,
      origin[1] - fx(i / zoom) * scale
    )
  }

  context2d.stroke()
}

const BackgroundCanvas = canvas(({ width, height, context2d }) => {
  const smallerSize = Math.min(width, height)
  const usefulSize = smallerSize - 200

  context2d.fillStyle = '#CCCCCC'

  context2d.fillRect(
    (width - usefulSize) / 2,
    (height - usefulSize) / 2,
    usefulSize,
    usefulSize
  )

  global.d3color = d3color
})

const RedCanvas = canvas(({ width, height, context2d }) => {
  const smallerSize = Math.min(width, height)
  const usefulSize = smallerSize - 200


  const origin = [
    (width - usefulSize) / 2,
    height - ((height - usefulSize) / 2)
  ]

  const v = varying(usefulSize, origin, context2d)

  context2d.strokeStyle = 'red'
  v(i => luminanceSrgb({ red: i, green: 0, blue: 0 }))

  v(i => luminanceRgb({ red: Math.floor(i * 255), green: 0, blue: 0 }))
})

const GreenCanvas = canvas(({ width, height, context2d }) => {
  const smallerSize = Math.min(width, height)
  const usefulSize = smallerSize - 200


  const origin = [
    (width - usefulSize) / 2,
    height - ((height - usefulSize) / 2)
  ]

  const v = varying(usefulSize, origin, context2d)

  context2d.strokeStyle = 'green'
  v(i => luminanceSrgb({ red: 0, green: i, blue: 0 }))

  v(i => luminanceRgb({ red: 0, green: Math.floor(i * 255), blue: 0 }))
})

const BlueCanvas = canvas(({ width, height, context2d }) => {
  const smallerSize = Math.min(width, height)
  const usefulSize = smallerSize - 200


  const origin = [
    (width - usefulSize) / 2,
    height - ((height - usefulSize) / 2)
  ]

  const v = varying(usefulSize, origin, context2d)

  context2d.strokeStyle = 'blue'
  v(i => luminanceSrgb({ red: 0, blue: i, green: 0 }))

  v(i => luminanceRgb({ red: 0, blue: Math.floor(i * 255), green: 0 }))
})

const MagentaCanvas = canvas(({ width, height, context2d }) => {
  const smallerSize = Math.min(width, height)
  const usefulSize = smallerSize - 200


  const origin = [
    (width - usefulSize) / 2,
    height - ((height - usefulSize) / 2)
  ]

  const v = varying(usefulSize, origin, context2d)

  context2d.strokeStyle = '#FF00FF'
  v(i => luminanceSrgb({ red: i, blue: i, green: 0 }))

  v(i => luminanceRgb({ red: Math.floor(i * 255), blue: Math.floor(i * 255), green: 0 }))
})

export default () => (
  <Viewport>
    {({
      width,
      height,
      devicePixelRatio
    }) => (
      <Fragment>
        <BackgroundCanvas
          width={width}
          height={height}
          devicePixelRatio={devicePixelRatio}
        />
        <RedCanvas
          width={width}
          height={height}
          devicePixelRatio={devicePixelRatio}
        />
        <GreenCanvas
          width={width}
          height={height}
          devicePixelRatio={devicePixelRatio}
        />
        <BlueCanvas
          width={width}
          height={height}
          devicePixelRatio={devicePixelRatio}
        />
        <MagentaCanvas
          width={width}
          height={height}
          devicePixelRatio={devicePixelRatio}
        />
      </Fragment>
    )}
  </Viewport>
)
