
import { createFilter } from 'rollup-pluginutils';
import MagicString from 'magic-string';
import { walk } from 'estree-walker';
import path from 'path';
function commonjsPlugin(options = {}) {
  const defaultExtensions = ['.js', '.jsx'];
  const { exclude, include, extensions = defaultExtensions } = options;
  const regExp = new RegExp(`(${extensions.join('|')})$`);
  const userDefinedFilter = createFilter(include, exclude);
  const filter = id => regExp.test(id) && userDefinedFilter(id);
  return {
    name: 'commonjs',
    async transform(code, filename) {
      if (!filter(filename)) return null;
      //this.parse=acorn ast语法解析库
      //code=module.exports = 'catValue'
      //filename=cat.js
      const result = transformAndCheckExports(this.parse, code, filename);
      return result;
    }
  }
}
function transformAndCheckExports(parse, code, filename) {
  const { isEsModule, ast } = analyzeTopLevelStatements(parse, code, filename);
  if (isEsModule) {//说明当前模块是一个es module
    return null;//什么都不做
  }
  return transformCommonjs(code, filename, ast);
}
function transformCommonjs(code, filename, ast) {
  const ms = new MagicString(code);
  let moduleExportsAssignment = null;
  let namedExports = [];
  walk(ast, {
    enter(node) {
      switch (node.type) {
        case 'AssignmentExpression':
          if (node.left.type === 'MemberExpression') {
            const keys = getKeyPath(node.left);
            if (keys === 'module.exports') {
              moduleExportsAssignment = node;
            } else if (keys.startsWith('module.exports')) {
              namedExports.push({
                keys, node: node.left
              });//module.exports.age=12;
            }
          }
          break;
        default:
          break;
      }
    }
  })
  //module.exports = 'yy' => var cat = 'yy'
  //cat = 'yy'
  //var cat = 'yy'
  //export default cat;
  if (moduleExportsAssignment) {
    const { left } = moduleExportsAssignment;
    const exportName = path.basename(filename, path.extname(filename));//cat
    ms.overwrite(left.start, left.end, exportName);//module.exports=>cat
    ms.prependRight(left.start, 'var ');
    ms.append(`\nexport default ${exportName};\n`);
  }

  if (namedExports.length) {
    let exportNames = [];
    for (let i = 0; i < namedExports.length; i++) {
      let { keys, node } = namedExports[i];
      let exportName = keys.slice(15);
      exportNames.push(exportName);
      ms.overwrite(node.start, node.end, exportName);//module.exports=>cat
      ms.prependRight(node.start, 'var ');
    }
    ms.append(`\nexport {${exportNames.join(',')}};\n`);
  }
  console.log(ms.toString());
  return {
    code: ms.toString()
  };
}
function getKeyPath(node) {
  //module.exports.a.b=1;
  //parts=[module,exports,a,b]
  const parts = [];
  while (node.type === 'MemberExpression') {
    parts.unshift(node.property.name);
    node = node.object;
  }
  parts.unshift(node.name);
  return parts.join('.');//module.exports
}
function analyzeTopLevelStatements(parse, code) {
  const ast = parse(code);
  let isEsModule = false;
  for (const statement of ast.body) {
    switch (statement.type) {
      case 'ExportDefaultDeclaration':
        isEsModule = true;
        break;
      case 'ExportNamedDeclaration':
        isEsModule = true;
        break;
      case 'ImportDeclaration':
        isEsModule = true;
        break;
      default:
        break;
    }
  }
  return { isEsModule, ast };
}
export default commonjsPlugin;
