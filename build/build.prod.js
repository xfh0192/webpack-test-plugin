
const path = require('path')
const ScopedCssPlugin = require('scoped-css-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  version: '1.0.0'
}
const resolvePath = (...pathSnippet) => path.resolve(path.join(__dirname, '../src' , ...pathSnippet))

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: 'eval-source-map',

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
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-react']
            },
          }, {
            loader: ScopedCssPlugin.ScopedJsLoader
          }
        ]
      },
      {
        test: /\.css$/,
        include: [resolvePath()],
        loader: [
          // MiniCssExtractPlugin.loader,
          'style-loader', // 从 JS 中创建样式节点
          'css-loader', // 转化 CSS 为 CommonJS
          // 'less-loader',
          ScopedCssPlugin.ScopedCssLoader,
        ],
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[id]_' + config.version + '_[hash].css',
    //   chunkFilename: '[id]_' + config.version + '_[hash].css'
    // }),
    new ScopedCssPlugin({
      name: 'self plugin - scopedCssPlugin',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'HtmlWebpackPlugin Title',
      inject: true,
    }),
  ]
}

module.exports = webpackConfig
