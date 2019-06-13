import path from 'path';
import {src, dest, series, parallel, watch} from 'gulp';
import webpack from 'webpack-stream';
const browserSync = require('browser-sync').create();
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import gulpStylelint from 'gulp-stylelint';

const lintScss = () => (
  src(path.resolve(__dirname, "src", "scss", "**", "*"))
    .pipe(gulpStylelint({
      failAfterError: true,
      reportOutputDir: 'reports/',
      reporters: [
        {formatter: 'verbose', console: true, save: 'report.txt'},
        // {formatter: 'json', save: 'report.json'}
      ],
      debug: true,
      // fix: true
    }))
);

const processScss = () => {
  const postCssPlugins = [
    postcssPresetEnv({
      autoprefixer: { grid: true }
    }),
    cssnano()
  ];
  return (
    src(path.resolve(__dirname, "src", "scss", "index.scss"))
    .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(rename("styles.min.css"))
    .pipe(sourcemaps.write())
    .pipe(dest(path.resolve(__dirname, "dist", "css")))
  );
};

const js = () => (
  src('src/js/index.js')
    .pipe(webpack({
      context: path.resolve(__dirname, './src'),
      entry: {
        app: './js/index.js'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      mode: 'development',
      module: {
        rules: [{
          test: /\.js$/,
          exclude: '/node_modules',
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }]
      }
    }))
    .pipe(dest('dist/'))
);


exports.styles = series(lintScss, processScss);
exports.js = js;