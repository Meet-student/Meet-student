
function loader(source) {
  let options = this.getOptions();
  console.log(options);
  return source + '//loader';
}
module.exports = loader;
//Error: callback(): The callback was already called.