const { runLoaders } = require('loader-runner');
const path = require('path');
const fs = require('fs');
const entryFile = path.resolve(__dirname, 'src/index.js');
const resource = entryFile;
let rules = [
  {
    test: /\.js$/,
    use: {
      loader: path.resolve(__dirname, 'loader.js'),
      options: { id: 100 }
    }
  }
]
let loaders = []
let options = [];
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    loaders.push(rule.use.loader);
    options.push(rule.use.options);
  }
}
//let loaders = [path.resolve(__dirname, 'loader.js')];
function getOptions() {
  return options[this.loaderIndex];
}
runLoaders({
  resource,
  loaders: [path.resolve(__dirname, 'loader.js')],
  context: { age: 15, getOptions },//默认的上下文对象,不传的话默认就是空对象，此对象将会成为loader执行时的this指针，是的getOptions
  readResource: fs.readFile

}, (err, result) => {
  console.log(result);
});