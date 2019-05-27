# Tailwind CSS Text Indent Plugin

This plugin adds utilities to use `text-fill`, `text-stroke` and `paint-order` with Tailwind CSS.

## Installation

Add this plugin to your project:

```bash
# Install using pnpm
pnpm install --save-dev tailwindcss-text-fill-stroke

# Install using npm
npm install --save-dev tailwindcss-text-fill-stroke

# Install using yarn
yarn add -D tailwindcss-text-fill-stroke
```

## Usage

By default the plugin uses the `borderColor` and `borderWidth` properties from your theme to generate all of its classes. You can change that to whatever, just keep in mind if you have a `default` key in both objects, `.text-stroke` will set both the `-webkit-stroke-color` and `-webkit-stroke-width` of the element.

```js
// tailwind.config.js
{
  theme: { // defaults to these values
    textFillColor: theme => theme('borderColor'),
    textStrokeColor: theme => theme('borderColor'),
    textStrokeWidth: theme => theme('borderWidth'),
    paintOrder: {
      'fsm': { paintOrder: 'fill, stroke, markers' },
      'fms': { paintOrder: 'fill, markers, stroke' },
      'sfm': { paintOrder: 'stroke, fill, markers' },
      'smf': { paintOrder: 'stroke, markers, fill' },
      'mfs': { paintOrder: 'markers, fill, stroke' },
      'msf': { paintOrder: 'markers, stroke, fill' },
    },
  },

  variants: { // all the following default to ['responsive']
    textFillColor: ['responsive'],
    textStrokeColor: ['responsive'],
    textStrokeWidth: ['responsive'],
    paintOrder: ['responsive'],
  },

  plugins: [
    require('tailwindcss-blend-mode'), // no options to configure
  ],
}
```

```css
.text-fill-transparent { text-fill-color: transparent }
.text-fill-black { text-fill-color: #000 }
.text-fill-white { text-fill-color: #fff }
.text-fill { text-fill-color: #e0e0e0 }

.text-stroke-transparent { text-stroke-color: transparent }
.text-stroke-black { text-stroke-color: #000 }
.text-stroke-white { text-stroke-color: #fff }
.text-stroke { text-stroke-color: #e0e0e0 }

.text-stroke-0 { text-stroke-width: 0 }
.text-stroke-2 { text-stroke-width: 2px }
.text-stroke-4 { text-stroke-width: 4px }
.text-stroke-8 { text-stroke-width: 8px }
.text-stroke { text-stroke-width: 1px }

.paint-fsm { paint-order: fill, stroke, markers }
.paint-fms { paint-order: fill, markers, stroke }
.paint-sfm { paint-order: stroke, fill, markers }
.paint-smf { paint-order: stroke, markers, fill }
.paint-mfs { paint-order: markers, fill, stroke }
.paint-msf { paint-order: markers, stroke, fill }

@media (min-width: 640px) {
  .sm\:text-fill-transparent { text-fill-color: transparent }
  .sm\:text-fill-black { text-fill-color: #000 }
  .sm\:text-fill-white { text-fill-color: #fff }
  .sm\:text-fill { text-fill-color: #e0e0e0 }

  .sm\:text-stroke-transparent { text-stroke-color: transparent }
  .sm\:text-stroke-black { text-stroke-color: #000 }
  .sm\:text-stroke-white { text-stroke-color: #fff }
  .sm\:text-stroke { text-stroke-color: #e0e0e0 }

  .sm\:text-stroke-0 { text-stroke-width: 0 }
  .sm\:text-stroke-2 { text-stroke-width: 2px }
  .sm\:text-stroke-4 { text-stroke-width: 4px }
  .sm\:text-stroke-8 { text-stroke-width: 8px }
  .sm\:text-stroke { text-stroke-width: 1px }

  .sm\:paint-fsm { paint-order: fill, stroke, markers }
  .sm\:paint-fms { paint-order: fill, markers, stroke }
  .sm\:paint-sfm { paint-order: stroke, fill, markers }
  .sm\:paint-smf { paint-order: stroke, markers, fill }
  .sm\:paint-mfs { paint-order: markers, fill, stroke }
  .sm\:paint-msf { paint-order: markers, stroke, fill }
}
```
