const fs = require('fs');
const { parse, compileScript, compileTemplate, compileStyleAsync, rewriteDefault } = require('vue/compiler-sfc');
function vue() {
  return {
    name: 'vue',
    config(config) {
      return {
        define: {// __VUE_OPTIONS_API__|__VUE_PROD_DEVTOOLS__
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false
        }
      }
    },
    async load(id) {///src/App.vue?vue&type=style&index=0&lang.css
      const { filename, query } = parseVueRequest(id);
      if (query.has('vue')) {//说明它是vue组件的一部分
        const descriptor = await getDescriptor(filename);
        if (query.get('type') === 'style') {
          let block = descriptor.styles[Number(query.get('index'))];
          if (block) {
            return { code: block.content };
          }
        }
      }
      return null;
    },
    //id=C:\aproject\ webpack202205\vite522use\src\App.vue
    //code=此模块的源代码
    //此插件的核心功能就是把App.vue的原始内容进行编译成JS内容返回即可
    //id=/src/App.vue?vue&type=style&index=0&lang.css
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id);
      if (filename.endsWith('.vue')) {
        if (query.get('type') === 'style') {
          const descriptor = await getDescriptor(filename);
          let result = await transformStyle(code, descriptor, query.get('index'));
          return result;
        } else {
          let result = await transformMain(code, filename);
          return result;
        }
      }
      return null;
    }
  }
}
async function transformStyle(code, descriptor, index) {
  const block = descriptor.styles[index];
  const result = await compileStyleAsync({
    filename: descriptor.filename,//App.vue
    source: code,//h1{color:red}
    id: `data-v-${descriptor.id}`,
    scoped: block.scoped
  });
  let styleCode = result.code;
  const injectCode = [
    `let style = document.createElement('style');`,
    `style.innerHTML = ${JSON.stringify(styleCode)}`,
    `document.head.appendChild(style)`
  ].join('\n');
  return {
    code: injectCode
  };
}
//import "/src/App.vue?vue&type=style&index=0&lang.css"
async function transformMain(source, filename) {
  const descriptor = await getDescriptor(filename);//{template,script}
  const scriptCode = genScriptCode(descriptor, filename);
  const templateCode = genTemplateCode(descriptor, filename);
  const styleCode = genStyleCode(descriptor, filename);
  let resolvedCode = [
    styleCode,
    templateCode,//render
    scriptCode,//_sfc_main
    `_sfc_main.render=render`,
    `export default _sfc_main`
  ].join('\n');
  return {
    code: resolvedCode
  };
}
function genStyleCode(descriptor, filename) {
  let styleCode = '';
  if (descriptor.styles.length) {
    descriptor.styles.forEach((style, index) => {
      const query = `?vue&type=style&index=${index}&lang.css`;
      const styleRequest = (filename + query).replace(/\\/g, '/');
      styleCode += `\nimport ${JSON.stringify(styleRequest)}`;
    });
  }
  return styleCode
}
function genTemplateCode(descriptor, filename) {
  const content = descriptor.template.content;
  const result = compileTemplate({ source: content, id: filename });
  return result.code;
}
function genScriptCode(descriptor, filename) {
  let scriptCode = '';
  let script = compileScript(descriptor, {
    id: filename
  });
  scriptCode = rewriteDefault(script.content, '_sfc_main');
  return scriptCode;//const _sfc_main = {name: 'App'}
}
async function getDescriptor(filename) {
  const content = await fs.promises.readFile(filename, 'utf8');
  const result = parse(content, { filename });
  let descriptor = result.descriptor;
  return descriptor;
}
function parseVueRequest(id) {
  const [filename, querystring = ''] = id.split('?');
  let query = new URLSearchParams(querystring);
  return {
    filename, query
  }
}
module.exports = vue;