# fantasy-color

## References

- [Online WCAG contrast ratio calculator](https://snook.ca/technical/colour_contrast/colour.html#fg=FFFFFF,bg=FFFFFF)

### Why sRGB?

Turns out that sRGB is the color space in which it was specificed the formula for relative luminance used by WCAG for the contrast ratio calculation. https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

This seems to be a historical accident. sRGB appears to be explicitly deprecated by the w3c https://www.w3.org/Graphics/Color/sRGB.html , raising the question on why would WCAG be specified in a way that makes it actually harder to calculate from the standard CSS RGB.
