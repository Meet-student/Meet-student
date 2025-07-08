import { createFilter } from 'rollup-pluginutils';
import babel from '@babel/core';
function babelPlugin(options = {}) {
  const defaultExtensions = ['.js', '.jsx'];
  const { exclude, include, extensions = defaultExtensions } = options;
  // (.js|.jsx)$
  const regExp = new RegExp(`(${extensions.join('|')})$`);
  const userDefinedFilter = createFilter(include, exclude);
  const filter = id => regExp.test(id) && userDefinedFilter(id);
  return {
    name: 'inject-polyfill',
    async transform(code, filename) {
      if (!filter(filename)) return null;
      let result = await babel.transformAsync(code, {
        presets: ["@babel/preset-env"]
      });
      return result;
    }
  }
}
export default babelPlugin;
