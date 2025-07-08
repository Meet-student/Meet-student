remote 的filename呢？有用吗 


host remote能互相访问远程组件吗 




使用的远程组件是源文件没有压缩吧 
肖云
要起两个服务，什么场景会用到呢，两个代码库？ 
shine
给个name 
Dave
微服务可以用到  

使用模块联邦实现微前端

难忘记nice
不需要启用两个服务吧，线上部署的项目应该可以直接远程用的吧 
需要的
Hedgehog
如果互相包含，会死循环吗？ 不会
肉包子
这个模块联邦 很像 微前端  


10:32
钟畅
生产要咋部署  是要启动两个node服务 
是的
但不一定是两个node服务
nginx
单独构建
单独发布
相互依赖
shine
你这是2个项目 打包完就可以了，分别部署 
Dave
各起各的，个部署个的 
英剑คิดถึง
使用本地备份是啥意思 


先启动remote服务器
再启动host
host
index
import('./bootstrap');
就是为先加载 remote/remoteEntry.js react17
再加载bootstrap.js
试图访问react,优先从remoteEntry提供的模块中获取react
但是发现remoteEntry提供的remote17
但是自己的项目中用的是react18.不能用，版本检查不通过，只要用自己react





那是不是localhost：3000就要改成远程地址了 
Hedgehog
那影响组件的使用吗 
韦林
  本地都已经安装了，还使用使用共享的意义是啥 
避免重复加载
基本上所有的文件都在服务器上
host
先加载  3000/remoteEntry.js
一般来说加载完3000/remoteEntry.js,会加载3000/react.js
然后如果片本兼容的话
8000/main.js
客户端就不需要再拉取 8000/react.js

肖云
感觉和组件库类似啊，组件库还能有版本号，模块联邦没有 
Dave
如果几十个服务的话可以还有一部分共享 
Dave
host remote 不互相引用可以共享 组件类库不 
肖云
remote和remote之间可以共享吗 可以的

shine
按照这个思路，我可以把公共组件用模块联邦的方式去给别人使用，这样别人就不用安装不用管更新了，反正就用我提供的就是最新 是不？ 

10:48
肖云
也很像iframe 
shine
配置中的吧 
shine
嗷嗷嗷 就是说 对外提供也要自己首先加载解析好。 
大宝
看看node——modules中的版本一致吗  
接着奏乐，接着舞
有好像没下载 
Hedgehog
shared在host跟remote都要配置吗 
shine
发布线上之后，如果提供方的版本变化了，我能感知到吗？会报错？ 
ilark
react、react-dom打包成单独的文件这个配置文件是哪里配置的？ 

这个我们马上讲，代码分割

http://www. peixun.com/strong/html/103.13.splitChunks.html



一个host引了两个remote，remote A和remoteB能共享吗 
feng
这样的共享模块跟把公共组件发布成npm包 哪个更好一点呢？ 
Hedgehog
1 
韦林
react react-dom 如果不在share 配置 是不是不会单独打一个chunk 
会的

