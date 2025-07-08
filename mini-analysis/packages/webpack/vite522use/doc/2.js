const { parse, compileScript, rewriteDefault, compileTemplate } = require('vue/compiler-sfc');
let content = `
<template>
  <h1>App</h1>
</template>
<script>
export default {
  name:'App'
}
</script>
`;
const result = parse(content, { filename: 'App.vue' });
let descriptor = result.descriptor;
let script = compileScript(descriptor, { id: 'App.vue' });
let res = rewriteDefault(script.content, '_sfc_main');
const res2 = compileTemplate({ source: descriptor.template.content, id: 'App.vue' });
console.log(res2);