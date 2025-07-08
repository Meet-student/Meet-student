
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: 'http://localhost:8000/'
  },
  devServer: {
    port: 8000
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
      //filename: 'remoteEntry.js',//额外编译出来的文件名,里面会提供一些额外的模块给别人用
      //name: 'host',
      //remotes	object	远程引用的应用名及其别名的映射，使用时以key值作为name
      remotes: {
        'remote': 'remote@http://localhost:3000/remoteEntry.js'
      },
      /*  exposes: {
         './Sliders': './src/Sliders'
       }, */
      shared: {
        react: { singleton: true },
        //'react-dom': { singleton: true }
      }
    })
  ]
}