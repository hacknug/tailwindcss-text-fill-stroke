const tailwindConfig = require('./tailwind.config.js')
const { generatePluginCss } = require('@hacknug/tailwindcss-plugin-utils')

expect.extend({ toMatchCss: require('jest-matcher-css') })

const plugin = require('./index.js')
const pluginOptions = {}

const commonConfig = {
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
  plugins: [plugin(pluginOptions)],
}

test('generates default utilities', () => {
  const testConfig = { ...commonConfig }
  const expectedCss = `
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
    .text-fill { -webkit-text-fill-color: #e0e0e0 }

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
    .text-stroke { -webkit-text-stroke-color: #e0e0e0 }

    .text-stroke-0 { -webkit-text-stroke-width: 0 }
    .text-stroke-2 { -webkit-text-stroke-width: 2px }
    .text-stroke-4 { -webkit-text-stroke-width: 4px }
    .text-stroke-8 { -webkit-text-stroke-width: 8px }
    .text-stroke { -webkit-text-stroke-width: 1px }

    .paint-fsm { paint-order: fill stroke markers }
    .paint-fms { paint-order: fill markers stroke }
    .paint-sfm { paint-order: stroke fill markers }
    .paint-smf { paint-order: stroke markers fill }
    .paint-mfs { paint-order: markers fill stroke }
    .paint-msf { paint-order: markers stroke fill }
  `

  return generatePluginCss(tailwindConfig, testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('variants can be customized', () => {
  const testConfig = {
    ...commonConfig,
    variants: {
      textFillColor: ['hover'],
      textStrokeColor: ['focus'],
      textStrokeWidth: ['active'],
      paintOrder: ['responsive', 'hover'],
    },
  }
  const expectedCss = `
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
    .text-fill { -webkit-text-fill-color: #e0e0e0 }

    .hover\\:text-fill-transparent:hover { -webkit-text-fill-color: transparent }
    .hover\\:text-fill-black:hover { -webkit-text-fill-color: #000 }
    .hover\\:text-fill-white:hover { -webkit-text-fill-color: #fff }
    .hover\\:text-fill-gray-100:hover { -webkit-text-fill-color: #f5f5f5 }
    .hover\\:text-fill-gray-200:hover { -webkit-text-fill-color: #eeeeee }
    .hover\\:text-fill-gray-300:hover { -webkit-text-fill-color: #e0e0e0 }
    .hover\\:text-fill-gray-400:hover { -webkit-text-fill-color: #bdbdbd }
    .hover\\:text-fill-gray-500:hover { -webkit-text-fill-color: #9e9e9e }
    .hover\\:text-fill-gray-600:hover { -webkit-text-fill-color: #757575 }
    .hover\\:text-fill-gray-700:hover { -webkit-text-fill-color: #616161 }
    .hover\\:text-fill-gray-800:hover { -webkit-text-fill-color: #424242 }
    .hover\\:text-fill-gray-900:hover { -webkit-text-fill-color: #212121 }
    .hover\\:text-fill:hover { -webkit-text-fill-color: #e0e0e0 }

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
    .text-stroke { -webkit-text-stroke-color: #e0e0e0 }

    .focus\\:text-stroke-transparent:focus { -webkit-text-stroke-color: transparent }
    .focus\\:text-stroke-black:focus { -webkit-text-stroke-color: #000 }
    .focus\\:text-stroke-white:focus { -webkit-text-stroke-color: #fff }
    .focus\\:text-stroke-gray-100:focus { -webkit-text-stroke-color: #f5f5f5 }
    .focus\\:text-stroke-gray-200:focus { -webkit-text-stroke-color: #eeeeee }
    .focus\\:text-stroke-gray-300:focus { -webkit-text-stroke-color: #e0e0e0 }
    .focus\\:text-stroke-gray-400:focus { -webkit-text-stroke-color: #bdbdbd }
    .focus\\:text-stroke-gray-500:focus { -webkit-text-stroke-color: #9e9e9e }
    .focus\\:text-stroke-gray-600:focus { -webkit-text-stroke-color: #757575 }
    .focus\\:text-stroke-gray-700:focus { -webkit-text-stroke-color: #616161 }
    .focus\\:text-stroke-gray-800:focus { -webkit-text-stroke-color: #424242 }
    .focus\\:text-stroke-gray-900:focus { -webkit-text-stroke-color: #212121 }
    .focus\\:text-stroke:focus { -webkit-text-stroke-color: #e0e0e0 }

    .text-stroke-0 { -webkit-text-stroke-width: 0 }
    .text-stroke-2 { -webkit-text-stroke-width: 2px }
    .text-stroke-4 { -webkit-text-stroke-width: 4px }
    .text-stroke-8 { -webkit-text-stroke-width: 8px }
    .text-stroke { -webkit-text-stroke-width: 1px }

    .active\\:text-stroke-0:active { -webkit-text-stroke-width: 0 }
    .active\\:text-stroke-2:active { -webkit-text-stroke-width: 2px }
    .active\\:text-stroke-4:active { -webkit-text-stroke-width: 4px }
    .active\\:text-stroke-8:active { -webkit-text-stroke-width: 8px }
    .active\\:text-stroke:active { -webkit-text-stroke-width: 1px }

    .paint-fsm { paint-order: fill stroke markers }
    .paint-fms { paint-order: fill markers stroke }
    .paint-sfm { paint-order: stroke fill markers }
    .paint-smf { paint-order: stroke markers fill }
    .paint-mfs { paint-order: markers fill stroke }
    .paint-msf { paint-order: markers stroke fill }

    .hover\\:paint-fsm:hover { paint-order: fill stroke markers }
    .hover\\:paint-fms:hover { paint-order: fill markers stroke }
    .hover\\:paint-sfm:hover { paint-order: stroke fill markers }
    .hover\\:paint-smf:hover { paint-order: stroke markers fill }
    .hover\\:paint-mfs:hover { paint-order: markers fill stroke }
    .hover\\:paint-msf:hover { paint-order: markers stroke fill }

    @media (min-width: 640px) {
      .sm\\:paint-fsm { paint-order: fill stroke markers }
      .sm\\:paint-fms { paint-order: fill markers stroke }
      .sm\\:paint-sfm { paint-order: stroke fill markers }
      .sm\\:paint-smf { paint-order: stroke markers fill }
      .sm\\:paint-mfs { paint-order: markers fill stroke }
      .sm\\:paint-msf { paint-order: markers stroke fill }

      .sm\\:hover\\:paint-fsm:hover { paint-order: fill stroke markers }
      .sm\\:hover\\:paint-fms:hover { paint-order: fill markers stroke }
      .sm\\:hover\\:paint-sfm:hover { paint-order: stroke fill markers }
      .sm\\:hover\\:paint-smf:hover { paint-order: stroke markers fill }
      .sm\\:hover\\:paint-mfs:hover { paint-order: markers fill stroke }
      .sm\\:hover\\:paint-msf:hover { paint-order: markers stroke fill }
    }
  `

  return generatePluginCss(tailwindConfig, testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('utilities can be customized', () => {
  const testConfig = {
    ...commonConfig,
    theme: {
      textFillColor: theme => ({
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: '#9e9e9e',
        default: '#38b2ac',
      }),
      textStrokeColor: theme => ({
        transparent: theme('colors.transparent'),
        default: '#38b2ac'
      }),
      textStrokeWidth: { default: '1px', sm: '2px', md: '4px', lg: '8px' },
      paintOrder: { stroke: 'stroke' }
    },
  }
  const expectedCss = `
    .text-fill-transparent { -webkit-text-fill-color: transparent }
    .text-fill-black { -webkit-text-fill-color: #000 }
    .text-fill-white { -webkit-text-fill-color: #fff }
    .text-fill-gray { -webkit-text-fill-color: #9e9e9e }
    .text-fill { -webkit-text-fill-color: #38b2ac }

    .text-stroke-transparent { -webkit-text-stroke-color: transparent }
    .text-stroke { -webkit-text-stroke-color: #38b2ac }

    .text-stroke { -webkit-text-stroke-width: 1px }
    .text-stroke-sm { -webkit-text-stroke-width: 2px }
    .text-stroke-md { -webkit-text-stroke-width: 4px }
    .text-stroke-lg { -webkit-text-stroke-width: 8px }

    ${ /* FIXME: Merging of configs not working */'' }
    .paint-fsm { paint-order: fill stroke markers }
    .paint-fms { paint-order: fill markers stroke }
    .paint-sfm { paint-order: stroke fill markers }
    .paint-smf { paint-order: stroke markers fill }
    .paint-mfs { paint-order: markers fill stroke }
    .paint-msf { paint-order: markers stroke fill }

    .paint-stroke { paint-order: stroke }
  `

  return generatePluginCss(tailwindConfig, testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
