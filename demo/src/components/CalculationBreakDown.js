import React, { Fragment } from 'react'
import BodyText from './BodyText'
import SpacerVertical from './SpacerVertical'
import Strong from './Strong'
import TitleTwo from './TitleTwo'

export default ({ colorObject }) => (
  <Fragment>
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
  </Fragment>
)
