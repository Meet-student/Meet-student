dynamicImportPolyfill('./title-1c517c5b.js', import.meta.url).then(result => console.log(result.default));
/**
 * 
 * @param {*} filename 导入的模块或者 说文件
 * @param {*} url  当前的模块路径
 */
function dynamicImportPolyfill(filename, url) {
  console.log(filename); //./title-1c517c5b.js
  console.log(url);     //http://127.0.0.1:8080/index.js
  return new Promise((resolve) => {
    let script = document.createElement('script');
    script.type = 'module';
    script.onload = () => {
      resolve(window.mod);
    }
    const absURL = new URL(filename, url).href;
    console.log(absURL);//http://127.0.0.1:8080/title-1c517c5b.js
    const blob = new Blob([
      `import * as mod from "${absURL}";\n`,
      `window.mod = mod;\n`
    ], { type: 'text/javascript' });
    script.src = URL.createObjectURL(blob);
    document.head.appendChild(script);
  });
}