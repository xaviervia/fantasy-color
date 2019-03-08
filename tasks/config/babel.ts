const babelConfigCommon = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.6.0'
        },
        modules: false
      }
    ]
  ]
}

export const babelConfigBuild = {
  ...babelConfigCommon,
  presets: [
    ...babelConfigCommon.presets,
    '@babel/preset-typescript'
  ]
}

export const babelConfigDts = {
  ...babelConfigCommon,
  plugins: [
    '@babel/plugin-syntax-typescript'
  ]
}
