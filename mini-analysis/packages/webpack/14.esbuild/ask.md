

- esbuild-plugin-env: A plugin that exports the current environment as a module.


main.js:1:21: ERROR: Could not resolve "env"



16:08
韦林
vite 中 rollup esbuild 在里面的各自职能是什么 
vite里
开发阶段用esbuild编译 
上线生产阶段用rollup编译 

16:11
大头
开发构建 esbuild。生产打包rullup？ 
大头
我们现在是干嘛 
我们在学习如何编写esbuild插件

韦林
wepack有没有预编译 没有
，webpack开发提速可以 webpack+esbuild 
esbuild-loader



16:19
大头
webpack 的hard Sourcewebpackplugin 也是类似预编译的 吧？  
hard Sourcewebpackplugin 现在已经废弃了，因为webpck5已经内置

韦林
拦截 "env"   返回环境变量相关功能和配置 
靜待雨落
resolveiD  load ma  
16:30
大头
这样就是拿到了process.env 
肉包子
file 是esbuild规定的 那 这个 env-ns 是我们自己随便定的吗 



大头撤回了一条消息
韦林
filter 就是文件名查找  namespace 是分类查找 
大头
什么时候把 username 写入环境变量的？ window内置
张仁阳
http://www. peixun.com/strong/html/103.16.vite.2.html 
X
esbuild 插件 不区分编译时和输出时吗  不区分
esbuild插件功能非常非常非常有限



filter和namespace是或关系吗 是且的关系
都满足才会进入
filter&&namespace 

X
那esbuild 如果要输出额外文件 能实现吗 类似rollup 的 emitFIle 
go语言 类似于C语言 快

