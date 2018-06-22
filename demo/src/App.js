import React from 'react'
import Layout from '@primitives/layout'
import { SketchPicker } from 'react-color'
import Color from '../../'
import BodyText from './components/BodyText'
import Container from './components/Container'
import Input from './components/Input'
import SpacerHorizontal from './components/SpacerHorizontal'
import SpacerVertical from './components/SpacerVertical'
import Spectrum from './components/Spectrum'
import Strong from './components/Strong'
import Swatch from './components/Swatch'
import Title from './components/Title'
import TitleTwo from './components/TitleTwo'

export default ({
  initialized,
  colorWhileEditing,
  brightness,
  color,
  equivalentBrightnessColor,
  colorObject,
  hoveredAltColor,
  onColorChange,
  onSetColor,
  onHoverColor,
  onColorChangeFromPicker,
  spectrumOfEquivalents,
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
        Equivalently bright <Strong>{equivalentBrightnessColor}</Strong>
      </BodyText>
      <SpacerVertical medium />
      <Layout style={{ flexDirection: 'row' }}>
        <Swatch color={color} />
        <SpacerHorizontal small />
        <Swatch color={equivalentBrightnessColor} />
      </Layout>
      <SpacerVertical small />
      <BodyText>
        {hoveredAltColor} - {Color(hoveredAltColor).brightness()}
      </BodyText>
      <Spectrum
        onColorChange={onSetColor}
        spectrum={spectrumOfEquivalents}
        onColorHover={onHoverColor}
      />
      <SpacerVertical medium />
      <SketchPicker
        color={{
          r: colorObject.get('red'),
          g: colorObject.get('green'),
          b: colorObject.get('blue'),
          a: colorObject.get('alpha'),
        }}
        onChangeComplete={onColorChangeFromPicker}
      />
      <SpacerVertical big />
      <TitleTwo>Brightness calculation break down</TitleTwo>
      <SpacerVertical small />
      <BodyText light>
        sqrt( <Strong>{colorObject.get('red')}</Strong> ^ 2 * 0.299 +{' '}
        <Strong>{colorObject.get('green')}</Strong> ^ 2 * 0.587 +{' '}
        <Strong>{colorObject.get('blue')}</Strong> ^ 2 * 0.114 )
      </BodyText>
      <BodyText light>
        sqrt( <Strong>{Math.pow(colorObject.get('red'), 2)}</Strong> * 0.299 +{' '}
        <Strong>{Math.pow(colorObject.get('green'), 2)}</Strong> * 0.587 +{' '}
        <Strong>{Math.pow(colorObject.get('blue'), 2)}</Strong> * 0.114 )
      </BodyText>
      <BodyText light>
        sqrt( <Strong>{Math.pow(colorObject.get('red'), 2) * 0.299}</Strong> +{' '}
        <Strong>{Math.pow(colorObject.get('green'), 2) * 0.587}</Strong> +{' '}
        <Strong>{Math.pow(colorObject.get('blue'), 2) * 0.114}</Strong> )
      </BodyText>
      <BodyText light>
        sqrt({' '}
        <Strong>
          {Math.pow(colorObject.get('red'), 2) * 0.299 +
            Math.pow(colorObject.get('green'), 2) * 0.587 +
            Math.pow(colorObject.get('blue'), 2) * 0.114}
        </Strong>{' '}
        )
      </BodyText>
      <BodyText light>
        <Strong>
          {Math.sqrt(
            Math.pow(colorObject.get('red'), 2) * 0.299 +
              Math.pow(colorObject.get('green'), 2) * 0.587 +
              Math.pow(colorObject.get('blue'), 2) * 0.114
          )}
        </Strong>
      </BodyText>
    </Container>
  ) : (
    <div />
  )
