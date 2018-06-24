import React from 'react'
import Layout from '@primitives/layout'
import { SketchPicker } from 'react-color'
import BodyText from './components/BodyText'
import CalculationBreakDown from './components/CalculationBreakDown'
import Column from './components/Column'
import Container from './components/Container'
import Gutter from './components/Gutter'
import Input from './components/Input'
import Row from './components/Row'
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
      <Row>
        <Column>
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

          <CalculationBreakDown colorObject={colorObject} />
        </Column>

        <Gutter />

        <Column>
          <TitleTwo>Colors with equivalent brightness</TitleTwo>

          <SpacerVertical small />

          <BodyText>
            Plotted in 3D "color space". Each axis represents the value of the color used to
            highlight it, from 0 to 256.
          </BodyText>

          <SpacerVertical medium />

          <Spectrum
            width={500}
            height={400}
            onColorChange={onSetColor}
            spectrum={spectrumOfEquivalents}
            onColorHover={onHoverColor}
          />
        </Column>
      </Row>
    </Container>
  ) : (
    <div />
  )
