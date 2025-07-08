const pathLib = require('path');
const babel = require('@babel/core');
const types = require('@babel/types');

function transformType(type) {
    switch (type) {
        case 'TSNumberKeyword':
        case 'NumberTypeAnnotation':
            return 'number';
        case 'TSStringKeyword':
        case 'StringTypeAnnotation':
            return 'string'
    }
}
const tscCheckPlugin = () => {
    return {
        pre(file) {
            file.set('errors', []);
        },
        visitor: {
            AssignmentExpression(path, state) {
                const errors = state.file.get('errors');
                debugger
                //获取左侧的变量的定义 path.get('left')=age=>age变量定义
                const variable = path.scope.getBinding(path.get('left'));
                const variableAnnotation = variable.path.get('id').getTypeAnnotation();
                const variableType = transformType(variableAnnotation.typeAnnotation.type);//TSNumberKeyword=number
                const valueTypeAnnotation = path.get('right').getTypeAnnotation();
                const valueType = transformType(valueTypeAnnotation.type);
                //获取左侧的变量的类型
                //获取右侧的值的类型
                //判断变量的类型和值的类型是否一样
                if (variableType !== valueType) {
                    Error.stackTraceLimit = 0;
                    errors.push(
                        path.get('init').buildCodeFrameError(`无法把${valueType}赋值给${variableType}`, Error)
                    );
                }
            }
        },
        post(file) {
            console.log(...file.get('errors'));
        }
    }
}

let sourceCode = `
  var age:number;
  age = 12;
`;

const result = babel.transform(sourceCode, {
    parserOpts: { plugins: ['typescript'] },
    plugins: [tscCheckPlugin()]
})
console.log(result.code);
