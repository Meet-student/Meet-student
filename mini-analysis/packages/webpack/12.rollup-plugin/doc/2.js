let plugin1 = {
  name: "plugin1", resolveId(source, importer, options) {
    console.log('plugin1');
  }
};
let plugin2 = {
  name: "plugin2", resolveId(source, importer, options) {
    console.log('plugin2');
    resolve(source, importer, { skipSelf: true, plugin: plugin2, ...options });
  }
}
let plugin3 = {
  name: "plugin3", resolveId(source, importer, options) {
    console.log('plugin3');
  }
}
let plugins = [plugin1, plugin2, plugin3]
function resolve(source, importer, options = {}) {
  let { skipSelf = true, plugin } = options;
  for (let i = 0; i < plugins.length; i++) {
    let currentPlugin = plugins[i];
    if (currentPlugin === plugin) {
      continue;
    }
    let resolution = currentPlugin.resolveId(source, importer, options);
    if (resolution) {
      return resolution;
    }
  }
  return null;
}
//RangeError: Maximum call stack size exceeded
let resolution = resolve('./src/index.js')
console.log(resolution);