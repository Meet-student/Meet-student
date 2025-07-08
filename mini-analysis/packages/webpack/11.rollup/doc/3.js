//存放本模块导入了哪些变量
this.imports = {};
// 存放本模块导出了哪些变量
this.exports = {};
//存放本模块的变量定义语句
this.definitions = {};

//对于msg.js
this.exports = {
  'n3': { localName: 'name', exportName: 'name' },
  'age': { localName: 'age', exportName: 'age' }
};
//本模块中定义变量的语句
this.definitions = {
  name: `var name = ' ';`,
  age: `var age = 12;`
}
//对于main.js
this.imports = {
  'n': { importName: 'n3', source: './msg' },
  'age': { importName: 'age', source: './msg' }
};
this.definitions = {
  say: `function say(){}`,
}