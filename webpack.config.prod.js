var path = require('path');
var webpack = require('webpack');
var webpackconfig = require('./webpack.config.js');


var config = webpackconfig.config;

config.output.publicPath = '/content/bundles/';

config.module.loaders.push({test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'});

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
]);

// console.log('-----config-----');
// console.log(config);
// console.log('-----config-----');

module.exports = config;