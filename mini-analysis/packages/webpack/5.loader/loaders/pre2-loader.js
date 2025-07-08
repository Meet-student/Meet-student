
function loader(source) {
  console.log('pre2');
  //console.log(source);//loader里拿 到的source一般默认是字符串
  //加载一些图片 字体
  return source + '//pre2';
}
loader.pitch = function () {
  console.log('pre2-pitch');
}
///如果loader的 raw=true的话，传递给loader的参数就是Buffer，而字符串
loader.raw = true;
module.exports = loader;