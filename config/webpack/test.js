process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const environment = require('./environment');

const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const sharedConfig = environment.toWebpackConfig();

module.exports = merge(sharedConfig, {
  target: 'node',
  externals: [nodeExternals()]
});