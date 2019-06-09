const {src, dest, series, parallel, watch} = require('gulp');
const webpack = require('webpack-stream');

const webpack = () => (
  src('src/js/**/*.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(dest('dist/'))
);

exports.webpack = webpack;