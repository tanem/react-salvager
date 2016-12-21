import nodeCLI from 'shelljs-nodecli'
config.fatal = true

import webpack from 'webpack'
import makeWebpackConfig from './make-webpack-config'

exec('npm run clean -- build')
nodeCLI.exec('babel', 'src -d lib')

webpack(makeWebpackConfig('umd')).run(done)
webpack(makeWebpackConfig('umdMin')).run(done)

function done(error, stats) {
  if (error) {
    echo(error)
    exit(1)
  }
  echo(stats.toString({
    assets: true,
    chunks: false,
    hash: false,
    timings: false,
    version: false
  }))
}
