const { buildPlugin } = require('@hacknug/tailwindcss-plugin-utils')
const defaultConfig = require('./tailwind.config.js')

module.exports = function (pluginOptions) {
  return {
    config: defaultConfig,
    handler (coreUtils) {
      return buildPlugin(coreUtils, [
        { key: ['textFillColor', 'borderColor'], base: 'text-fill', property: '-webkit-text-fill-color' },
        { key: ['textStrokeColor', 'borderColor'], base: 'text-stroke', property: '-webkit-text-stroke-color' },
        { key: ['textStrokeWidth', 'borderWidth'], base: 'text-stroke', property: '-webkit-text-stroke-width' },
        { key: ['paintOrder'], base: 'paint' },
      ])
    },
  }
}
