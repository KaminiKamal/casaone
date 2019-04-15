const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config.dev');
const open = require('open');

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

console.log(path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
});