/*eslint no-var: 0*/

var webpack = require('webpack');

var config = Object.create(require('./webpack.config.umd'));

config.output.filename = 'Salvager.min.js';

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  })
];

module.exports = config;
