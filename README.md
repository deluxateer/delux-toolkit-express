## Todo: update document

* implement the pub/sub layer properly (make it work)

Inspiration from [this source](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=devto&utm_medium=post)

# Delux Toolkit Express Version (v1)

A multi-purpose dev toolkit by Deluxateer. It is designed to streamline development flow by automating common tasks (as listed in Features). Set up with the template engine Pug and preprocessor Sass/SCSS for efficient view & style authorship. Implements various customizable linters to enforce good code practice. Optimizes files for production.

## Features

1. __Views:__ Compiles Pug into compressed HTML files.
2. __Styles:__ Compiles SCSS files into one CSS file, then enhances it with PostCSS plugins (autoprefixing, polyfills, preset-env, minification).
3. __JavaScript:__ Concatenates all JS files while transpiling (Babel) and minifying the resulting file.
4. __Linting:__ Pug (pug-lint), SCSS (StyleLint) and JavaScript (ESLint).
4. __Sourcemaps:__ Included for SCSS and JS files during development mode.
5. __Assets:__ Minifies images for production.
6. __Live Server:__ Spin up Browsersync for cross-device service with hot-reloading.

## How To Use:

### Main Commands

#### `npm run build`

Builds the destination folder with static files __FOR DEVELOPMENT__. It runs tasks for `clean`, `views`, `styles`, `js`, and `minimgs`. `favicon` is included.

#### `npm run buildwatch` or `npm run bw`

Same as `npm run build`, but also runs the `watch` task at the end.

#### `npm run build:prod`

Same as `npm run build` but for production. This means certain options like sourcemaps are not enabled.

#### `npm run buildwatch:prod` or `npm run bwp`

Same as `npm run build:prod`, but also runs the `watch` task at the end.

#### `npm run watch`

Spins up Browsersync and watches for changes to any source files. On change, the appropriate files will be linted and recompiled, while the browser reloads for changes.

#### `npm run clean`

Deletes the destination directory and the reports directory.

### Misc. Commands

#### `npm run views`

Calls the tasks to lint all Pug code and then compiles all the Pug files at the base of the `views` directory into HTML files for the destination directory.

#### `npm run styles`

Calls the tasks to lint all SCSS code. Then it compiles `index.scss` file at the base of the `scss` directory into one CSS file for the destination directory (with sourcemaps enabled if not production). Before being outputted, it is enchanced with PostCSS plugins. Reports are generated by the linter.

#### `npm run lintjs`

Lints all of the JS files in the source directory and `gulpfile.babel.js` with ESLint. Reports are generated by the linter.

#### `npm run js`

Same as `npm run lintjs` but also bundles, transpiles, and minifies all source directory JS files with Webpack. Sourcemaps are included if not in production.

#### `npm run minimgs`

Minifies all images in the asset directory.

#### `npm run favicon`

Moves a copy of `favicon.ico` into the destination directory.

## Customization Suggestions:

1. Modify package.json; adjust the name, description, author, and other key/value pairs you desire.
2. Replace/remove favicon.ico
3. Adjust task configurations in `gulpfile.babel.js` file to your liking.
4. Inspect `.browserlistrc` for the browsers & versions you want to support. [Information on Queries](https://github.com/browserslist/browserslist#queries)
5. `assets` directory
    1. Replace/remove fonts directory
    2. Replace/remove img directory
6. `js` directory
    1. Turn off the modules you won't need for your project in `index.js`
    2. You can always add to the `js` directory as needed.
7. Strip off the partials in the `styles` directory that are irrelevant to your project and references to them, though keeping the components are recommended.
    1. Most configurations will be found in the `abstract` and `base` directories.
    2. Custom page style files will be in the `pages` directory, which has placeholder files that you should modify/delete now.
8. Delete/modify README

## Architecture

The file structure heavily based on Hugo Giraudel's [7-1 Architecture Pattern](https://sass-guidelin.es/#the-7-1-pattern). A more detailed explanation about the structure can be found there.

The views, styles, and functionality are decoupled as much as possible, where they are separated into global variables & functions, layout pieces, and reusable components. This makes it simple to add/remove code for your specific project or migrate them to another project. For instance, all of the baseline code for carousels can be found pertaining to its:
* __Views:__ `src/views/components/carousel.pug`
* __Styles:__ `src/scss/components/_carousel.scss`
* __Functionality:__ `src/js/components/carousel.js`

### Key Points

* For the `views` directory:
  * We have a somewhat different structure. All of the Pug files at the base of `views` will be the pages that will compile to the desired HTML files. They are all extensions of special pages called "base pages" found in the `base-pages` directory.
    * Base pages are generic templates with some components but various layout pieces. They have the basic skeletal structure that allows the developer to plug different parts into them for customization while keeping a desired structure. Examples would be default, full-page, horizontal-scroll, blog-post, etc.
    * This is quite useful because it is very DRY (Don't Repeat Yourself). It saves the user from having to redeclare the same code for all pages like global head tags and footer, letting the developer just write the code/data that is specific to that page. Simply append, prepend, or completely overwrite a layout/section to customize it. Also since all pages extend the base pages, maintainability will be simpler as making a change in the base pages will reflect on all of its child pages.
  * `data.pug` will hold all of the global data that you will use for your markup (HTML) pages. It is intended for this setup to loop through the data you need and output HTML, in order to keep your markup code DRY and decoupled from hard-coded data.
  * `variables.pug` contains all of the global variables to be used between pug files. It contains options for global `<head>` tag attributes, with the optional ones already commented out. Navbar items and social-media hrefs are good ideas to put here.
  * Pug files at the base of the `views` directory are your "main" files that will compile into equivalant html files. They should extend from some `base-page`. List your page-specific head attributes, CDN links, and local data here. It's up to what you want to put here.
* For the `js` directory, we will not have a `pages` directory because we don't want page-specific JavaScript to be shared with other pages. In this case, it is better to simply append an inline `script` tag to the respective Pug page file.

## Notes

Sass Architecture and Boilerplate based from Hugo Giraudel's [Style Guide](https://sass-guidelin.es/) and [Code](https://github.com/HugoGiraudel/sass-boilerplate).

## Goals

I would like to segregate these features between Webpack and Gulp, since the purpose of Webpack is to be a bundler and Gulp to be a task runner.

### To Be Implemented:
* Unit Testing

### Webpack:
* html template engine (pug)
* compile scss files
* postcss (autoprefix, polyfills, linting, use future css tech)
* concatenating js files
* transpile js files with babel
* include sourcemaps for scss and js files too
* minify all static files (html, css, js)
* minify all images

### Gulp:
* linting for js (eslint)
* unit testing
* spin up browsersync
* watch for changes for files

## Issues
* find ways to additional style-guide rules into scss-linter
* simplify the carousel component's architecture
  * too much of the carousel's inner-workings markup has to be exposed when calling the Pug mixin
* find a way to process inline script tags with the same treatment as the processJs task (ie transpile and minify).
