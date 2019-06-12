import path from 'path';
import {src, dest, series, parallel, watch} from 'gulp';
import webpack from 'webpack-stream';
const browserSync = require('browser-sync').create();
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';

const styles = () => {
  const postCssPlugins = [
    autoprefixer()
  ];
  return (
    // src('src/scss/index.scss')
    src(path.resolve(__dirname, "src", "scss", "index.scss"))
    .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
    .pipe(sass({
      // outputStyle: 'compressed'
    }).on('error', sass.logError))
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

exports.styles = styles;
exports.js = js;