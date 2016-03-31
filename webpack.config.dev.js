var path = require('path');
var webpack = require('webpack');

var webpackconfig = require('./webpack.config.js');
var config = webpackconfig.config;

// config.devtool = 'cheap-module-eval-source-map';
config.devtool = 'source-map';
config.debug = true;
config.devServer = {
  contentBase: "./Web",
  hot: true,
}

config.entry.app.push('webpack/hot/only-dev-server');

config.output.publicPath = 'http://localhost:8080/content/bundles/';

config.module.loaders.push({test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel'});

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
]);

// console.log('-----config-----');
// console.log(config);
// console.log('-----config-----');

module.exports = config;