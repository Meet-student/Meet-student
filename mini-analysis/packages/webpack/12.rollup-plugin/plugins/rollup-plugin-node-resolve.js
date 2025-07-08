import path from 'path';
import Module from 'module';
function resolvePlugin() {
  return {
    name: 'commonjs',
    async resolveId(importee, importer) {
      if (importee[0] === '.' || path.isAbsolute(importee)) {
        return null;
      }
      let location = Module.createRequire(path.dirname(importer)).resolve(importee)
      return location;
    }
  }
}
export default resolvePlugin;
