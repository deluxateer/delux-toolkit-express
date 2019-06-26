# Delux Toolkit

A generic dev toolkit by Deluxateer. It automates several tasks, transpiles, bundles, launches a live server, etc.

## Goals

### Webpack:
* compile scss files
* include sourcemaps for scss (maybe js files too)
* postcss (autoprefix, polyfills, linting, use future css tech)
* concatenating js files
* transpile js files with babel
* minify all static files (html, css, js)
* minify all images
* html template engine (pug)


### Gulp:
* linting for js (eslint)
* unit testing
  * low priority, probably won't be implemented for a while.
* spin up browsersync
* watch for changes for files

## Considerations:
* adding a css-loader
  * https://webpack.js.org/guides/asset-management#loading-css
  * sass-loaders are available too...

## Notes
* Sass Architecture and Boilerplate based from Hugo Giraudel's [Style Guide](https://sass-guidelin.es/) and [Code](https://github.com/HugoGiraudel/sass-boilerplate).
* 

## Issues
* find ways to additional style-guide rules into your scss-linter
* gulp-eslint will not:
  * target all js files in all subdirectories except node_modules and dist/
  * the gulp src path needs to be refined
* the path of the watch task for watching eslinting for all js files needs to be refined
* there isn't a way to cleanly write the output of pug-lint to a file