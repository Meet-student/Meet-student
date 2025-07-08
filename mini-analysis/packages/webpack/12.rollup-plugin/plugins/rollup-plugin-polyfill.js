
const POLYFILL_ID = '\0polyfill';
const PROXY_SUFFIX = '?inject-polyfill-proxy';

function injectPolyfillPlugin() {
  return {
    name: 'inject-polyfill',
    async resolveId(source, importer, options) {
      if (source === POLYFILL_ID) {
        return { id: POLYFILL_ID, moduleSideEffects: true };
      }
      //如果是此模块是入口模块的话
      if (options.isEntry) {
        //webpack loaderContext Resolve imports to module ids
        const resolution = await this.resolve(source, importer, { skipSelf: true, ...options });
        //如果解析失败，或者说解析的结果是一个外部模块
        if (!resolution || resolution.external) {
          return resolution
        }
        //根据模块路径获得模块信息
        const moduleInfo = await this.load(resolution);
        //are side effects of the module observed 说明有副作用，不能进行 tree shaking
        moduleInfo.moduleSideEffects = true;
        //C:\12.rollup-plugin\src\index.js?inject-polyfill-proxy 入口模块的绝对路径?inject-polyfill-proxy
        //返回的这个就是模块ID
        return `${resolution.id}${PROXY_SUFFIX}`;// src/index.js?inject-polyfill-proxy
      }
    },
    load(id) {
      if (id === POLYFILL_ID) {
        return 'console.log("这就是真正的polyfill代码了")';
      }
      if (id.endsWith(PROXY_SUFFIX)) {
        const entryId = id.slice(0, -PROXY_SUFFIX.length);//C:\12.rollup-plugin\src\index.js
        let code = `import ${JSON.stringify(POLYFILL_ID)};\n export * from ${JSON.stringify(entryId)};\n`;
        //如果原来的模块中有默认导出
        const { hasDefaultExport } = this.getModuleInfo(entryId);
        console.log(hasDefaultExport);
        if (hasDefaultExport) {
          code += `export {default} from ${JSON.stringify(entryId)};\n`;
        }
        console.log(code);
        return code;
      }
      return null;
    }
  }
}
export default injectPolyfillPlugin;
/**
为了给入口模块自动注入polyfill
代理入口模块
src/index.js
代理成了
src/index.js?inject-polyfill-proxy
读取代理模块内容
import '\0polyfill';
export * from './src/index.js'
export {default} from './src/index.js'; 
rollup读取到了代理模块内容
进入moduleParsed阶段
console.log("这就是真正的polyfill代码了")
console.log('index');
 */