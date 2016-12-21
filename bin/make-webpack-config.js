import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

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
      entry: {
        'custom-row': [
          'webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          './examples/custom-row/main.js'
        ],
        'default-row': [
          'webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          './examples/default-row/main.js'
        ]
      }
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
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom'
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
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
        }
      ]
    }
  }
}

function getOutput(configType) {
  if (configType === 'dev') {
    return {
      output: {
        path: path.resolve('examples'),
        filename: '[name].bundle.js',
        publicPath: '/static/'
      }
    }
  }

  if (configType === 'umd') {
    return {
      output: {
        library: 'Salvager',
        libraryTarget: 'umd',
        path: 'dist',
        filename: 'salvager.js'
      }
    }
  }

  return {
    output: {
      library: 'Salvager',
      libraryTarget: 'umd',
      path: 'dist',
      filename: 'salvager.min.js'
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
        }),
        new ExtractTextPlugin('salvager.css')
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
      }),
      new ExtractTextPlugin('salvager.min.css')
    ]
  }
}
