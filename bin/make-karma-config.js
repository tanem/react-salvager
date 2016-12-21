import path from 'path'

module.exports = function makeKarmaConfig(configType) {
  return Object.assign(
    {},
    getBrowsers(configType),
    getBrowserNoActivityTimeout(configType),
    getCaptureTimeout(configType),
    getCoverageReporter(),
    getCustomLaunchers(configType),
    getFiles(),
    getFrameworks(),
    getPreprocessors(),
    getReporters(configType),
    getSauceLabs(configType),
    getSingleRun(),
    getWebpack(),
    getWebpackMiddleware()
  )
}

function getBrowsers(configType) {
  if (configType === 'local') {
    return {
      browsers: [ 'Chrome' ]
    }
  }

  return {
    browsers: Object.keys(getCustomLaunchers('ci').customLaunchers)
  }
}

function getBrowserNoActivityTimeout(configType) {
  if (configType === 'ci') {
    return {
      browserNoActivityTimeout: 300000
    }
  }
}

function getCaptureTimeout(configType) {
  if (configType === 'ci') {
    return {
      captureTimeout: 300000
    }
  }
}

function getCoverageReporter() {
  return {
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' }
      ]
    }
  }
}

function getCustomLaunchers(configType) {
  if (configType === 'ci') {
    return {
      customLaunchers: {
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
      }
    }
  }
}

function getFiles() {
  return {
    files: [ 'test/Salvager.test.js' ]
  }
}

function getFrameworks() {
  return {
    frameworks: [ 'mocha' ]
  }
}

function getPreprocessors() {
  return {
    preprocessors: {
      'test/Salvager.test.js': [ 'webpack', 'sourcemap' ]
    }
  }
}

function getReporters(configType) {
  if (configType === 'local') {
    return {
      reporters: [ 'spec', 'coverage' ]
    }
  }

  return {
    reporters: [ 'spec', 'saucelabs', 'coverage', 'coveralls' ]
  }
}

function getSauceLabs(configType) {
  if (configType === 'ci') {
    return {
      sauceLabs: {
        public: 'public',
        recordScreenshots: false
      }
    }
  }
}

function getSingleRun() {
  return {
    singleRun: true
  }
}

function getWebpack() {
  return {
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: [ 'babel' ],
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
            loaders: [ 'json' ]
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          }
        ]
      }
    }
  }
}

function getWebpackMiddleware() {
  return {
    webpackMiddleware: {
      noInfo: true
    }
  }
}
