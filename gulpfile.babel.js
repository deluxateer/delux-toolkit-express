import path from 'path';
import fs from 'fs';
// eslint-disable-next-line
import { src, dest, series, parallel, watch } from 'gulp';
import through2 from 'through2'; // used for noop
import slash from 'slash';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import pug from 'gulp-pug';
import gulpStylelint from 'gulp-stylelint';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';

const browserSync = require('browser-sync').create();

// used to build platform/os consistant globs
const buildGlob = (...args) => slash(path.resolve(...args));

// CONFIGURATION
const production = process.env.NODE_ENV === 'production';
const source = buildGlob(__dirname, 'src');
const destination = buildGlob(__dirname, 'dist');
// DESTINATION PATHS
const destCss = buildGlob(destination, 'css');
const destJs = buildGlob(destination, 'js');
const destImg = buildGlob(destination, 'img');
// SOURCE PATHS
const pugPath = buildGlob(source, 'views', '*.pug');
const pugPathAll = buildGlob(source, 'views', '**', '*.pug');
const scssPath = buildGlob(source, 'scss', 'index.scss');
const scssPathAll = buildGlob(source, 'scss', '**', '*.scss');
const jsPath = buildGlob(source, 'js', 'index.js');
const jsPathAll = buildGlob(source, 'js', '**', '*.js');
const assetPath = buildGlob(source, 'assets');
const imgPath = buildGlob(assetPath, 'img', '*');
const faviconPath = buildGlob(__dirname, 'favicon.ico');
const gulpPath = buildGlob(__dirname, 'gulpfile.babel.js');
const watchPath = [
  buildGlob(destCss, '*.css'),
  buildGlob(destJs, '*.js'),
  buildGlob(destination, '*.html'),
  buildGlob(destImg, '*'),
];

// console.log('pugAll: ', buildGlob(pugPathAll));
// console.log('gulpfilepath: ', buildGlob(gulpPath));

// TASKS
const lintViews = () => (
  src(pugPathAll)
    .pipe(pugLinter({
      failAfterError: production,
      reporter: pugLintStylish,
    }))
);

const processViews = () => (
  src(pugPath)
    .pipe(pug({
      doctype: 'html',
    }))
    .pipe(dest(destination))
);


const lintScss = () => (
  src(scssPathAll)
    .pipe(gulpStylelint({
      failAfterError: true,
      reportOutputDir: buildGlob(__dirname, 'reports'),
      reporters: [
        {
          formatter: 'string',
          console: !production,
          save: 'report-styles.txt',
        },
        // {formatter: 'json', save: 'report.json'},
      ],
      debug: true,
      // fix: true,
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
    src(scssPath)
      .pipe(!production ? sourcemaps.init({ loadMaps: true, largeFile: true }) : through2.obj())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postCssPlugins))
      .pipe(rename('styles.min.css'))
      .pipe(!production ? sourcemaps.write() : through2.obj())
      .pipe(dest(destCss))
  );
};

const lintJs = () => {
  // create report directory if it doesn't already exist
  const reportsPath = buildGlob(__dirname, 'reports');
  if (!fs.existsSync(reportsPath)) {
    fs.mkdirSync(reportsPath);
  }
  return src([gulpPath, jsPathAll])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('visualstudio', fs.createWriteStream(buildGlob(reportsPath, 'report-js.txt'))))
    .pipe(eslint.failAfterError());
};

const processJs = () => (
  src(jsPath)
    .pipe(webpack({
      context: path.normalize(source),
      entry: {
        app: path.normalize(jsPath),
      },
      output: { filename: 'bundle.js' },
      mode: production ? 'production' : 'development',
      devtool: !production ? 'source-map' : false,
      module: {
        rules: [{
          test: /\.js$/,
          exclude: '/node_modules',
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env'],
          },
        }],
      },
    }))
    .pipe(dest(destJs))
);

const minimizeImgs = () => (
  src(imgPath)
    .pipe(imagemin())
    .pipe(dest(destImg))
);

const favicon = () => src(faviconPath).pipe(dest(destination));

const views = series(lintViews, processViews);
const styles = series(lintScss, processScss);
const js = series(lintJs, processJs);

const watchTask = () => {
  browserSync.init({
    server: 'dist',
    open: 'external',
    port: 9000,
  });
  watch(pugPathAll, views);
  watch(scssPathAll, styles);
  watch(gulpPath, lintJs);
  watch(jsPathAll, js);
  watch(imgPath, minimizeImgs);
  watch(watchPath).on('change', browserSync.reload);
};

const build = (
  series(
    parallel(
      views,
      styles,
      js,
      minimizeImgs,
      favicon,
    ),
    watchTask,
  )
);

exports.views = views;
exports.styles = styles;
exports.lintjs = lintJs;
exports.js = js;
exports.minimgs = minimizeImgs;
exports.favicon = favicon;
exports.watch = watchTask;

exports.default = build;
