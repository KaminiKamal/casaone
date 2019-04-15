/*eslint-disable no-console */

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.dev');
// import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production');

webpack(webpackConfig).run((err, stats) => {

});