
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssUnitsModifier = require('./src/plugins/css-units-modifier.js')

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.scss$/, use: ["style-loader", "css-loader", 'sass-loader'] }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['main'],
      inject: true,
      filename: 'index.html',
    }),
    new CssUnitsModifier('px', 'rem')
  ],
}