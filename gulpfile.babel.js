import {src, dest, series, parallel, watch} from 'gulp';
import webpack from 'webpack-stream';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// import {test} from './tasks/test';

const test = () => (
  src('src/js/**/*.js')
    .pipe(webpack(require('./tasks/webpack.config')))
    .pipe(dest('dist/'))
);

exports.test = test;

const scss = () => (
  src('src/scss/index.scss')
    .pipe(webpack({
      output: {
        // residual js file that should be deleted
        // finding a way to avoid this altogether would be awesome
        filename: 'garbage.js' 
      },
      module: {
        rules: [{
          test: /\.scss$/,
          use: [
            {
              // loader: 'style-loader'
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed'
              }
            }
          ]
        }]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles.css'
        })
      ]
    }))
    .pipe(dest('dist/'))
);

exports.scss = scss;