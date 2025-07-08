20:36
shine
每一个魔板都这么做的话 name不就重复了？
这些都是模块内的局部变量 
X
少了个style处理  style是要特殊处理吗 马上讲
20:46
X
resolvePlugins 方法里面 …userPlugins在数组中的位置随便放吗  
定义好

沉默的木子
vite插件的钩子是只有resolveId和transform吗 

此处是插件的顺序
插件里有很多钩子函数
每个钩子函数对应不同的执行阶段


这个地方的顺序 和执行有关系吗？还是有点懵 记得是遍历调用的呀 
X
我理解是要先加载到模块代码才能去转换了 和 rollup那个插件钩子流程类似  
resolveId
X
因为transform 肯定是在 resolveId和 load之后的吧 
shine
是的 
shine
但这个顺序和执行有关系吗？我没听懂这里，老师说只能写在这个位置 难道有关？ 
沉默的木子撤回了一条消息
沉默的木子
听你这说的我也懵了… 
X
我去看下了流程 感觉也懵逼 
shine
完蛋 
shine
数组内部 这个插件的顺序的问题 
沉默的木子
可以就按照现在实现的插件讲下里面的顺序不 
shine
我大概理解了  谢谢老师 和X同学木子同学 


shine
如果一个vue文件引入很多个样式呢 
shine
也是一个一个拿进来？ 


Feature flags 
__VUE_OPTIONS_API__,
 __VUE_PROD_DEVTOOLS__ 
 are not explicitly defined. 
 You are running the esm-bundler build of Vue,
  which expects these compile-time feature flags to be globally injected via the bundler config
   in order to get better tree-shaking in the production bundle.


21:38
shine
所有key拿出来全局替换 



[@vue/compiler-sfc] compileScript now requires passing the `id` option.
Upgrade your vite or vue-loader version for compatibility with the latest experimental proposals.

HMR
SSR




老师辛苦！晚安 
shine
其实还有个疑问老师，这么多配置 我看以前的vue-cli是有个类似于schema的json格式验证的 现在咋没了？ 
shine
是因为有了ts就不需要对输入的json配置参数 校验了吗？我们经常遇到传入参数错误的情况。 


