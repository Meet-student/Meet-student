
function loader(source) {
  console.log('inline1');
  return source + '//inline1';
}
loader.pitch = function (remainingRequest, previousRequest, data) {
  console.log('inline1-pitch');
  //return 'value1';

  //this.callback(null, 'value1', 'value2');
  //let callback = this.async();
  /*  setTimeout(() => {
     this.callback(null, 'value1');
   }, 3000); */
}
module.exports = loader;
//Error: callback(): The callback was already called.