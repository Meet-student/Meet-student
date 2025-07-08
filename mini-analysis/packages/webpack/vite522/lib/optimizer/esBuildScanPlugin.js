const fs = require('fs-extra');
const path = require('path');
const htmlTypesRE = /\.html$/;
const { createPluginContainer } = require('../server/pluginContainer');//运行vite插件的容器
const resolvePlugin = require('../plugins/resolve');
const { normalizePath } = require('../utils');
const scriptModuleRE = /<script\s+type="module"\s+src\="(.+?)"><\/script>/;
const JS_TYPES_RE = /\.js$/;
async function esBuildScanPlugin(config, depImports) {
  config.plugins = [resolvePlugin(config)];
  const container = await createPluginContainer(config);
  //此方法第一次执行的时候 importee =C:\vite522use\index.html
  const resolve = async (importee, importer = path.join(root, 'index.html')) => {
    return await container.resolveId(importee, importer);
  }
  return {
    name: 'vite:dep-scan',
    setup(build) {//看到setup build就知道这是一个esbuild插件，也是esbuild插件提供的钩子onResolve onLoad
      //用来解析路径
      build.onResolve({ filter: /\.vue$/ }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer);
        if (resolved) {
          return {
            path: resolved.id || resolved,//结果可能是一个对象id是绝对路径，也可能是一个绝对路径
            external: true
          }
        }
      });
      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer);
        if (resolved) {
          return {
            path: resolved.id || resolved,//结果可能是一个对象id是绝对路径，也可能是一个绝对路径
            namespace: 'html'//把html文件放入一个自定义命名空间下 \ /=/
          }
        }
      });
      //path=/src/main.js importer=index.html 
      build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer);//path=vue
        //path=/src/main.js
        //id=C:\vite522use\src\main.js
        if (resolved) {/// c:/node_modules/vue/dist/vue.runtime.esm-bundler.js
          const id = resolved.id || resolved;//id就是导入的模块绝对路径
          const included = id.includes('node_modules');
          if (included) {
            //depImports.vue=c:/node_modules/vue/dist/vue.runtime.esm-bundler.js
            depImports[path] = normalizePath(id);
            return {
              path: id,
              external: true//external就表示这是一个外部模块，不需要进一步处理
            }
          }
          return { path: id }
        }
      });
      //读取文件内容 C:\vite522use\index.html
      build.onLoad({ filter: htmlTypesRE, namespace: 'html' }, async ({ path }) => {
        const html = fs.readFileSync(path, 'utf-8');//读取 index.html的内容
        const [, scriptSrc] = html.match(scriptModuleRE);
        const js = `import ${JSON.stringify(scriptSrc)}`;//import "/src/main.js"
        return {//我这个index.html文件它的内容等同于import "/src/main.js",文件类型就是js
          contents: js,
          loader: 'js'
        }
      });
      build.onLoad({ filter: JS_TYPES_RE }, async ({ path: id }) => {//path已经是绝对路径了
        let ext = path.extname(id).slice(1);//js
        let contents = fs.readFileSync(id, 'utf-8');//
        return {
          contents,//import { createApp } from 'vue';
          loader: ext//loader:js
        }
      });
    }
  }
}
module.exports = esBuildScanPlugin;