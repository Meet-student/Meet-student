11:34
shine
预解析和预加载是吗？ 


preload 预告加载 优先级高，一定会用到，要尽快加载
prefetch 预先拉取 优先最低，不一定会用到，有可能会用到，闲的时候加载，不闲的时候 就算了


11:37
韦林
umi的路由 是不是都进行了代码分割，是的
然后就出现了，只有在点击的，时候才加载，然后出现了白屏的问题，体验很不好。是不是可以用 prefetch 优化呢 
可以的
接着奏乐，接着舞
这个插件还是要分析语法的吧  和之前学的babel插件原理一样 
不需要的

11:42
ilark
peload和prefetch确实好用，可惜兼容性不是太好 

ilark
自己写的话，不知道怎么找对应的钩子 
肖云
那个注释plugin里好像没有用到啊 是的，源码里根本就没有读这个注释

https://github.com/webpack/webpack/blob/2738eebc7880835d88c727d364ad37f3ec557593/lib/dependencies/ImportParserPlugin.js
https://github.com/webpack/webpack/pull/7056


14:11
肖云
那源码如何区分preload和prefetch呢 

//page1 page2 page2他们是入口代码块，是天然的分割点
page1.js   (name: page1)
page2.js   (name: page2)
page3.js   (name: page3)
因为lodash符合defaultVendors缓存组的条件，所以最终属于了defaultVendors进行单独的提取成一个单独的代码块
asset defaultVendors-node_modules_lodash_lodash_js.js 532 KiB [emitted] (id hint: defaultVendors)
//所有的import()方法调用也是一个天然的代码分割点
asset asyncModule1.js (name: asyncModule1)



default-src_module1_js.js
default-src_module2_js.js
defaultVendors-node_modules_jquery_dist_jquery_js.js
page1.js
page2.js
page3.js
defaultVendors-node_modules_lodash_lodash_js.js
asyncModule1.js

module1_js
module2_js.js
jquery_js
page1.js
page2.js
page3.js
lodash_js
asyncModule1.js


page1.js
jquery_js
module1_js
module2_js
asyncModule1.js
lodash_js

 page1.js
  asyncModule1.js



那是不是module1都被拆到了page1 page2里面 

