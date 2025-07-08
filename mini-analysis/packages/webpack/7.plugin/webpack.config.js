
const path = require('path');
const DonePlugin = require('./plugins/done-plugin');
const WebpackAssetsPlugin = require('./plugins/webpack-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoExternalPlugin = require('./plugins/auto-external-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },
  /*  externals: {
     'jquery': '$',//告诉webpack jquery这个模块可以直接从 window.$上取
     'lodash': '_'//告诉webpack lodash这个模块可以直接从 window._上取
   }, */
  plugins: [
    /* new DonePlugin({ name: 'done' }),
    new WebpackAssetsPlugin(), */
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new AutoExternalPlugin({
      jquery: {
        variable: '$',//CDN引入后的全局变量名
        url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'//CDN脚本地址
      },
      lodash: {
        variable: '_',
        url: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js'
      }
    })
  ]
}