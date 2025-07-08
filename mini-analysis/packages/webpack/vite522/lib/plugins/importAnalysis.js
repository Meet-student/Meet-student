
const { init, parse } = require('es-module-lexer');
const MagicString = require('magic-string');
function importAnalysisPlugin({ root }) {
  return {
    name: 'vite:import-analysis',
    //source = import { createApp } from 'vue';  importer=vue
    async transform(source, importer) {
      await init;
      const [imports] = parse(source);
      if (imports.length == 0) {
        return source;//如果没有导入其它的任何模块，则可以直接返回
      }
      let ms = new MagicString(source);
      const normalizeUrl = async (url) => {//url=vue
        const resolved = await this.resolve(url, importer);
        const id = resolved.id || resolved;
        //获取此模块的路径，如果模块的路径是以根目录下的开头的话，把url变成了相对于根目录的相对路径
        if (id.startsWith(root + '/')) {
          //  /node_modules/.vite/deps/vue.js
          url = id.slice(root.length);
        }
        return url;
      }
      for (let index = 0; index < imports.length; index++) {
        const { s: start, e: end, n: specifier } = imports[index];
        if (specifier) {
          const normalizedUrl = await normalizeUrl(specifier);//vue
          if (normalizedUrl !== specifier) {
            ms.overwrite(start, end, normalizedUrl);//vue=>/node_modules/.vite/deps/vue.js
          }
        }
      }
      return ms.toString();
    }
  }
}
module.exports = importAnalysisPlugin;