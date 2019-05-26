const _ = require('lodash')

const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

// const defaultConfig = require('tailwindcss/defaultConfig')
const generatePluginCss = (testConfig = {}, pluginOptions = {}) => {
  const sandboxConfig = {
    theme: {
      screens: { 'sm': '640px' },
      colors: {
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
    corePlugins: false,
    plugins: [ plugin(pluginOptions) ],
  }
  const postcssPlugins =[
    tailwindcss(_.merge(sandboxConfig, testConfig)),
  ]

  return postcss(postcssPlugins)
    .process('@tailwind utilities', { from: undefined })
    .then(result => result.css)
}

expect.extend({ toMatchCss: require('jest-matcher-css') })

test('generates default utilities and responsive variants', () => {
  const testConfig = {}
  const expectedCss = `
    .text-fill-transparent { text-fill-color: transparent }
    .text-fill-black { text-fill-color: #000 }
    .text-fill-white { text-fill-color: #fff }
    .text-fill-gray-100 { text-fill-color: #f5f5f5 }
    .text-fill-gray-200 { text-fill-color: #eeeeee }
    .text-fill-gray-300 { text-fill-color: #e0e0e0 }
    .text-fill-gray-400 { text-fill-color: #bdbdbd }
    .text-fill-gray-500 { text-fill-color: #9e9e9e }
    .text-fill-gray-600 { text-fill-color: #757575 }
    .text-fill-gray-700 { text-fill-color: #616161 }
    .text-fill-gray-800 { text-fill-color: #424242 }
    .text-fill-gray-900 { text-fill-color: #212121 }
    .text-fill { text-fill-color: #e0e0e0 }

    .text-stroke-transparent { text-stroke-color: transparent }
    .text-stroke-black { text-stroke-color: #000 }
    .text-stroke-white { text-stroke-color: #fff }
    .text-stroke-gray-100 { text-stroke-color: #f5f5f5 }
    .text-stroke-gray-200 { text-stroke-color: #eeeeee }
    .text-stroke-gray-300 { text-stroke-color: #e0e0e0 }
    .text-stroke-gray-400 { text-stroke-color: #bdbdbd }
    .text-stroke-gray-500 { text-stroke-color: #9e9e9e }
    .text-stroke-gray-600 { text-stroke-color: #757575 }
    .text-stroke-gray-700 { text-stroke-color: #616161 }
    .text-stroke-gray-800 { text-stroke-color: #424242 }
    .text-stroke-gray-900 { text-stroke-color: #212121 }
    .text-stroke { text-stroke-color: #e0e0e0 }

    .text-stroke-0 { text-stroke-width: 0 }
    .text-stroke-2 { text-stroke-width: 2px }
    .text-stroke-4 { text-stroke-width: 4px }
    .text-stroke-8 { text-stroke-width: 8px }
    .text-stroke { text-stroke-width: 1px }

    @media (min-width: 640px) {
      .sm\\:text-fill-transparent { text-fill-color: transparent }
      .sm\\:text-fill-black { text-fill-color: #000 }
      .sm\\:text-fill-white { text-fill-color: #fff }
      .sm\\:text-fill-gray-100 { text-fill-color: #f5f5f5 }
      .sm\\:text-fill-gray-200 { text-fill-color: #eeeeee }
      .sm\\:text-fill-gray-300 { text-fill-color: #e0e0e0 }
      .sm\\:text-fill-gray-400 { text-fill-color: #bdbdbd }
      .sm\\:text-fill-gray-500 { text-fill-color: #9e9e9e }
      .sm\\:text-fill-gray-600 { text-fill-color: #757575 }
      .sm\\:text-fill-gray-700 { text-fill-color: #616161 }
      .sm\\:text-fill-gray-800 { text-fill-color: #424242 }
      .sm\\:text-fill-gray-900 { text-fill-color: #212121 }
      .sm\\:text-fill { text-fill-color: #e0e0e0 }

      .sm\\:text-stroke-transparent { text-stroke-color: transparent }
      .sm\\:text-stroke-black { text-stroke-color: #000 }
      .sm\\:text-stroke-white { text-stroke-color: #fff }
      .sm\\:text-stroke-gray-100 { text-stroke-color: #f5f5f5 }
      .sm\\:text-stroke-gray-200 { text-stroke-color: #eeeeee }
      .sm\\:text-stroke-gray-300 { text-stroke-color: #e0e0e0 }
      .sm\\:text-stroke-gray-400 { text-stroke-color: #bdbdbd }
      .sm\\:text-stroke-gray-500 { text-stroke-color: #9e9e9e }
      .sm\\:text-stroke-gray-600 { text-stroke-color: #757575 }
      .sm\\:text-stroke-gray-700 { text-stroke-color: #616161 }
      .sm\\:text-stroke-gray-800 { text-stroke-color: #424242 }
      .sm\\:text-stroke-gray-900 { text-stroke-color: #212121 }
      .sm\\:text-stroke { text-stroke-color: #e0e0e0 }

      .sm\\:text-stroke-0 { text-stroke-width: 0 }
      .sm\\:text-stroke-2 { text-stroke-width: 2px }
      .sm\\:text-stroke-4 { text-stroke-width: 4px }
      .sm\\:text-stroke-8 { text-stroke-width: 8px }
      .sm\\:text-stroke { text-stroke-width: 1px }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('variants can be customized', () => {
  const testConfig = {
    variants: {
      textFillColor: ['hover'],
      textStrokeColor: ['focus'],
      textStrokeWidth: ['active'],
    },
  }
  const expectedCss = `
    .text-fill-transparent { text-fill-color: transparent }
    .text-fill-black { text-fill-color: #000 }
    .text-fill-white { text-fill-color: #fff }
    .text-fill-gray-100 { text-fill-color: #f5f5f5 }
    .text-fill-gray-200 { text-fill-color: #eeeeee }
    .text-fill-gray-300 { text-fill-color: #e0e0e0 }
    .text-fill-gray-400 { text-fill-color: #bdbdbd }
    .text-fill-gray-500 { text-fill-color: #9e9e9e }
    .text-fill-gray-600 { text-fill-color: #757575 }
    .text-fill-gray-700 { text-fill-color: #616161 }
    .text-fill-gray-800 { text-fill-color: #424242 }
    .text-fill-gray-900 { text-fill-color: #212121 }
    .text-fill { text-fill-color: #e0e0e0 }

    .hover\\:text-fill-transparent:hover { text-fill-color: transparent }
    .hover\\:text-fill-black:hover { text-fill-color: #000 }
    .hover\\:text-fill-white:hover { text-fill-color: #fff }
    .hover\\:text-fill-gray-100:hover { text-fill-color: #f5f5f5 }
    .hover\\:text-fill-gray-200:hover { text-fill-color: #eeeeee }
    .hover\\:text-fill-gray-300:hover { text-fill-color: #e0e0e0 }
    .hover\\:text-fill-gray-400:hover { text-fill-color: #bdbdbd }
    .hover\\:text-fill-gray-500:hover { text-fill-color: #9e9e9e }
    .hover\\:text-fill-gray-600:hover { text-fill-color: #757575 }
    .hover\\:text-fill-gray-700:hover { text-fill-color: #616161 }
    .hover\\:text-fill-gray-800:hover { text-fill-color: #424242 }
    .hover\\:text-fill-gray-900:hover { text-fill-color: #212121 }
    .hover\\:text-fill:hover { text-fill-color: #e0e0e0 }

    .text-stroke-transparent { text-stroke-color: transparent }
    .text-stroke-black { text-stroke-color: #000 }
    .text-stroke-white { text-stroke-color: #fff }
    .text-stroke-gray-100 { text-stroke-color: #f5f5f5 }
    .text-stroke-gray-200 { text-stroke-color: #eeeeee }
    .text-stroke-gray-300 { text-stroke-color: #e0e0e0 }
    .text-stroke-gray-400 { text-stroke-color: #bdbdbd }
    .text-stroke-gray-500 { text-stroke-color: #9e9e9e }
    .text-stroke-gray-600 { text-stroke-color: #757575 }
    .text-stroke-gray-700 { text-stroke-color: #616161 }
    .text-stroke-gray-800 { text-stroke-color: #424242 }
    .text-stroke-gray-900 { text-stroke-color: #212121 }
    .text-stroke { text-stroke-color: #e0e0e0 }

    .focus\\:text-stroke-transparent:focus { text-stroke-color: transparent }
    .focus\\:text-stroke-black:focus { text-stroke-color: #000 }
    .focus\\:text-stroke-white:focus { text-stroke-color: #fff }
    .focus\\:text-stroke-gray-100:focus { text-stroke-color: #f5f5f5 }
    .focus\\:text-stroke-gray-200:focus { text-stroke-color: #eeeeee }
    .focus\\:text-stroke-gray-300:focus { text-stroke-color: #e0e0e0 }
    .focus\\:text-stroke-gray-400:focus { text-stroke-color: #bdbdbd }
    .focus\\:text-stroke-gray-500:focus { text-stroke-color: #9e9e9e }
    .focus\\:text-stroke-gray-600:focus { text-stroke-color: #757575 }
    .focus\\:text-stroke-gray-700:focus { text-stroke-color: #616161 }
    .focus\\:text-stroke-gray-800:focus { text-stroke-color: #424242 }
    .focus\\:text-stroke-gray-900:focus { text-stroke-color: #212121 }
    .focus\\:text-stroke:focus { text-stroke-color: #e0e0e0 }

    .text-stroke-0 { text-stroke-width: 0 }
    .text-stroke-2 { text-stroke-width: 2px }
    .text-stroke-4 { text-stroke-width: 4px }
    .text-stroke-8 { text-stroke-width: 8px }
    .text-stroke { text-stroke-width: 1px }

    .active\\:text-stroke-0:active { text-stroke-width: 0 }
    .active\\:text-stroke-2:active { text-stroke-width: 2px }
    .active\\:text-stroke-4:active { text-stroke-width: 4px }
    .active\\:text-stroke-8:active { text-stroke-width: 8px }
    .active\\:text-stroke:active { text-stroke-width: 1px }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('utilities can be customized', () => {
  const testConfig = {
    theme: {
      textFillColor: theme => ({ ...theme('colors'), gray: theme('colors.gray.500'), default: '#38b2ac' }),
      textStrokeColor: theme => ({ transparent: theme('colors.transparent'), default: '#38b2ac' }),
      textStrokeWidth: { default: '1px', sm: '2px', md: '4px', lg: '8px' },
    },
  }
  const expectedCss = `
    .text-fill-transparent { text-fill-color: transparent }
    .text-fill-black { text-fill-color: #000 }
    .text-fill-white { text-fill-color: #fff }
    .text-fill-gray { text-fill-color: #9e9e9e }
    .text-fill { text-fill-color: #38b2ac }

    .text-stroke-transparent { text-stroke-color: transparent }
    .text-stroke { text-stroke-color: #38b2ac }

    .text-stroke { text-stroke-width: 1px }
    .text-stroke-sm { text-stroke-width: 2px }
    .text-stroke-md { text-stroke-width: 4px }
    .text-stroke-lg { text-stroke-width: 8px }

    @media (min-width: 640px) {
      .sm\\:text-fill-transparent { text-fill-color: transparent }
      .sm\\:text-fill-black { text-fill-color: #000 }
      .sm\\:text-fill-white { text-fill-color: #fff }
      .sm\\:text-fill-gray { text-fill-color: #9e9e9e }
      .sm\\:text-fill { text-fill-color: #38b2ac }

      .sm\\:text-stroke-transparent { text-stroke-color: transparent }
      .sm\\:text-stroke { text-stroke-color: #38b2ac }

      .sm\\:text-stroke { text-stroke-width: 1px }
      .sm\\:text-stroke-sm { text-stroke-width: 2px }
      .sm\\:text-stroke-md { text-stroke-width: 4px }
      .sm\\:text-stroke-lg { text-stroke-width: 8px }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
