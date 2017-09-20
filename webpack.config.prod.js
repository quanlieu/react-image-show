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
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
        exclude: /node_modules/
      }
    ]
  },
  externals: ['react']
}