const express = require('express');
const logger = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config');
const compiler = webpack(webpackOptions);
const app = express();
app.use(webpackDevMiddleware(compiler, {}));
app.use(logger('dev'));
app.get('/users', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: ' 1' },
      { id: 2, name: ' 2' },
      { id: 3, name: ' 3' }
    ]
  });
});
app.listen(3000, () => console.log('3000'));