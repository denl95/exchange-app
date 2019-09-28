/* global require*/
const config = require('./webpack.common.config');
const path = require('path');

config.entry.app = [
  'react-hot-loader/patch',
  ...config.entry.app
];

config.mode = 'development';

config.devServer = {
  contentBase: path.resolve('./build/resources/static'),
  port: 3000,
  historyApiFallback: true,
  stats: 'minimal',
  hotOnly: true,
  proxy: {
    '/api/**': {
      target: 'https://alert-system-dot-sensor-platform.appspot.com',
      logLevel: 'debug',
      changeOrigin: true,
    },
  }
};

config.devtool = 'source-map';

config.module.rules = config.module.rules.concat([
  {
    test: /\.tsx?$/,
    include: /src/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          cacheDirectory: 'build/.awcache',
          // as an experimental attempt probalby after removing react-hot loader from babel
          // this is not needed anymore
          // useBabel: true,
          useCache: true,
        }
      },
    ]
  }
]);

config.resolve.alias = {
  'react-dom': '@hot-loader/react-dom',
};

module.exports = config;
