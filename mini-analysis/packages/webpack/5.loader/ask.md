
那loader是怎么处理图片、css让它通过parser.parse转化的 
下节课讲

22:03
钟畅
inline是要怎么配置的 


韦林撤回了一条消息
韦林
pitch的就是loader的顺序

pitch  顺序是加载顺序 固定的吗还是和loader相反 
20:23
123
loader 不就是为了处理文件的吗？ 不读文件了 
不读了
靜待雨落
文件都不读取了  要loader的意义何在 

跳过不合适的文件？ 
后面我会手写style-loader的时候会用到这个方法和机制
提供一种跳过后面loader的机制呗 
shine
其实pitch才是webpack执行的前置，loader是逆序执行的后置？ 

前置 后置是针对normal来说的

感觉是说一个是执行顺序，一个是loader的种类

种类决定放置和执行顺序
pitch normal并不会决定顺序
inline pre post normal种类决定顺序
顺序决定后执行的时候，是固定的。肯定是先从左向右执行pitch,再从右向左执行normal

...
预编译嘛，判断是否有效？ 
normal才是真正 用来编译的吧 
它们都是编译 的一部分，是二个环节

啊哒lyc
loader搞前置正常行内后置都为了哪些场景而产生的 

20:41
shine
还有个env 
ilark
Loader里面的this怎么对应的？ 
loader里的this=loaderContext是一个唯一的对象
不管在哪个loader里，在哪个方法里它的this都是同一个对象loaderContext ，稍后会实现
韦林
提供预设 和插件机制  
韦林
预设是插件的集合 
韦林
loader this.getOptions() this怎么找到的使用bind吗 马上会讲 

那就是说可以通过loaderContenxt来记录数据嘛 可以的，后面会讲
20:59
ganlu
style和less的顺序是不能换的对吗 


那如果好多文件都解析成 style了嘛 
是的
所以说后面还会讲webpack优化，合并style
style-loader仅用在开发环境
生产环境用的mini-css-extract-plugin  把项目所有的样式合并提取并且合并压缩 
韦林
.less 变成 lessSource是在怎么处理的 
fs模块读取文件 readFile




.less 变成 lessSource是在怎么处理的 
shine
也是把less解析成抽象语法树再生成吧 
feng
多个less文件会合并成一个lessSource传给less-loader么？ 不会的，各是各的
废物的点心
是不是大多数文件编译，转换相关的  都是用ast 是的
啊哒lyc
框架里面的style scoped利用loader怎么编译的 我们后面讲一下，如何实现scoped style



行内！！ -！ ！来跳过不同类型的loader   在 配置里面loader  有没有这种机制 



21:20
钟畅
只要执行loader 链条，肯定 是先走pitch的
pitch函数什么时候被调用的 
21:25
shine撤回了一条消息
清风
是不是需要require 
shine
这样返回后 后面的less-loader不就不执行了么  是的，不执行了
靜待雨落
他自己的mormal也不执行了 是的，不执行了
123
style-loader 自身只走了pitch 是的
feng
好神奇，require还能这么用么？ 
清风
等于说创建了一个额外的module嘛 是的
ilark
其实就是模块的导出和引入吧 是的
shine
 这个顺序还是没懂，写的顺序是style-loader -> less-loader,
 那执行style-loader的pitch后面的less-loader不就不能执行了么 是的，不执行了
接着奏乐，接着舞
这个require是webpack中自定义的require方法嘛 这个require就是自己定义加载模块的require
清风
是的
如果你的loader的下一个loader返回的JS的话，我们需要JS代码的导出结果，就可以用pitch，通过require加载后面的loader和文件，得到导出的结果 
老师那就是说利用pitch帮我们来处理require js的逻辑，
避免了后置的loader返回是js代码（如果返回的是js代码，那么我们就用pitch来将它额外处理成为module吗）是的 

所以 less-loader 和 style-loader 的normal 都没有走 style-loader的pith 把之前2个loader的normal干的活自己干了  

less-loader的pitch没有定义，没有走，但是走了normal,normal帮我们把less源代码变成css 源代码
style-loader没有normal,走了pitch.

走了二轮，loader-runner走了二轮
第一轮走了
style-loader pitch ，直接返回了
require('!!less-loader.js!index.less');
第二轮走的
先读index.less文件，然后把less的源代码发给了less-loader的normal,把less变成了CSS，导出的是jS
 module.exports = 'css文本'




 
less-loader是内联是怎么看的呢 
内联是我们手工实现
只读内联，不去读配置的loader是!!前缀实现的
因为前缀是！！ 号吧 
韦林
这次为啥用pitch了。不用pitch. 不也能得到想要的结果吗 
得不到。这个时候只能用pitch
123
下节课 讲runLoaders 吗？ 
钟畅
那个正则前面为啥有-？ 
英剑คิดถึง
老师，再说一遍 为什么要这么处理？ 
当我们希望把两个左侧的loader级联使用的时候，就需要使用这种方式
因为less-loader返回的js文本,但我们style-loader要的是css文本
只能用 require加载这个js文件模块的块，得到导出结果才是css文本
...
为啥第一轮要走 pitch 呢  
只有使用pitch才能拦截这个加载过程。如果没有pitch直接读文件，无法拦截这个加载过程了
肉包子
第二轮是走的行内loader吧 
是的，走的是行内
行内 pre post normal并非loader本身的属性，关系 看你放的位置
如果你不把一个loader配置在项目中，我们不知道它是什么类型

ilark
为什么不直接返回字符串，而要module.exprots的形式导出？ 
想要通过reuqire得到里面的导出对象，那就需要在模块exports导出



不加就又走另外 的pitch了 
靜待雨落
加了 只走内联 
 
清风
感觉是说loader中无法使用webpack的require方法来加载js，是的
如果在normal阶段处理需要require到之前loader返回的js内容，所以利用pitch交给了webpack来处理require的逻辑 
是的
靜待雨落
是不是  第一轮走到pitch 有返回值 停止是的
  第二轮走的是pitch处理后的内联loader 
韦林
less-loader 返回的原来是js啊？ 
英剑คิดถึง
那需要每一个loader都写pitch来判断后续的loader返回的是不是js？ 
loader是可以相互配合的
loader要想组合，需要知道各自返回什么内容


韦林
我开发中用的 less-loader 返回的就是js啊！style-loader 用到pitch 来解决这个问题的吗 是的


这两个 loader 肯定是一个人写的 得配合使用 是的
shine
  
shine
这俩是一样的意思么 
123
感觉今天终于吧style-loader 和less-loader +pitch 这套弄明白了 




靜待雨落
不是吧  lessloader 要处理 less吧 
...
一样吧 
肉包子
不是吧  一个没有经过loader处理 
清风
是不是少了一个style-loader？ 
接着奏乐，接着舞
不一样吧 第二个要走loader 
韦林
less-loader 返回 字符串 style-less 直接处理不就行了吗。 感觉变麻烦了。 引入了 pitch 




111明白了 
韦林
这样是less-loader 可以独立使用 是的 
Dave
第一轮pitch 返回的不就是下面的内容么  
韦林
返回的是js的话 
接着奏乐，接着舞
less-loader里面不返回js 直接返回解析后的css呢 
shine
也不是不行，但不优雅 



老师还原下代码提交 
英剑คิดถึง
那个  require内联再说一下 老师  

Hedgehog
不处理成相对路径可以吗 
不行




也就是一旦初始化loader-runner就拿到了所有loader 是的
09:56
啊哒lyc
老师有个问题，webpack如何实现多线程编译，原理是什么。 
happy pack 
核心原理都是多进程 child_process
韦林
this.async().  =  this.callback 
this.async()返回的结果就 this.callback
shine撤回了一条消息
靜待雨落
剩下的请求 不是包含当前的吗 不包括


那索引什么时候自增呢 在我们执行的过程中

靜待雨落
loader 要是没有写pitch   那pitch是否执行也要复制true吗 不需要
靜待雨落
赋值 



异步不是能放会多个嘛 
钟畅
不需要 
shine
需要  自己执行就不知道几个了吧 
123
同步的调用和异步的调用参数是一样的，是的
同步调用了就自动走下个loader了
异步的也调用了 一步的调用就没有用了？ 
shine撤回了一条消息

shine撤回了一条消息
shine
异步要自己调用callback 
123
1 
靜待雨落
所有的loader的pitch 都走完了 什么时候读文件  感觉这个判断会一直加加 


清风
异步好像是说把执行的逻辑交给用户了，
调用this.callback就会内部调用runCallback 
韦林
同步模式就算是简单模式，返回一个参数 异步 返回多个参数 

默认是同步
同步的时候，可以用return 返回结果 ，也可以使用this.callback返回结果 
return  只能返回一个值，this.callback可以返回多个值

是不是同步和返回一个值还是多个值没有关系

如果是异步的话，你就只用this.callback返回值了，但返回一个值可以，返回多个值也可以

清风
老师如果读文件的话，类似于file-loader，图片直接用fs读吗 是的 一会实现一下
靜待雨落
就是所以 同步也能callback  返回值 
同步也可以调用this.callback



this.sync true false  是不是真的同步异步 代码执行顺序上有啥本质变化 


懂了 重复执行了 相当于同步已经继续往下了 
123
就是 同步的执行过了 
清风
而异步结束还得往下 


10:43
韦林
明白了，异步模式 代码还是卡死模式不会走下个loader迭代，
只是可以自己使用异步方法做一些需要的事情，runCallback 执行才能进入下一个loader迭代   
shine
所以薯片有点像co 
清风
不应该读到的是buffer吗 怎么是文件字符串 
英剑คิดถึง
toString了 



pitch的时候还没读文件 没有必然
靜待雨落
需要接收上个loader处理的结果吧  所以需要参数 

normal需要接收上一个normal或者说pitch返回的值，但pitch不需要

shine
pitchingcallback是啥 

这个post pre 是和执行顺序无关的吗 
清风
loader看起来难 听老师一讲感觉也不过如此.. 



执行顺序 不是loaderrunner处理的 是的
靜待雨落
迭代的是normal  为什么会走pitchingCallback 
shine
111 明白了 傻了 



感觉就是一个loaderContext去跑pitch和normal两个阶段   是的
ilark
图片，字体这种buffer的处理可以讲一下么？ 
肉包子
这个 runloader 应该对应 到工作流里的loader那一步吧老师，每个文件都会根据他的后缀，来一遍这样的流程 
runLoader是处于读取文件，使用loader进行转换代码那一步
reduceRight



这个 runloader 应该对应 到工作流里的loader那一步吧老师，每个文件都会根据他的后缀，来一遍这样的流程 
韦林
pitchingCalback 应该只执行一次把。  是pitch  有返回值触发的 是的
韦林
如果没有返回值最终走到哪里 
11:22
清风
对了，老师刚才说的getOptions 中context好像没有，这个是webpack传入的方法吗 
11:29
清风
老师loader this上的这些方法去哪里可以查看到，完全不知道从哪里查emit这些方法 




这个 runloader 应该对应 到工作流里的loader那一步吧老师，每个文件都会根据他的后缀，来一遍这样的流程 
韦林
pitchingCalback 应该只执行一次把。  是pitch  有返回值触发的 
韦林
如果没有返回值最终走到哪里 
11:22
清风
对了，老师刚才说的getOptions 中context好像没有，这个是webpack传入的方法吗 
11:29
清风
老师loader this上的这些方法去哪里可以查看到，完全不知道从哪里查emit这些方法 
ilark
那后面会讲webpack5么？ 

