import {src, dest, series, parallel, watch} from 'gulp';
import webpack from 'webpack-stream';

const test = () => (
  src('src/js/**/*.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(dest('dist/'))
);

exports.test = test;