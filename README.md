# fantasy-color

Fantasy Land type for CSS color

## Installation

```sh
yarn add fantasy-color
```

## Usage

```js
import Color from 'fantasy-color'

console.log(Color([254, 213, 92, 0.3]).toString())
// > 'rgba(254, 213, 92, 0.3)'

console.log(Color('#452312').toString())
// > 'rgba(69, 35, 18, 1)'

console.log(Color('rgb(23, 234, 67)').toString())
// > 'rgba(23, 234, 67, 1)'

console.log(Color('rgba(23, 234, 67, .6)').toString())
// > 'rgba(23, 234, 67, 0.6)'

console.log(Color.of(250, 167, 23, 0.8))
// > 'rgba(250, 167, 23, 0.8)'

console.log(Color.of(250, 167, 23, 0.8).toHEX())
// > '#FAA717'
```

### Brightness

Based on http://alienryderflex.com/hsp.html , there is a brightness function that you can use to calculate the perceived brightness of your color, in scale from 0 to 255:

```js
import Color from 'fantasy-color'

console.log(Color('rgba(107, 66, 98, 0.7)').brightness())
// > 58.87944216787384
```

