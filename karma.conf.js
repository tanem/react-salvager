/*eslint no-var: 0*/

var path = require('path');

module.exports = function (config) {
  config.set({

    browsers: ['Chrome'],

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' }
      ]
    },

    files: ['test/Salvager.test.js'],

    frameworks: ['mocha'],

    preprocessors: {
      'test/Salvager.test.js': ['webpack', 'sourcemap']
    },

    reporters: ['spec', 'coverage'],

    singleRun: true,

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            include: path.resolve('src'),
            exclude: /test/,
            loader: 'isparta'
          },
          {
            test: /\.json$/,
            loaders: ['json']
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    }

  });
};
