class HashPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('HashPlugin', (compilation, params) => {
      //监听compilation的afterHash这个钩子，当生成hash之后会触发此钩子
      //https://webpack.js.org/api/compilation-hooks/#afterhash
      compilation.hooks.afterHash.tap('HashPlugin', () => {
        //可以通过compilation.hash获取到编译 的hash
        console.log('本次编译的compilation.hash', compilation.hash);
        compilation.hash = '可以改为自己随便写的hash';
        //遍历所有的代码块
        for (let chunk of compilation.chunks) {
          //可以通过chunk.hash获取每个代码块对应的hash
          console.log('chunk.hash', chunk.hash);
          chunk.renderedHash = '可以在此改变chunkHash';//可以改变chunkhash
          //可以从chunk.contentHash上读取内容hash
          console.log('chunk.contentHash', chunk.contentHash);
          //可以修改修改内容hash
          chunk.contentHash = { javascript: 'JS的hash用这个', 'css/mini-extract': 'MiniCssExtractPluginHASH' }
        }
      });
    });
  }
}
module.exports = HashPlugin;