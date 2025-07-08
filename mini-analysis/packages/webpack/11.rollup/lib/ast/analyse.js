const walk = require('./walk');
const Scope = require('./scope');
const { hasOwnProperty } = require('../utils');
/**
 * 对语法树进行分析,找到模块声明的变量和使用到的变量
 * @param {*} ast 模块的语法树
 * @param {*} code 模块的源代码 MagicString
 * @param {*} module 模块本身
 */
function analyse(ast, code, module) {
  let currentScope = new Scope({ name: '全局作用域' });
  //创建作用域链,为了知道我在此模块中声明哪些变量，这些变量的声明节点是哪个 var name = 1;
  ast.body.forEach(statement => {
    function addToScope(name, isBlockDeclaration) {
      currentScope.add(name, isBlockDeclaration);//把name变量放入当前的作用域
      //如果没有父亲，相当 于就是根作用域或者 当前的作用域是一个块级作用域的话
      if (!currentScope.parent || (currentScope.isBlock && !isBlockDeclaration)) {//如果没有父作用域，说明这是一个顶级作用域
        statement._defines[name] = true;//在一级节点定义一个变量name _defines.say=true
      }
    }
    //statement._defines = {};
    Object.defineProperties(statement, {
      _source: { value: code.snip(statement.start, statement.end) },
      _defines: { value: {} },//此节点上定义的变量say
      _modifies: { value: {} },
      _module: { value: module },
      _dependsOn: { value: {} }//此此节点读取了哪些变量
    });
    walk(statement, {
      enter(node) {
        let newScope;
        switch (node.type) {
          case 'FunctionDeclaration':
            addToScope(node.id.name);//say
            const names = node.params.map(param => param.name);
            newScope = new Scope({ name: node.id.name, parent: currentScope, names, isBlock: false });
            break;
          case 'VariableDeclaration':
            node.declarations.forEach(declaration => {
              debugger
              if (node.kind === 'let' || node.kind === 'const') {
                addToScope(declaration.id.name, true);//这是是一个块级变量
              } else {
                addToScope(declaration.id.name);//var
              }
            });
            break;
          case 'BlockStatement':
            newScope = new Scope({ parent: currentScope, isBlock: true });
            break;
          default:
            break;
        }
        if (newScope) {
          Object.defineProperty(node, '_scope', { value: newScope });
          currentScope = newScope;
        }
      },
      leave(node) {
        if (hasOwnProperty(node, '_scope')) {
          currentScope = currentScope.parent;
        }
      }
    });
  });
  //开始第2个循环 
  ast.body.forEach(statement => {
    function checkForReads(node) {
      //如果此节点类型是一个标识符话
      if (node.type === 'Identifier') {
        statement._dependsOn[node.name] = true;
      }
    }
    function checkForWrites(node) {
      function addNode(node) {
        statement._modifies[node.name] = true;//statement._modifies.age = true;
      }
      if (node.type === 'AssignmentExpression') {
        addNode(node.left, true);
      } else if (node.type === 'UpdateExpression') {
        addNode(node.argument);
      }
    }
    walk(statement, {
      enter(node) {
        if (hasOwnProperty(node, '_scope')) {
          currentScope = node._scope;
        }
        checkForReads(node);
        checkForWrites(node);
      },
      leave(node) {
        if (hasOwnProperty(node, '_scope')) {
          currentScope = currentScope.parent;
        }
      }
    });
  })
  //这是我们的第3个循环
  ast.body.forEach(statement => {
    Object.keys(statement._defines).forEach(name => {
      module.definitions[name] = statement;
    });
    Object.keys(statement._modifies).forEach(name => {
      if (!hasOwnProperty(module.modifications, name)) {
        module.modifications[name] = [];
      }
      module.modifications[name].push(statement);
    });
  })
}
module.exports = analyse