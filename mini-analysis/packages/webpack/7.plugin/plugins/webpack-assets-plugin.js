
//用来打印当编译完成后，打印本次产出的代码块和文件 
//Compilation 
class WebpackAssetsPlugin {
  apply(compiler) {
    //每当compiler创建一个新的compilation的时候，会执行回调,参数就是新的compilation
    compiler.hooks.compilation.tap('WebpackAssetsPlugin', (compilation) => {
      //在编译 的时候 ，每当为代码块创建一个新的文件的时候，就会触发此钩子的回调执行
      compilation.hooks.chunkAsset.tap('WebpackAssetsPlugin', (chunk, filename) => {
        //chunk.name=main filename=main.js
        console.log(chunk.name || chunk.id, filename);
      });
    });
  }
}
module.exports = WebpackAssetsPlugin;