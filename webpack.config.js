var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


var PROJECT_ROOT = path.resolve(__dirname);
var NODE_MODULES = path.resolve(PROJECT_ROOT, 'node_modules');
var APP_ROOT = path.resolve(PROJECT_ROOT, 'app');
var WEB_ROOT = path.resolve(PROJECT_ROOT, 'Web');
var DIST_PATH = '/content/bundles';

var config = {
  entry: {
    app: [path.resolve(APP_ROOT, 'app')],
    vendors: path.resolve(APP_ROOT, 'vendors'),
  },
  output: {
    path: path.join(WEB_ROOT, DIST_PATH),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css!postcss'},
      {test: /\.less$/, loader: 'style!css!postcss!less'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
    ],
  },
  postcss: function() {
    return [autoprefixer({browsers:['last 2 versions']})];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'jquery': path.resolve(NODE_MODULES, 'jquery/dist/jquery.js'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
      minChunks: Infinity
    }),
  ],
};

module.exports = {
  PROJECT_ROOT: PROJECT_ROOT,
  APP_ROOT: APP_ROOT,
  WEB_ROOT: WEB_ROOT,
  config: config
};
