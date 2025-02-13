import postcss from 'postcss'
import tailwind from 'tailwindcss'
import { expect, test } from 'vitest'

import plugin from './index.js'

const pluginOptions = {}

const commonConfig = {
  theme: {
    screens: { sm: '640px' },
    opacity: {},
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

  return postcss(tailwind(testConfig)).process('@tailwind utilities', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
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
    safelist: [],
    content: [
      { raw: String.raw`<div class="text-fill text-fill-transparent text-fill-black text-fill-white text-fill-gray"></div>` },
      { raw: String.raw`<div class="text-stroke text-stroke-transparent"></div>` },
      { raw: String.raw`<div class="text-stroke text-stroke-sm text-stroke-md text-stroke-lg"></div>` },
      { raw: String.raw`<div class="paint-stroke"></div>` },
    ],
  }

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
})

test('variants can be customized', () => {
  const testConfig = {
    ...commonConfig,
    safelist: [],
    content: [
      { raw: String.raw`<div class="text-fill-white text-stroke sm:text-stroke-2 text-stroke-black hover:text-fill-gray-300 focus:text-stroke-gray-900"></div>` },
    ],
  }

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
})

test('utilities can use decimal values', () => {
  const testConfig = {
    ...commonConfig,
    theme: {
      textStrokeWidth: { '0.5': '0.5px' },
    },
    safelist: [],
    content: [
      { raw: String.raw`<div class="text-stroke-0.5"></div>` },
    ],
  }

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
})

test('utilities can use negative values', () => {
  const testConfig = {
    ...commonConfig,
    theme: {
      textStrokeWidth: { '-4': '-4px' },
    },
    safelist: [],
    content: [
      { raw: String.raw`<div class="-text-stroke-4"></div>` },
    ],
  }

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
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

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
})

test('variants accept arbitrary values', () => {
  const testConfig = {
    ...commonConfig,
    safelist: [],
    content: [
      { raw: String.raw`<div class="[&>*]:text-fill-[lime]"></div>` },
    ],
  }

  return postcss(tailwind(testConfig)).process('@tailwind utilities;', { from: undefined })
    .then((result) => expect(result.css).toMatchSnapshot())
})
