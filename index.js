import { flatten } from 'flat'
import plugin from 'tailwindcss/plugin'

const normalizeValues = (config) => Object.fromEntries(
  Object.entries(flatten(config, { delimiter: '-', maxDepth: 2 })).sort(([a], [b]) => a === 'DEFAULT' ? -1 : 1)
)

export default plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    { 'text-fill': (value) => ({ '-webkit-text-fill-color': value }) },
    { values: normalizeValues(theme('textFillColor', theme('borderColor'))), type: ['color'] },
  )
  matchUtilities(
    { 'text-stroke': (value) => ({ '-webkit-text-stroke-color': value }) },
    { values: normalizeValues(theme('textStrokeColor', theme('borderColor'))), type: ['color'] },
  )
  matchUtilities(
    { 'text-stroke': (value) => ({ '-webkit-text-stroke-width': value }) },
    { values: normalizeValues(theme('textStrokeWidth', theme('borderWidth'))), type: ['length'] },
  )
  matchUtilities(
    { 'paint': (value) => ({ paintOrder: value }) },
    { values: normalizeValues(theme('paintOrder')) },
  )
}, {
  theme: {
    paintOrder: {
      'fsm': 'fill stroke markers',
      'fms': 'fill markers stroke',
      'sfm': 'stroke fill markers',
      'smf': 'stroke markers fill',
      'mfs': 'markers fill stroke',
      'msf': 'markers stroke fill',
    },
  },
})
