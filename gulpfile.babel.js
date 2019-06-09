import {src, dest, series, parallel, watch} from 'gulp';
import webpack from 'webpack-stream';

// import {test} from './tasks/test';

const test = () => (
  src('src/js/**/*.js')
    .pipe(webpack(require('./tasks/webpack.config')))
    .pipe(dest('dist/'))
);

exports.test = test;

// const scss = () => (
//   src('src/scss/index.scss')
//     .pipe(webpack({
//       module: {
//         rules: [{
//           test: /\.scss$/,
//           use: [
//             {
//               loader: 'style-loader'
//             },
//             {
//               loader: 'css-loader'
//             },
//             {
//               loader: 'sass-loader',
//               options: {
//                 outputStyle: 'compressed'
//               }
//             }
//           ]
//         }]
//       }
//     }))
//     .pipe(dest('dist/'))
// );

// exports.scss = scss;