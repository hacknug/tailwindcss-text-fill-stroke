# Tailwind CSS Text Indent Plugin

This plugin adds utilities to use text-fill and text-stroke with Tailwind CSS.

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

By default the plugin uses the `borderColors` and `borderWidths` properties from the config file to generate all of its classes. You can change that to whatever, just keep in mind if you have a `default` key in both objects, `.text-stroke` will set both the `-webkit-stroke-color` and `-webkit-stroke-width` of the element.

```js
require('tailwindcss-text-fill-stroke')({
  colors: {
    'red': 'red',
    'blue': 'blue',
    'green': 'green',
  },
  widths: {
    default: '1px',
    'sm': '4px',
    'md': '8px',
  },
  variants: [],
}),
```

```css
.text-fill-red { -webkit-text-fill-color: red; }
.text-stroke-red { -webkit-text-stroke-color: red; }
.text-fill-blue { -webkit-text-fill-color: blue; }
.text-stroke-blue { -webkit-text-stroke-color: blue; }
.text-fill-green { -webkit-text-fill-color: green; }
.text-stroke-green { -webkit-text-stroke-color: green; }
.text-stroke { -webkit-text-stroke-width: 1px; }
.text-stroke-sm { -webkit-text-stroke-width: 4px; }
.text-stroke-md { -webkit-text-stroke-width: 8px; }
```
