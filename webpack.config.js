/**
 * Created by ryancui on 2017/6/29.
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      exclude: /highlight/
    }, {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_module|highlight/
    }, {
      test: /highlight/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }],
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
  devServer: {
    noInfo: true
  }
};