export default (targetContrast: number, otherLuminance: number): number =>
  otherLuminance >= 0.5
    ? ((otherLuminance + .05) / targetContrast) - .05
    : (targetContrast * (otherLuminance + .05)) - .05
