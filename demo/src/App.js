import React from 'react'
import { createStore } from 'redux'
import subscribe from 'redux-heat'
import withStore from 'hoc-with-store'
import elegir from 'elegir'
import Layout from '@primitives/layout'
import { reducer } from './store'
import hashHeat from './heats/hash'
import Color from '../../'

const fontFamily = '"Helvetica Neue", Arial, sans-serif'

const Title = ({ children }) => (
  <h1
    style={{
      fontFamily,
      fontSize: 20,
      fontWeight: 500,
      margin: 0,
      lineHeight: '30px',
    }}
  >
    {children}
  </h1>
)

const SpacerHorizontal = ({ small, medium }) => (
  <div
    style={{
      width: elegir(medium, 15, small, 5),
    }}
  />
)

const SpacerVertical = ({ small, medium }) => (
  <div
    style={{
      height: elegir(medium, 15, small, 5),
    }}
  />
)

const BodyText = ({ children }) => (
  <p
    style={{
      fontFamily,
      fontSize: 16,
      fontWeight: 400,
      margin: 0,
      lineHeight: '20px',
    }}
  >
    {children}
  </p>
)

const Strong = ({ children }) => (
  <strong
    style={{
      fontWeight: 500,
    }}
  >
    {children}
  </strong>
)

const Swatch = ({ color }) => (
  <svg width={80} height={80}>
    <circle cx={40} cy={40} r={40} fill={color} />
  </svg>
)

const Container = ({ children }) => (
  <main
    style={{
      width: 600,
      margin: '0 auto',
    }}
  >
    {children}
  </main>
)

const Input = props => (
  <input
    {...props}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck="false"
    style={{
      fontFamily,
      fontSize: 16,
      fontWeight: 500,
      outline: 0,
      margin: 0,
      lineHeight: '20px',
      borderColor: '#EEEEEE',
      borderStyle: 'dashed',
    }}
  />
)

const store = createStore(
  reducer,
  global && global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__()
)

subscribe(store, [hashHeat])

const updateFromHash = () => {
  if (global !== undefined && global.location !== undefined) {
    const hash = global.location.hash.slice(1)

    if (hash !== 'undefined' && hash !== '') {
      store.dispatch({
        type: 'FROM_HASH',
        payload: decodeURIComponent(hash),
      })
    } else {
      store.dispatch({
        type: 'INITIALIZE',
      })
    }
  }
}

if (global !== undefined && global.addEventListener !== undefined) {
  global.addEventListener('hashchange', updateFromHash)
}

updateFromHash()

const App = ({
  initialized,
  colorWhileEditing,
  brightness,
  color,
  equivalentBrightnessFantasyColor,
  fantasyColor,
  onColorChange,
}) =>
  initialized ? (
    <Container>
      <SpacerVertical medium />
      <Title>Fantasy Color playground</Title>
      <SpacerVertical medium />
      <BodyText>
        Current color <Input autoFocus onChange={onColorChange} value={colorWhileEditing} />
      </BodyText>
      <SpacerVertical small />
      <BodyText>
        Brightness <Strong>{Math.floor(brightness * 100) / 100}</Strong> / 255
      </BodyText>
      <BodyText>
        Equivalently bright shade <Strong>{equivalentBrightnessFantasyColor.toHEX()}</Strong>
      </BodyText>
      <SpacerVertical medium />

      <Layout style={{ flexDirection: 'row' }}>
        <Swatch color={color} />
        <SpacerHorizontal small />
        <Swatch color={equivalentBrightnessFantasyColor.toString()} />
      </Layout>
    </Container>
  ) : (
    <div />
  )

export default withStore(
  store,
  ({ color, colorWhileEditing, initialized }) => {
    const fantasyColor = Color(color)
    const brightness = fantasyColor.brightness()
    const equivalentBrightnessFantasyColor = Color.of(
      Math.round(brightness),
      Math.round(brightness),
      Math.round(brightness),
      1
    )

    return {
      initialized,
      colorWhileEditing,
      color,
      fantasyColor,
      brightness,
      equivalentBrightnessFantasyColor,
    }
  },
  dispatch => ({
    onColorChange: ({ target: { value } }) =>
      dispatch({
        type: 'COLOR_CHANGE',
        payload: value,
      }),
  })
)(App)
