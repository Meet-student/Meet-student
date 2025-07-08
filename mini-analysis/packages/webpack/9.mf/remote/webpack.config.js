
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/'
  },
  devServer: {
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-react'] }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ModuleFederationPlugin({
      filename: 'remoteEntry.js',//额外编译出来的文件名,里面会提供一些额外的模块给别人用
      name: 'remote',
      //被远程引用时可暴露的资源路径及其别名
      exposes: {
        './NewsList': './src/NewsList'
      },
      /* remotes: {
        'host': 'host@http://localhost:8000/remoteEntry.js'
      }, */
      shared: {
        react: { singleton: true },
        // 'react-dom': { singleton: true }
      }
    })
  ]
}