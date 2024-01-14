const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    /* other plugins */
    /* remove autoprefixer if you had it here, it's part of postcss-preset-env */
    postcssPresetEnv({
      /* pluginOptions */
      features: {
        'nesting-rules': false,
        'color-function': true
      },
      stage: 2,
      autoprefixer: true
    }),
    require('cssnano')
  ]
}
