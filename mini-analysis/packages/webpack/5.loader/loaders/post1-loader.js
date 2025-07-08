
function loader(source) {
  console.log(this);
  let options = this.getOptions();
  console.log(options);
  console.log('post1');
  return source + '//post1';
}
loader.pitch = function () {
  console.log('post1-pitch');
}
module.exports = loader;