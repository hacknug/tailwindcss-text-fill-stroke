var _ = require('lodash')
var flatten = require('flat')


const FLATTEN_CONFIG = { delimiter: '-', maxDepth: 2 }
const getName = name => name.split('-default').join('')


module.exports = function () {
  return function ({
    addUtilities, addComponents, addBase, addVariant,
    e, prefix, theme, variants, config,
  }) {
    const buildObjectFromTheme = (themeKey, ...fallbackKeys) => {
      const buildObject = ([ modifier, value ]) => [ modifier, { [themeKey]: value } ]
      const getThemeSettings = (themeKey, fallbackKeys) => {
        return theme(themeKey, false) || getThemeSettings([themeKey, ...fallbackKeys] = fallbackKeys)
      }
      const themeEntries = Object
        .entries(flatten(getThemeSettings(themeKey, fallbackKeys), FLATTEN_CONFIG))
        .map(entry => buildObject(entry))

      return _.fromPairs(themeEntries)
    }

    const pluginUtilities = {
      textFillColor: buildObjectFromTheme('textFillColor', 'borderColor'),
      textStrokeColor: buildObjectFromTheme('textStrokeColor', 'borderColor'),
      textStrokeWidth: buildObjectFromTheme('textStrokeWidth', 'borderWidth'),
      // paintOrder: 'https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order',
    }

    Object.entries(pluginUtilities)
      .filter(([ modifier, values ]) => !_.isEmpty(values))
      .forEach(([ modifier, values ]) => {
        const className = _.kebabCase(modifier).split('-').reverse().slice(1).reverse().join('-')
        const variantName = Object.keys(Object.entries(values)[0][1])[0]
        const utilities = flatten({ [`.${e(`${className}`)}`]: values }, FLATTEN_CONFIG)

        addUtilities(
          _.mapKeys(utilities, (value, key) => getName(key)),
          variants(variantName, ['responsive'])
        )
      })
  }
}
