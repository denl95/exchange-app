/* global require*/
const config = require('./webpack.common.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

config.plugins = config.plugins.concat([
  new HtmlWebpackPlugin({
    inject: false,
    template: require('html-webpack-template'),
    title: 'Exchange app',
    appMountId: 'root'
  }),
]);

module.exports = config;
