
function loader(source) {
  let filename = Date.now() + ".png";
  //用于向输出目录里写一个新的文件
  this.emitFile(filename, source);
  return `module.exports = ${JSON.stringify(filename)}`;
}
loader.raw = true;
module.exports = loader;
/* 
以前加载图片等二进制文件需要使用file-loader url-loader
现在不需要了，type:asset
file-loader url-loader
const { getOptions, interpolateName } = require('loader-utils');
function loader(content) {
  let options = getOptions(this) || {};
  let url = interpolateName(this, options.filename || "[hash].[ext]", { content });
  this.emitFile(url, content);
  return `module.exports = ${JSON.stringify(url)}`;
}
loader.raw = true;
module.exports = loader;
Since webpack 5, this.getOptions is available in loader context. It substitutes getOptions method from loader-utils.
5 getOptions 内置了，不再需要调用 loader-utils.getOptions
*/