## 如何调试webpack源码


### 1.通过chrome调试

```js
node --inspect-brk ./node_modules/webpack-cli/bin/cli.js
```

## 2.通过命令行调试



shine撤回了一条消息
shine
直接执行webpack 和npm run XX有不同吗老师 

直接执行webpack
找的是全局的webpack命令
C:\Users\zhangrenyang\AppData\Roaming\npm\node_modules 下面的webpack.cmd

npm run xxx
找的是当前项目下的package.json中的scripts里的命令
然后再找当前项目下面的
C:\aproject\ webpack202205\4.flow\node_modules\.bin\webpack.cmd

21:20
清风
应该是一个是全局环境变量一个是当前node_modules下的bin脚本执行. 

22:04
清风
老师每次改变都调用watch，这样不是多次watch了吗 


webpack plugin 执行顺序 就是 从上到下 先写那个就先执行哪个了 
钩子的触发是有有顺序的
但是插件的顺序是不一定的




20:16
清风
老师Webpack内部都是同步读取吗 不是的，是异步的

英剑คิดถึง
老师，什么时候用loader，什么时候用plugin呢？ 
loader只有一个作用，就是转换源码的
而plugin的使用贯穿整个编译的过程

靜待雨落
loader相当于英语翻译成汉语  起翻译的作用  plugin可以完成某种功能  我是这么理解的 
TRIS
loader是编译过程的，plugin啥阶段都可以 

webpack只认JS和JSON，其它类型的文件都不认 图片 图标 css less sass 

21:39
shine
entryModule和module 分别是入口文件和依赖文件吗？ 
entryModule 入口文件对应的模块
module 依赖的文件对应模块
文件和模块之间是什么关系 ？
一个文件会对应一个模块


shine
第8点这里 


老师acorn中有类似babel generator的东西吗 



acorn 本身本没有遍历和生成的功能
后面我们会自己写
rollup需要手写遍历生成语法对的过程
acorn-walker @babel/traverse

acorn就等同于babel/parser
都是把源代码转成语树的工具
