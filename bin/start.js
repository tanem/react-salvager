import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.dev';

const devServerConfig = config.devServer;
const { port, hostname } = devServerConfig;

new WebpackDevServer(webpack(config), devServerConfig)
  .listen(port, hostname, (err) => {
    if (err) console.log(err);
    console.log(`Listening at localhost:${port}`);
  });
