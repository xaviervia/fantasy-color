# @fantasy-color/luminance-rgb

Calculate the [relative luminance](../../#relative-luminance) of an `RGB` color

```typescript
type luminanceRgb = (color: RGB) => number
```

Example usage:

```javascript
import luminanceRgb from '@fantasy-color/luminance-rgb'

luminanceRgb({
  red: 255,
  green: 70,
  blue: 50
})
// > 0.25870607157432435
```
