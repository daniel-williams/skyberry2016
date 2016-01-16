var webpack = require('webpack');
var path = require('path');

var PROJECT_PATH = path.resolve(__dirname);
var NODE_MODULES = path.resolve(PROJECT_PATH, 'node_modules');

var APP_ROOT = path.resolve(PROJECT_PATH, 'app');
var WEB_ROOT = path.resolve(PROJECT_PATH, 'Web');

var DIST_PATH = path.resolve(WEB_ROOT, 'content/bundles');

module.exports = {
  entry: {
    app: [
      path.resolve(APP_ROOT, 'app'),
      'webpack/hot/only-dev-server'
    ],
    vendors: [
      'jquery',
      'react',
      'react-addons-pure-render-mixin',
      'react-router',
      'history',
      'redux',
      'react-redux',
      'react-bootstrap',
      'isomorphic-fetch',
      'immutable',
      'formsy-react',
      'webfontloader',
      'react-hot-loader',
    ],
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'jquery': path.resolve(NODE_MODULES, 'jquery/dist/jquery.js'),
    },
  },
  output: {
    path: DIST_PATH,
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080/content/bundles/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
      minChunks: Infinity
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
};
