const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './example/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './example/index',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/ },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'], exclude: /node_modules/}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}