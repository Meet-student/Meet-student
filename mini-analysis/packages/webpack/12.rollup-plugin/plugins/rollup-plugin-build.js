import fs from 'fs';
import { resolve } from 'path';
function build() {
  return {
    name: 'build',
    async watchChange(id, change) {
      console.log('watchChange');
    },
    async closeWatcher() {
      console.log('closeWatcher');
    },
    async options(inputOptions) {
      //inputOptions里的选项不是完整的
      console.log('options');
    },
    async buildStart(inputOptions) {
      //inputOptions里的选项是完整的
      console.log('buildStart');
    },
    //正常来说，rollup标准行为，如果是相对模块路径./hello.js默认行为是找到这个文件在硬盘上的绝对路径传给load里的id参数
    async resolveId(source, importer) {
      console.log('resolveId', source, importer);//source=virtual-module
      if (source === 'virtual-module') {
        return source;//first 只要有一个插件钩子返回了不为空的值，后面插件钩子不走了，默认行为也不走了
      }
    },
    //load默认行为是用fs模块读取文件内容  一般来说id是模块的绝对路径
    //如果有插件的钩子返回了内容，后面的钩子以下默认行为都不要了
    async load(id) {
      if (id === 'virtual-module') {
        return `export default "virtual";`;
      }
      console.log('load', id);
    },
    async shouldTransformCachedModule({ id, code, ast }) {
      console.log('shouldTransformCachedModule');
      return true;
    },
    async transform(code, id) {
      console.log('transform');
    },
    async moduleParsed(moduleInfo) {
      console.log('moduleParsed');
    },
    async resolveDynamicImport(specifier, importer) {
      console.log('resolveDynamicImport');
    },
    async closeBundle() {
      console.log('closeBundle');
    },
    async buildEnd() {
      console.log('buildEnd');
    }
  }
}
export default build;