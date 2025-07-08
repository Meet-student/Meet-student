const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const smw = new SpeedMeasureWebpackPlugin();
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HashPlugin = require('./plugins/hash-plugin');
const PATHS = {
  src: path.join(__dirname, 'src')
}
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  /* optimization: {//指定优化的配置项
    minimize: true,//使用压缩最小化
    minimizer: [new TerserPlugin()]//指定压缩的工具
  }, */
  //以前webpack5以前，开发模式下named，生产环境下natural
  optimization: {
    moduleIds: 'deterministic',//根据模块名称生成hash值
    chunkIds: 'deterministic'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    /* library: 'calculator',
    libraryExport: 'add',
    libraryTarget: 'commonjs' */
    //libraryTarget: 'var'//var calculator;声明一个全局变量
    //libraryTarget: 'commonjs'//exports.calculator={add}
    //libraryTarget: 'commonjs2'//module.exports.calculator={add}
    //libraryTarget: 'window'//  window.calculator = exports;
    //libraryTarget: 'this'//  this.calculator = exports;
    //libraryTarget: 'global'//  global.calculator = exports;
    //libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      /*  minify: {
         removeComments: true,
         collapseWhitespace: true
       } */
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*'
      ],
    }),
    new HashPlugin()
    //new OptimizeCssAssetsWebpackPlugin(),
    /*  new PurgecssPlugin({
       paths: glob.sync(`${PATHS.src}/`, { nodir: true })
     }) */
    /* new webpack.IgnorePlugin({
      contextRegExp: /moment$/,//引入模块的路径
      resourceRegExp: /locale///资源模块的对应的上下文
    }),
    new BundleAnalyzerPlugin() */
  ]
}