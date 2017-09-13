const path = require('path');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/ }
    ]
  },
  externals: ['react', 'react-dom']
}