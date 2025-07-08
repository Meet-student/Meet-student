静态文件中间件匹配到文件后，就不会走其他中间件了吧？ 
不走了


 Failed to resolve module specifier "vue". 
 Relative references must start with either "/", "./", or "../".
 我们无法直接引入第三方模块
 只能直接 引绝对路径和相对路径


 20:07
路人乙
打包出来有多少行 
shine
录屏 
123
执行npm run vite 很快的 打包了还这么快  
因为打包用的是 esbuild 比webpack快好十几倍


20:13
路人乙
vite 能 替代 了 webpack 吗 
20:16
shine
也还是要用到AST吧 
20:20
aaa
是在讲vite使用方法还是在讲原理？ 
shine
原理 

前面在学rollup插件的时候
插件引擎，或者说这个插件系统我们是直接用的rollup提供的

plugin
插件的时候会有this, pluginContext对象，里面有resolveId的方法

vite官网说 vite插件是兼容rollup插件



importer 是index，js。importee 是 。/title 
TRIS
能不能写 
这是一种情况
path.resolve(path.dirname(importer), importee) 
难忘记nice
一个一个调 
难忘记nice
first类型 
沉默的木子
插件的resolveId是哪里来的 
插件自己编写的


build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => { 
  待解析的路径，原始路径
    中的path 是啥？ 

rollup插件
vite插件
esbuild插件    



勾子 都是rollup的 
沉默的木子
配置了别名也是绝对路径吧 
肉包子
importee.slice把 
灰太郎的故事
mac的路径也是/开头的，会有问题吧 
X
是不是应该先判断是绝对路径啊 
X
因为绝对路径也是 / 开头的 
123
11 行诗importee。slice 
21:16
TRIS
跟module.createRequire(importer).resolve(importee)有什么区别吗 


就是为了找package 中的module 对应的值 就是加载 这个路径 



21:30
shine
但因为返回了 又执行了一次解析了main.js内部的模块？又再进来解析vue？这样？ 
shine
老师这里能画个图么整个流程有点懵 
123
又开始resolve  
aaa
path重名了 
123
不需要解析依赖了 



是走完一个onResolve 就匹配一个onLoad了
并不是一下走下所有的onResolve，在执行onLOad 
走完所有的onResolve才有onLoad A

还是一个onResolved走一个onLoad B

123
第一步里面加载index.html的时候不是把内容给替换成了import '/src/main.js'吗？那html怎么返回展示的呢 
我们现在的目标是分析依赖，并非显示

我们唯 一目标就是知道我的项目中引用了哪些第三模块




难忘记nice
老师这写代码方式也太简单粗暴了 要是我肯定一步一步debuge写的 
难忘记nice
一气呵成做不到 
沉默的木子
要我一步一步都难…… 
TRIS
不够熟 


shine
这个拿到的vue文件，就是vite的预编译结果对吧？ 不是 取到的只是vue 的源代码的入口文件，并没有编译 



20:23
shine
想到个问题：一般读取package.json文件，config.js文件 是用require方法好评，还是用fs.readFile好呢？ 

其实如果 vite源码在这里的处理非常复杂的
let package = require('package.json');

读取json。用 readJson 比较方便 读出来就是json 可以直接取值了  
X
还有 outputJson 



import { createApp } from 'vue';
import { createApp } from '/node_modules/.vite/deps/vue.js';


shine
静态文件代理服务？ 
shine
vue这个引用没替换成deps中的 



main.js  vue
importer importee
修改importer吗 
123
加载的esm格式的vue。js 为啥还要esbuild 进行build 它build了啥？ 
node_modules\vue\dist\vue.runtime.esm-bundler.js只是入口源文件，它可能还会依赖别的文件，
vue.js

肉包子
build进行预编译到vite522文件夹下 
TRIS
浏览器请求资源文件应该不会生成node_modue文件夹吧，
改成/node_module/../vue.js这种目录根路径，是浏览器可以直接从硬盘读取文件？ 
浏览器会发请求/node_module/../vue.js给服务器，服务需要处理
肉包子
有个 静态文件的中间件 处理了 

20:40
路人乙
是替换还是重发请求 
替换
shine
打包的时候替换，就不会重新发送了
应该是响应的时候进行替换 



肉包子撤回了一条消息
路人乙
只是一次请求吗 是的
123
import vue from‘/node_module/xx’需要处理吧，浏览器不认识啊 
认识

123
send 就是交给静态文件中间件去load？
send不再走静态文件中间件了

send就是直接把数据发回浏览器里
express res.send();


20:53
shine
这里transformRequest
只针对预编译了的文件吧，如果这时候我请求的文件没被预编译呢？或者不存在呢会如何？ 

所有的JS文件都会走此transformRequest方法
/src/main.js
vue.js



这个pluginContainer 直接引rollup的 还要自己写，意思是代码思想借鉴吗？/ 
是vite自已模拟rollup实现的
21:08
肉包子
上节课一直没太理解，这个pluginContainer就是vite的插件引擎吧 
是的
TRIS
是的 


21:16
shine
有点懵 这个resolvePlugin和预解析的resolvePlugin是一样的吗？有啥区别吗？对这个插件的总体结构有点乱 
是一样的
没有区别

在预解析阶段，我们会创建一个插件容器 pluginContainer ,里面肯定 有插件数组  resolvePlugin
```js
async function esBuildScanPlugin(config, depImports) {
  config.plugins = [resolvePlugin(config)];
  const pluginContainer = await createPluginContainer(config);
}
```

在启动服务后
```js
async function createServer() {
  const config = await resolveConfig();
  config.plugins = [resolvePlugin(config)];
  const pluginContainer = await createPluginContainer(config);
}
```