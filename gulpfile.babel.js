import path from 'path';
import fs from 'fs';
// eslint-disable-next-line
import { src, dest, series, parallel, watch } from 'gulp';
import slash from 'slash';
import del from 'del';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import gulpStylelint from 'gulp-stylelint';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import { port } from './src/config';

const browserSync = require('browser-sync').create();

// used to build platform/os-consistant globs
const buildGlob = (...args) => slash(path.resolve(...args));

// ***************** CONFIGURATION ***************** //
const enableLinting = true;
const enableReportToFile = false;

const production = process.env.NODE_ENV === 'production';
const source = buildGlob(__dirname, 'src', 'client');
const destination = buildGlob(__dirname, 'public');
const reportsPath = buildGlob(__dirname, 'reports');

// DESTINATION PATHS
const destCss = buildGlob(destination, 'css');
const destJs = buildGlob(destination, 'js');
const destImg = buildGlob(destination, 'img');
// SOURCE PATHS
const pugSourcePathAll = buildGlob(source, 'views', '**', '*.pug');
const stylesSourcePath = buildGlob(source, 'styles', 'index.scss');
const stylesSourcePathAll = buildGlob(source, 'styles', '**', '*.scss');
const jsSourcePath = buildGlob(source, 'js', 'index.js');
const jsSourcePathAll = buildGlob(source, 'js', '**', '*.js');
const assetPath = buildGlob(source, 'assets');
const imgPath = buildGlob(assetPath, 'img', '**', '*');
const faviconPath = buildGlob(source, 'favicon.ico');
const gulpPath = buildGlob(__dirname, 'gulpfile.babel.js');
const staticFilesPaths = [
  buildGlob(destCss, '*.css'),
  buildGlob(destJs, '*.js'),
  buildGlob(destination, '*.html'),
  buildGlob(destImg, '*'),
];
// ***************** END CONFIGURATION ***************** //

// TASKS
const lintViews = () => (
  src(pugSourcePathAll)
    .pipe(pugLinter({
      failAfterError: production,
      reporter: pugLintStylish,
    }))
);

const lintStyles = () => (
  src(stylesSourcePathAll)
    .pipe(gulpStylelint({
      failAfterError: true,
      reportOutputDir: enableReportToFile ? reportsPath : null,
      reporters: [
        {
          formatter: 'string',
          console: !production,
          save: enableReportToFile ? 'report-styles.txt' : null,
        },
        // {formatter: 'json', save: 'report.json'},
      ],
      debug: true,
      // fix: true,
    }))
);

const processStyles = () => {
  const postCssPlugins = [
    postcssPresetEnv({
      autoprefixer: { grid: true },
    }),
    production ? cssnano() : cssnano({
      preset: ['default', { normalizeWhitespace: false }],
    }),
  ];
  return (
    src(stylesSourcePath, { sourcemaps: !production })
      .pipe(sass(production && { outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(postcss(postCssPlugins))
      .pipe(rename('styles.min.css'))
      .pipe(dest(destCss, { sourcemaps: !production }))
  );
};

const lintJs = () => {
  // create report directory if it doesn't already exist
  if (!fs.existsSync(reportsPath) && enableReportToFile) {
    fs.mkdirSync(reportsPath);
  }

  let lintStream = src([gulpPath, jsSourcePathAll])
    .pipe(eslint())
    .pipe(eslint.format());

  if (enableReportToFile) {
    lintStream = lintStream
      .pipe(eslint.format('visualstudio', fs.createWriteStream(buildGlob(reportsPath, 'report-js.txt'))));
  }

  lintStream = lintStream.pipe(eslint.failAfterError());

  return lintStream;
};

const processJs = () => (
  src(jsSourcePath)
    .pipe(webpack({
      context: path.normalize(source),
      entry: {
        app: path.normalize(jsSourcePath),
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

const favicon = () => src(faviconPath, {
  allowEmpty: true,
}).pipe(dest(destination));

// enable/disable linting depending on config
let views = () => src('.', { allowEmpty: true }); // dummy task
let styles;
let js;

if (enableLinting) {
  views = lintViews;
  styles = series(lintStyles, processStyles);
  js = series(lintJs, processJs);
} else {
  styles = processStyles;
  js = processJs;
}

const watchTask = () => {
  browserSync.init({
    open: 'external',
    port: 9000,
    proxy: `localhost:${port}`,
  });
  watch(pugSourcePathAll, views);
  watch(stylesSourcePathAll, styles);
  watch(gulpPath, lintJs);
  watch(jsSourcePathAll, js);
  watch(imgPath, minimizeImgs);
  watch(staticFilesPaths).on('change', browserSync.reload);
};

const clean = done => {
  del.sync([destination, reportsPath]);
  done();
};

const build = (
  series(
    clean,
    parallel(
      views,
      styles,
      js,
      minimizeImgs,
      favicon,
    ),
  )
);

const buildWatch = (
  series(
    clean,
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

exports.lintviews = lintViews;
exports.styles = styles;
exports.lintjs = lintJs;
exports.js = js;
exports.minimgs = minimizeImgs;
exports.favicon = favicon;
exports.watch = watchTask;
exports.clean = clean;

exports.default = build;
exports.buildwatch = buildWatch;
