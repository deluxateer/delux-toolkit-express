import path from 'path';
// eslint-disable-next-line
import { src, dest, series, parallel, watch } from 'gulp';
import webpack from 'webpack-stream';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import gulpStylelint from 'gulp-stylelint';
import eslint from 'gulp-eslint';

const browserSync = require('browser-sync').create();
// const exec = require('child_process').exec;

const lintScss = () => (
  src(path.resolve(__dirname, 'src', 'scss', '**', '*'))
    .pipe(gulpStylelint({
      failAfterError: true,
      reportOutputDir: 'reports/',
      reporters: [
        { formatter: 'verbose', console: true, save: 'report.txt' },
        // {formatter: 'json', save: 'report.json'}
      ],
      debug: true,
      // fix: true
    }))
);

const processScss = () => {
  const postCssPlugins = [
    postcssPresetEnv({
      autoprefixer: { grid: true },
    }),
    cssnano(),
  ];
  return (
    src(path.resolve(__dirname, 'src', 'scss', 'index.scss'))
      .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postCssPlugins))
      .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write())
      .pipe(dest(path.resolve(__dirname, 'dist', 'css')))
  );
};

const lintJs = () => (
  // exec('npm run lintjs', function(err, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  //   cb(err);
  // })
  // src([path.resolve(__dirname, '*.js')])
  src(['*.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
); // try running an npm run script command here

const js = () => (
  src('src/js/index.js')
    .pipe(webpack({
      context: path.resolve(__dirname, './src'),
      entry: {
        app: './js/index.js',
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
            presets: ['@babel/preset-env'],
          },
        // }, {
        //   enforce: 'pre',
        //   test: /\.js$/,
        //   exclude: '/node_modules',
        //   loader: "eslint-loader",
        }],
      },
    }))
    .pipe(dest('dist/'))
);


exports.styles = series(lintScss, processScss);
exports.lintjs = lintJs;
exports.js = js;
