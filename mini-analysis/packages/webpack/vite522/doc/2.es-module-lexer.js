const { init, parse } = require('es-module-lexer');
let sourceCode = `import { createApp } from 'vue'`;
(async () => {
  await init;//先等初始化完成
  const [imports, exports] = parse(sourceCode);
  console.log(imports);
  console.log(exports);
})();