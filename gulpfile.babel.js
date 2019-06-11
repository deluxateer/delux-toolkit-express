import path from 'path';
import {src, dest, series, parallel, watch} from 'gulp';
import del from 'del';
import webpack from 'webpack-stream';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// import {test} from './tasks/test';

const views = () => (
  // src('src/views/index.html')
  //   .pipe(webpack({
  //     entry: './js/index.js',
  //     output: {
  //       path: path.resolve(__dirname, 'dist'),
  //       filename: 'garbage.js',
  //     },
  //     context: path.resolve(__dirname, './src'),
  //     mode: 'development',
  //     // module: {
  //     //   rules: [{
  //     //     test: /\.html$/,
  //     //     loader: 'babel-loader',
  //     //   }]
  //     // },
  //     plugins: [
  //       new HtmlWebpackPlugin({
  //         template: './views/index.html'
  //       })
  //     ]
  //   }))
);

const test = () => (
  src('src/js/index.js')
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

exports.views = views;
exports.scss = scss;