const importModule = require('@babel/helper-module-imports');
const pathLib = require('path');
const babel = require('@babel/core');
const types = require('@babel/types');
const template = require('@babel/template');
const autoLoggerPlugin = ({ libName})=>{
    return {
        visitor: {
            //用来保证此模块内一定会引入一个日志的模块 ,如果源代码中已经有logger模块引入了，直接用就可以，如果没有就引用一下logger
            //state就是一个用来暂停数据的对象，
            Program(path,state) {
                let loggerId;
                path.traverse({
                    ImportDeclaration(path) {
                        const {node} = path
                        if (libName === node.source.value){
                            const specifier = node.specifiers[0];///如果层级比较 浅，直接取很方便
                            //const specifier = path.get('specifiers.0').node;//如果层级比较 深，get比较  a.b.c.d.e.f aPath.get('f')
                            loggerId=specifier.local.name;
                            path.stop();//跳出剩下的遍历 for break
                        }
                    }
                });
                //如果loggerId是undefined没有值，那说明源代码还没有导入此模块
                if (!loggerId){
                    //在Program这个路径下增加一个默认导入，导入logger模块，本地的变量名叫logger2
                   /*  loggerId=importModule.addDefault(path,'logger',{
                        nameHint: path.scope.generateUid('logger') //生成一个变量名 logger 内部会保证同一作用域内生成的变量名不会重名
                    }).name; */
                    loggerId = path.scope.generateUid(libName)
                    //const importDeclaration = template.statement(`import _logger2 from 'logger'`)();
                    const importDeclaration = types.importDeclaration(
                        [types.importDefaultSpecifier(types.identifier(loggerId))], types.stringLiteral(libName));
                    path.node.body.unshift(importDeclaration);
                }
                //这样创建一个节点很长，能不能简单点?  sum(a,b,c,d,f){a.b.c.d.f()}
                //state.logger = types.expressionStatement(types.callExpression(types.identifier(loggerId), []));
                state.logger = template.statement(`${loggerId}()`)();
            },
            //这是插件能够识别的一种语法
            'FunctionDeclaration|ArrowFunctionExpression|FunctionExpression|ClassMethod'(path, state){
                const {node} = path;
                if(types.isBlockStatement(node.body)){
                    //节点属性都是节点
                    node.body.body.unshift(state.logger);
                }else {
                    const newBody = types.blockStatement([
                        state.logger,
                        types.returnStatement(node.body)
                    ]);
                    //path.get返回的都是路径
                    path.get('body').replaceWith(newBody);
                }
            },
            /* FunctionDeclaration(path, state){
                console.log(state.logger);
            },
            ArrowFunctionExpression(path, state){
                console.log(state.logger);
            },
            FunctionExpression(path, state){
                console.log(state.logger);
            },
            ClassMethod(path, state){
                console.log(state.logger);
            } */
        }
    }
}
//希望能够扫描所有的console.log warn error debug 自动给方法添加参数 log所在的文件名 行 列
let sourceCode = `
  function sum(a,b){
      return a+b
  };
  const minus = (a,b)=>a-b;
  const multiply = function(a,b){
      return a*b
  }
  class Calculator{
      divide(a,b){
          return a/b;
      }
  }
`;

const result = babel.transform(sourceCode, {
    plugins: [autoLoggerPlugin({libName:'logger'})]
})
console.log(result.code);


/* 
import logger from 'logger';
function sum(a, b) {
    logger();
    return a + b
};
const minus = (a, b) => {
   logger();
   return a - b;
};
const multiply = function (a, b) {
    logger();
    return a * b
}
class Calculator {
    divide(a, b) {
        logger();
        return a / b;
    }
} */