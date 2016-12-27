import path from 'path'
import webpack from 'webpack'

module.exports = function makeWebpackConfig(configType) {
  return Object.assign(
    {},
    getDevServer(configType),
    getDevtool(configType),
    getEntry(configType),
    getExternals(configType),
    getModule(configType),
    getOutput(configType),
    getPlugins(configType)
  )
}

function getDevServer(configType) {
  if (configType === 'dev') {
    return {
      devServer: {
        host: 'localhost',
        hot: true,
        port: 3000,
        publicPath: '/static/',
        stats: {
          colors: true,
          hash: false,
          version: false,
          assets: true,
          chunks: false
        }
      }
    }
  }
}

function getDevtool(configType) {
  if (configType === 'dev') {
    return {
      devtool: 'cheap-module-eval-source-map'
    }
  }
}

function getEntry(configType) {
  if (configType === 'dev') {
    return {
      entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './example/main.js'
      ]
    }
  }

  return {
    entry: './src/Salvager.js'
  }
}

function getExternals(configType) {
  if (configType !== 'dev') {
    return {
      externals: {
        react: {
          root: 'React',
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react'
        }
      }
    }
  }
}

function getModule(configType) {
  if (configType === 'dev') {
    return {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: [ 'react-hot', 'babel' ],
            exclude: /node_modules/
          }
        ]
      }
    }
  }

  return {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    }
  }
}

function getOutput(configType) {
  if (configType === 'dev') {
    return {
      output: {
        path: path.resolve('example'),
        filename: '[name].bundle.js',
        publicPath: '/static/'
      }
    }
  }

  if (configType === 'umd') {
    return {
      output: {
        library: 'react-salvager',
        libraryTarget: 'umd',
        path: 'dist',
        filename: 'react-salvager.js'
      }
    }
  }

  return {
    output: {
      library: 'react-salvager',
      libraryTarget: 'umd',
      path: 'dist',
      filename: 'react-salvager.min.js'
    }
  }
}

function getPlugins(configType) {
  if (configType === 'dev') {
    return {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
      ]
    }
  }

  if (configType === 'umd') {
    return {
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    }
  }

  return {
    plugins: [
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
    ]
  }
}
