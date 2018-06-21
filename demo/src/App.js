import React from 'react'
import Layout from '@primitives/layout'
import { SketchPicker } from 'react-color'
import BodyText from './components/BodyText'
import Container from './components/Container'
import Input from './components/Input'
import SpacerHorizontal from './components/SpacerHorizontal'
import SpacerVertical from './components/SpacerVertical'
import Strong from './components/Strong'
import Swatch from './components/Swatch'
import Title from './components/Title'
import TitleTwo from './components/TitleTwo'

export default ({
  initialized,
  colorWhileEditing,
  brightness,
  aBitDifferent,
  aBitDifferentRed,
  color,
  equivalentBrightnessFantasyColor,
  fantasyColor,
  onColorChange,
  onColorChangeFromPicker,
}) =>
  initialized ? (
    <Container>
      <SpacerVertical big />
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
        Equivalently bright <Strong>{equivalentBrightnessFantasyColor.toHEX()}</Strong>
      </BodyText>
      <BodyText>
        Equivalently bright 2 <Strong>{aBitDifferent.toHEX()}</Strong>
      </BodyText>
      <SpacerVertical medium />
      <Layout style={{ flexDirection: 'row' }}>
        <Swatch color={color} />
        <SpacerHorizontal small />
        <Swatch color={aBitDifferent.toString()} />
        <SpacerHorizontal small />
        <Swatch color={equivalentBrightnessFantasyColor.toString()} />
      </Layout>
      <SpacerVertical medium />
      <SketchPicker
        color={{
          r: fantasyColor.red,
          g: fantasyColor.green,
          b: fantasyColor.blue,
          a: fantasyColor.alpha,
        }}
        onChangeComplete={onColorChangeFromPicker}
      />
      <SpacerVertical big />
      <TitleTwo>Brightness calculation break down</TitleTwo>
      <SpacerVertical small />
      <BodyText light>
        sqrt( <Strong>{fantasyColor.red}</Strong> ^ 2 * 0.299 +{' '}
        <Strong>{fantasyColor.green}</Strong> ^ 2 * 0.587 + <Strong>{fantasyColor.blue}</Strong> ^ 2
        * 0.114 )
      </BodyText>
      <BodyText light>
        sqrt( <Strong>{Math.pow(fantasyColor.red, 2)}</Strong> * 0.299 +{' '}
        <Strong>{Math.pow(fantasyColor.green, 2)}</Strong> * 0.587 +{' '}
        <Strong>{Math.pow(fantasyColor.blue, 2)}</Strong> * 0.114 )
      </BodyText>
      <BodyText light>
        sqrt( <Strong>{Math.pow(fantasyColor.red, 2) * 0.299}</Strong> +{' '}
        <Strong>{Math.pow(fantasyColor.green, 2) * 0.587}</Strong> +{' '}
        <Strong>{Math.pow(fantasyColor.blue, 2) * 0.114}</Strong> )
      </BodyText>
      <BodyText light>
        sqrt({' '}
        <Strong>
          {Math.pow(fantasyColor.red, 2) * 0.299 +
            Math.pow(fantasyColor.green, 2) * 0.587 +
            Math.pow(fantasyColor.blue, 2) * 0.114}
        </Strong>{' '}
        )
      </BodyText>
      <BodyText light>
        <Strong>
          {Math.sqrt(
            Math.pow(fantasyColor.red, 2) * 0.299 +
              Math.pow(fantasyColor.green, 2) * 0.587 +
              Math.pow(fantasyColor.blue, 2) * 0.114
          )}
        </Strong>
      </BodyText>
    </Container>
  ) : (
    <div />
  )
