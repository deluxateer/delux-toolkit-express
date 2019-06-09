import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: {
    app: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  context: path.resolve(__dirname, '../src'),
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}