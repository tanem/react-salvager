/*eslint no-var: 0*/

module.exports = function (config) {

  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      browserName: 'safari'
    },
    'SL_Opera': {
      base: 'SauceLabs',
      browserName: 'opera'
    },
    'SL_IE': {
      base: 'SauceLabs',
      browserName: 'internet explorer'
    },
    'SL_iOS': {
      base: 'SauceLabs',
      browserName: 'iphone'
    },
    'SL_Android': {
      base: 'SauceLabs',
      browserName: 'android'
    }
  };

  config.set({

    browsers: Object.keys(customLaunchers),

    customLaunchers: customLaunchers,

    files: ['test/Salvager.test.js'],

    frameworks: ['mocha'],

    preprocessors: {
      'test/Salvager.test.js': ['webpack', 'sourcemap']
    },

    reporters: ['spec', 'saucelabs'],

    sauceLabs: {
      recordScreenshots: false,
      public: 'public'
    },

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
