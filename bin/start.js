import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import makeWebpackConfig from './make-webpack-config';

const webpackConfig = makeWebpackConfig('dev');
const devServerConfig = webpackConfig.devServer;
const { port, hostname } = devServerConfig;

new WebpackDevServer(webpack(webpackConfig), devServerConfig)
  .listen(port, hostname, (err) => {
    if (err) console.log(err);
    console.log(`Listening at localhost:${port}`);
  });
