SyntaxError: Cannot use import statement outside a module
commonjs
esmodule


async 钩子还可以返回解析为相同类型值的Promise；否则，钩子将被标记为sync
first 如果有几个插件实现了这个钩子，钩子会按顺序运行，直到钩子返回一个非null或未定义的值
sequential 如果几个插件实现了这个钩子，那么它们都将按照指定的插件顺序运行。如果一个钩子是异步的，那么这种类型的后续钩子将等待当前钩子被解析
parallel 如果多个插件实现了这个钩子，那么它们都将按照指定的插件顺序运行。如果一个钩子是异步的，那么这类后续钩子将并行运行，而不是等待当前钩子

所有的插件原理基本类似
可以把webpack插件和rollup进行对比
webpack  sync async 
async 异步钩子

rollup 中的first类似于webpack中的bail
sequential 串行的，一个一个来
parallel 并行 一起来

tapable  rollup 
sync/async sync/async
bail     first
series sequential
parallel parallel




options
buildStart
resolveId index.js
load index.js
transform index.js

resolveId ./title.js
resolveDynamicImport ./hello.js
resolveId ./hello.js
load ./title.js
load ./hello.js
moduleParsed index.js 解析完成
transform ./title.js
moduleParsed ./title.js解析完成
transform ./hello.js
moduleParsed ./hello.js解析完成
buildEnd 构建结束 
closeBundle 关闭Bundle
closeWatcher关闭观察者/监听者



大头撤回了一条消息
大头
为啥走了2遍勾子 closeWatcher 
难忘记nice
options的执行顺序会按照plugins的顺序一一执行吗 是的
22:01
大头
那不是到了resolveid 不走load 了吗 
不管resolveid如何返回，都会走load

沉默的木子
后面的插件钩子不走了是啥意思 

 
大头
123 
大头
可是resolveid 有返回值了 不是不走后面的勾子了吗 
如果resolveid 有返回值了，就不走后面的resolveid钩子了
但是还要走下一步的load钩子
LIKE-Anmy
牛皮 
沉默的木子
就是第一个插件的resolveId 返回了东西，第二第三插件的resolve ID不走了？ 是的
其实是这个模块不走了

阿轩
就是自己写的插件 可能会影响别的插件执行吗 肯定 是的



就是第一个插件的resolveId 返回了东西，第二第三插件的resolve ID不走了？ 
阿轩
就是自己写的插件 可能会影响别的插件执行吗 
大头撤回了一条消息
大头
不走别的插件的resolveid勾子了 



09:41
英剑คิดถึง
虚拟模块就是三方模块吗？ 
不是的
本地模式，第三方模块，他们都是真实的模块，都是在硬盘上真实存的话
虚拟模块 其实在硬盘根本就没有此模块




09:46
难忘记nice
skipSelf的值是什么啊 
skipSelf: true 是否跳过自己

Dave
是undefind 吧 
阿轩
外部模块是指配置了external 选项中的包吗 
不是的。外部模块统一指那些本地模块
./
/
../开头叫本地模块
除此之外全是外部模块
09:54
肉包子
isEntry 是rollup 给加到选项中的吗 是的
X
PROXY_SUFFIX 等于说是自己定义的 可以随便定义成任意字符串吗 是的
X
entryId 写错了 d 小写 
肉包子
我们 构建的这个模块 就是 虚拟模块吗 
废物的点心撤回了一条消息
X
这种虚拟模块在什么应用场景下呢 


10:09
X
那等于resolveId里面如果调用resolve 方法 一般都要 跳过自己是吧 是的
shine
1 
10:16
TRIS
hasDefaultExport是什么东西 


rollup  webpack
module   module
chunk     chunk
Bundle   Compiler
输出阶段
Bundle   asset/文件



11:36
shine
这里可以用虚拟模块吗？ 
11:45
大头
浏览器里面没有import。meta。url？ 

11:36
shine
这里可以用虚拟模块吗？ 
11:45
大头
浏览器里面没有import。meta。url？ 


大头
不会应该打印logger 吗？ 怎么成了url 呢 




11:36
shine
这里可以用虚拟模块吗？ 可以
11:45
大头
浏览器里面没有import。meta。url？ 有的有，有的没有，兼容性问题
大头
不会应该打印logger 吗？ 怎么成了url 呢 因为现在我们的代码。默认导出的就是地址，而非模块的内容
大头
chrom  控制台直接打印报错 
大头
chorme 
大头
import。meate。url 说明什么呢？ 说明是动态倒入呢 还是 虚拟模块倒入？ 
import.meta.url不能说明什么
它就指向当前的脚本路径。不管什么样的脚本，都有这样的属性
大头
1 
大头撤回了一条消息
TRIS
多 了个右括号 
肉包子
meta点的那个 rollup属性 是rollup规定的吗 
是的
当你向输出目录里生成一个新的文件的时候，会得到这个文件的hash值，也就是referenceId
然后可以通过

import.meta.ROLLUP_FILE_URL_${referenceId};
引用这个路径 
http://127.0.0.1:8080/logger.js



11:59
肉包子
1 
Dave
可以把路径的内容读取出来，再导出不 
shine
1 
肉包子
1 
shine
路径就是打包的模块id对应的地址 
大头
加载logger  导出logger的路径 
X撤回了一条消息
X
 load 的含义是加载模块内容 现在导出的是路径 那就是模块内容是一个路径了 这样理解对吗 
 是的
 load的含义 就是读取模块内容
 现在模块内容 `export default 文件路径`

rollup 内部看到 import.meta.ROLLUP_FILE_URL_ 就 变成 new URl 那个了 
是的
会把import.meta.ROLLUP_FILE_URL_XX 替换成new URL

```js
return `
let url = import.meta.ROLLUP_FILE_URL_${referenceId};
import(url).then(result=>console.log(result))
export default url;
`;
```



14:11
shine
conplation.assets 
14:14
shine
这个emit发射的内容，是直接到了物理目录，还是放在了打包结果的内容中，等下一起输出？ 

emit发出的内容肯定是先存在bundle里的，最后统一写入硬盘

Error: 'default' is not exported by src/cat.js, imported by src/index.js
export default 
import xx


var cat = 'catValue';

console.log(cat);

hine
导入语句会不会有干扰，就是我即用import *** from *** 
也用const xxx = require('xxx') 
TRIS
不可能 




万一别人在函数里 用commonjs的require咋办。？那不是转换不了 
14:51
肉包子
57 
X
57 
shine
有点迷茫的是  我怎么知道我要实现的功能要在哪个流程进行改写  

80%插件就是操作 resolveId load transform

module.exports.home = 'beijing';
module.exports.age = '12';

var home = 'beijing'
export {home}


15:23
沉默的木子
设置的别名呢 
大头
哪个是node 自己的方法 
require就node的方法



this.resolve不是调用其他插件的resolveId吗 