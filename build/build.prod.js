
const path = require('path')
const scopeCssPlugin = require('scoped-css-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolvePath = (...pathSnippet) => path.resolve(path.join(__dirname, '../src' , ...pathSnippet))

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: [resolvePath(`index.js`)],
  output: {
    filename: '[id].js',
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [resolvePath()],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        include: [resolvePath()],
        loader: 'css-loader',
      }
    ]
  },
  plugins: [
    new scopeCssPlugin({
      name: 'self plugin',
    }),
    new HtmlWebpackPlugin({
      template: resolvePath('index.html'),
    }),
  ]
}

module.exports = webpackConfig
