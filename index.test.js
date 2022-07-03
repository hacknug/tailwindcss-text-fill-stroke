const postcss = require('postcss')
const tailwind = require('tailwindcss')

expect.extend({ toMatchCss: require('jest-matcher-css') })

const plugin = require('./index.js')
const pluginOptions = {}

const commonConfig = {
  theme: {
    screens: { sm: '640px' },
    colors: {
      // inherit: 'inherit',
      // current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121',
      },
    },
  },
  plugins: [plugin],
  corePlugins: false,
  safelist: [
    { pattern: /.*/ },
  ],
}

test('generates default utilities', () => {
  const testConfig = { ...commonConfig }
  const expectedCss = `
    .text-fill { -webkit-text-fill-color: #eeeeee; }
    .text-fill-transparent { -webkit-text-fill-color: transparent }
    .text-fill-black { -webkit-text-fill-color: #000 }
    .text-fill-white { -webkit-text-fill-color: #fff }
    .text-fill-gray-100 { -webkit-text-fill-color: #f5f5f5 }
    .text-fill-gray-200 { -webkit-text-fill-color: #eeeeee }
    .text-fill-gray-300 { -webkit-text-fill-color: #e0e0e0 }
    .text-fill-gray-400 { -webkit-text-fill-color: #bdbdbd }
    .text-fill-gray-500 { -webkit-text-fill-color: #9e9e9e }
    .text-fill-gray-600 { -webkit-text-fill-color: #757575 }
    .text-fill-gray-700 { -webkit-text-fill-color: #616161 }
    .text-fill-gray-800 { -webkit-text-fill-color: #424242 }
    .text-fill-gray-900 { -webkit-text-fill-color: #212121 }

    .text-stroke { -webkit-text-stroke-color: #eeeeee }
    .text-stroke-transparent { -webkit-text-stroke-color: transparent }
    .text-stroke-black { -webkit-text-stroke-color: #000 }
    .text-stroke-white { -webkit-text-stroke-color: #fff }
    .text-stroke-gray-100 { -webkit-text-stroke-color: #f5f5f5 }
    .text-stroke-gray-200 { -webkit-text-stroke-color: #eeeeee }
    .text-stroke-gray-300 { -webkit-text-stroke-color: #e0e0e0 }
    .text-stroke-gray-400 { -webkit-text-stroke-color: #bdbdbd }
    .text-stroke-gray-500 { -webkit-text-stroke-color: #9e9e9e }
    .text-stroke-gray-600 { -webkit-text-stroke-color: #757575 }
    .text-stroke-gray-700 { -webkit-text-stroke-color: #616161 }
    .text-stroke-gray-800 { -webkit-text-stroke-color: #424242 }
    .text-stroke-gray-900 { -webkit-text-stroke-color: #212121 }

    .text-stroke { -webkit-text-stroke-width: 1px }
    .text-stroke-0 { -webkit-text-stroke-width: 0px }
    .text-stroke-2 { -webkit-text-stroke-width: 2px }
    .text-stroke-4 { -webkit-text-stroke-width: 4px }
    .text-stroke-8 { -webkit-text-stroke-width: 8px }

    .paint-fsm { paint-order: fill stroke markers }
    .paint-fms { paint-order: fill markers stroke }
    .paint-sfm { paint-order: stroke fill markers }
    .paint-smf { paint-order: stroke markers fill }
    .paint-mfs { paint-order: markers fill stroke }
    .paint-msf { paint-order: markers stroke fill }
  `

  return postcss(tailwind(testConfig)).process('@tailwind utilities', { from: undefined })
    .then((result) => expect(result.css).toMatchCss(expectedCss))
})

test('utilities can be customized', () => {
  const testConfig = {
    ...commonConfig,
    theme: {
      textFillColor: theme => ({
        DEFAULT: '#38b2ac',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: '#9e9e9e',
      }),
      textStrokeColor: theme => ({
        DEFAULT: '#38b2ac',
        transparent: theme('colors.transparent'),
      }),
      textStrokeWidth: { DEFAULT: '1px', sm: '2px', md: '4px', lg: '8px' },
      paintOrder: { stroke: 'stroke' }
    },
  }
  const expectedCss = `
    .text-fill { -webkit-text-fill-color: #38b2ac }
    .text-fill-transparent { -webkit-text-fill-color: transparent }
    .text-fill-black { -webkit-text-fill-color: #000 }
    .text-fill-white { -webkit-text-fill-color: #fff }
    .text-fill-gray { -webkit-text-fill-color: #9e9e9e }

    .text-stroke { -webkit-text-stroke-color: #38b2ac }
    .text-stroke-transparent { -webkit-text-stroke-color: transparent }

    .text-stroke { -webkit-text-stroke-width: 1px; }
    .text-stroke-sm { -webkit-text-stroke-width: 2px }
    .text-stroke-md { -webkit-text-stroke-width: 4px }
    .text-stroke-lg { -webkit-text-stroke-width: 8px }

    .paint-stroke { paint-order: stroke }
  `

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchCss(expectedCss))
})

test('variants can be customized', () => {
  const testConfig = {
    ...commonConfig,
    safelist: [],
    content: [
      { raw: String.raw`<div class="text-fill-white text-stroke sm:text-stroke-2 text-stroke-black hover:text-fill-gray-300 focus:text-stroke-gray-900"></div>` },
    ],
  }
  const expectedCss = `
    .text-fill-white { -webkit-text-fill-color: #fff }
    .text-stroke { -webkit-text-stroke-color: #eeeeee }
    .text-stroke-black { -webkit-text-stroke-color: #000 }
    .text-stroke { -webkit-text-stroke-width: 1px }

    .hover\\:text-fill-gray-300:hover { -webkit-text-fill-color: #e0e0e0 }
    .focus\\:text-stroke-gray-900:focus { -webkit-text-stroke-color: #212121 }

    @media (min-width: 640px) {
      .sm\\:text-stroke-2 { -webkit-text-stroke-width: 2px }
    }
  `

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchCss(expectedCss))
})

test('utilities accept arbitrary values', () => {
  const testConfig = {
    ...commonConfig,
    safelist: [],
    content: [
      { raw: String.raw`<div class="text-fill-[lime] text-stroke-[black] text-stroke-[0.25rem] paint-[stroke_fill_markers]"></div>` },
      { raw: String.raw`<div class="text-fill-[lime] text-stroke-[color:black] text-stroke-[length:0.25rem] paint-[stroke_fill_markers]"></div>` },
    ],
  }
  const expectedCss = `
    .text-fill-\\[lime\\] { -webkit-text-fill-color: lime }
    .text-stroke-\\[black\\] { -webkit-text-stroke-color: black }
    .text-stroke-\\[color\\:black\\] { -webkit-text-stroke-color: black }
    .text-stroke-\\[0\\.25rem\\] { -webkit-text-stroke-width: 0.25rem }
    .text-stroke-\\[length\\:0\\.25rem\\] { -webkit-text-stroke-width: 0.25rem }
    .paint-\\[stroke_fill_markers\\] { paint-order: stroke fill markers }
  `

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchCss(expectedCss))
})

test('variants accept arbitrary values', () => {
  const testConfig = {
    ...commonConfig,
    safelist: [],
    content: [
      { raw: String.raw`<div class="[&>*]:text-fill-[lime]"></div>` },
    ],
  }
  const expectedCss = `
    .\\[\\&\\>\\*\\]\\:text-fill-\\[lime\\] > * { -webkit-text-fill-color: lime }
  `

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchCss(expectedCss))
})
