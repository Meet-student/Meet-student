
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const PreloadWebpackPlugin = require('./preload-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    page3: './src/page3.js'
  },
  // entry: './src/index.js',
  optimization: {
    splitChunks: {
      //表示选择chunk进行分割，默认的话只分割异步模块， async initial all=async+initial
      chunks: 'all',
      //表示分割出云的代码块必须大于等于minSie,默认值是30K 20K 0就是不限制
      minSize: 0,
      //同步入口最大的并发请求数
      maxInitialRequests: 4,
      //异步文件最大的并发请求数
      maxAsyncRequests: 3,
      //在代码分割的时候，会有一个缓存组的概念，相同类似的模块分属于一个缓存组，会打包在一起
      cacheGroups: {

        defaultVendors: {
          test: /node_modules/,//分组的条件，只要模块的绝对路径里面包含node_modules的话
          priority: -10,
        },
        default: {
          minChunks: 2,//如果一个模块被 几个代码块共享了，就会被单独提取出来
          priority: -20
        }
        /*  defaultVendors: false,
         default: false,
         common: {
           minChunks: 1,
           reuseExistingChunk: false
         } */
      }
    }
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new PreloadWebpackPlugin({

    })
  ]
}