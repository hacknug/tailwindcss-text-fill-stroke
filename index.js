const _ = require('lodash')

module.exports = function (options = {}) {
  return function ({ addUtilities, config, e }) {
    let { colors, widths, variants } = _.defaults(options, {
      colors: config('borderColors'),
      widths: config('borderWidths'),
    })

    const getName = (name) => name === 'default' ? '' : `-${name}`

    colors = _.map(colors, (color, name) => ({
      [`.${e(`text-fill${getName(name)}`)}`]: { '-webkit-text-fill-color': color },
      [`.${e(`text-stroke${getName(name)}`)}`]: { '-webkit-text-stroke-color': color },
    }))

    widths = _.map(widths, (width, name) => ({
      [`.${e(`text-stroke${getName(name)}`)}`]: { '-webkit-text-stroke-width': width },
    }))

    addUtilities(colors, variants)
    addUtilities(widths, variants)
  }
}
