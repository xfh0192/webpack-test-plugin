
const path = require('path')
// const scopedCssPlugin = require('scoped-css-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  version: '1.0.0'
}
const resolvePath = (...pathSnippet) => path.resolve(path.join(__dirname, '../src' , ...pathSnippet))

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },

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
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        include: [resolvePath()],
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          // 'scoped-css-plugin',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[id]_' + config.version + '_[hash].css',
      chunkFilename: '[id]_' + config.version + '_[hash].css'
    }),
    // new scopedCssPlugin.plugin({
    //   name: 'self plugin',
    // }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'HtmlWebpackPlugin Title',
      inject: true,
    }),
  ]
}

module.exports = webpackConfig
