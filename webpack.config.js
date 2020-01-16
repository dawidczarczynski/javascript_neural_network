const path = require('path');
const WorkerPlugin = require('worker-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new WorkerPlugin({
      globalObject: false
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      path: path.resolve(__dirname, 'dist')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};