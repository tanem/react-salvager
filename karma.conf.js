/*eslint no-var: 0*/

module.exports = function (config) {
  config.set({

    browsers: ['Chrome'],

    files: ['test/Salvager.test.js'],

    frameworks: ['mocha'],

    preprocessors: {
      'test/Salvager.test.js': ['webpack', 'sourcemap']
    },

    reporters: ['spec'],

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
