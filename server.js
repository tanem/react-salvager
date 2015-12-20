/*eslint no-var: 0, no-console: 0*/

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var devServerConfig = config.devServer;

new WebpackDevServer(webpack(config), devServerConfig)
  .listen(devServerConfig.port, devServerConfig.hostname, function (err) {
    if (err) console.log(err);
    console.log('Listening at localhost:3000');
  });
