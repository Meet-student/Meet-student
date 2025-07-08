肖云
两个都配了呢？
肖云
mainFields和mainFiles哪个优先级高也 

最终要看如何查找一个模块??
require('sum');
//1.找到node_modules/sum目录
//2.找node_modules/sum下面的package.json文件。
//3.如果找到了package.json,那么会读取main字段对应的文件,结束
//4.如果找不到package.json,那么会找目录下面的index.js文件

123撤回了一条消息
123
没有依赖就是lodash 只有自己包的内容，没有安装别的依赖包？ 是的


20:21
123
vite 需要配置这些吗？ 
moment 
day.js

123
英文也不要了吗？ 
默认是英文

20:29
123
这个应该在npm run build 的时间 和npm run dev 的时候  费事是一样的吗？
 那是否也是hmr慢的原因呢？ 
 HMR
20:36
xxxx
var 是怎样的 

var a
window.a
一样的
感觉window 和var 很像。是不是this 在node 环境和浏览器环境都可以 

aaa
+1 

123撤回了一条消息
123
typeof exports ==="object" 还有可能是commonjs 不一定就是 esmodule 
exports是commonjs或者commonjs2

esmodule export import
exports



对export 
靜待雨落
一直以为node里 global 就是this    
靜待雨落
  global是什么  node里 
aaa
   library是优化相关的吗? 
123
老师你把main。js 会退下 你之前的 写的注释全没有了 

window global=window
node this=当前模块的导出对象

多个css文件想分开打呢 




e
都没用到吧 
LIKE-Anmy
组件库这种按需加载，单包打包都用gulp 吗？ webpack 、rollup 可以吗 
antd用的就是gulp
肉包子
外面那个 css 
接着奏乐，接着舞
看 main.css  
123
src/index.html 有id root吗 



.css 的. 没加？ 
aaa
是因为没有字吗 
ganlu
字颜色没变呀 
shine
变成class试试 
aaa
.css 没加. 好像 


ass试试 
aaa
.css 没加. 好像 
接着奏乐，接着舞撤回了一条消息
TRIS
webpack.config.js 
123
配置里面 
TRIS
里的 
aaa
config.js里 
接着奏乐，接着舞
编译 js的 时候 应该是找不到 #root 的吧 


config.js里 css 没加. 
TRIS
/**/*css少了个. 
接着奏乐，接着舞
动态创建一个 元素  赋值 id为 root 插入body 应该就可以了吧  
Dave
*包含点 



如何使用配置缓存
1. HTML文件不缓存，放在自己的服务器上，关闭自己服务器的缓存，可以保证用户获取到的HTML文件永远都是新的
2. JS CSS 图片等静态资源开启缓存，放存到CDN上，并且一般为了防止缓存不更新，会给文件名带上hash值
3. 为了并行加载不阻塞，还要把不同的静态资源分配到不同的CDN服务器上



hash 代表真个编译的hash,所有的代码块共享 一个hash



不应该是entry1 有个自己的contenthash吗？ 

21:59
这是一个最佳实践
总结就是js用chunk-hash，css用content-hash么 


22:03
shine
老师这些对应声明周期对应钩子都有哪些我要去那里看 
https://webpack.js.org/api/compilation-hooks/#afterhash

22:06
aaa
contenthash不会发生 js内容改变导致css的hash也改变的情况吗 不会
韦林
compiler.hooks.compilation.tap 这个是webpack 预先设置好的钩子吗？  是的
aaa
css的hash变了，js引入的地方文件名不会变吗 会的



那css的hash变了，js引用的css文件名也要变，为啥js的hash没变 
不是的
现在JS和CSS是分离的


shine
111 了解了 
shine
看其他类似功能插件的源码吧 


js中import css的情况 
shine
老师辛苦，晚安。 
shine
周日一天见 

老师，提起webpack优化，tree-shaking考的也挺多，后面会讲到么？ 
手写实现treeshaking



src\one.js
src_one_js.js