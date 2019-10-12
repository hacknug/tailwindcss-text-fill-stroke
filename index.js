const tailwindConfig = require('./tailwind.config.js')
const { buildPlugin } = require('@hacknug/tailwindcss-plugin-utils')

module.exports = function (pluginConfig) {
  return function (coreUtils) {
    return buildPlugin(coreUtils, tailwindConfig, [
      { key: ['textFillColor', 'borderColor'], base: 'text-fill', property: '-webkit-text-fill-color' },
      { key: ['textStrokeColor', 'borderColor'], base: 'text-stroke', property: '-webkit-text-stroke-color' },
      { key: ['textStrokeWidth', 'borderWidth'], base: 'text-stroke', property: '-webkit-text-stroke-width' },
      { key: ['paintOrder'], base: 'paint' },
    ])
  }
}
