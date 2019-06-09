# Delux Toolkit

A generic dev toolkit by Deluxateer. It automates several tasks, transpiles, bundles, launches a live server, etc.

## Goals
* compile scss files
* transpile js files with babel
* concatenating js files
* include sourcemaps for scss (maybe js files too)
* spin up browsersync
* minify all static files (html, css, js)
* minify all images
* watch for changes for files
* unit testing
* autoprefix css rules
* linting for js (eslint)
* postcss (polyfills, linting, * use future css tech)
* eventually: html template (pug or handlebars)

### Webpack:
* compile scss files
* transpile js files with babel
* concatenating js files
* eventually: html template (pug or handlebars)

### Gulp:
* unit testing
* spin up browsersync
* linting for js (eslint)
* watch for changes for files

## Considerations:
* adding a css-loader
  * https://webpack.js.org/guides/asset-management#loading-css
  * sass-loaders are available too...