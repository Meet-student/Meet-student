20:49
shine
emitAfter 和done 有啥区别老师 

emitAfter

done 


emit
AsyncSeriesHook
Executed right before emitting assets to output dir. 
在向输出目录之前写入文件前触发
afterEmit
AsyncSeriesHook

Called after emitting assets to output directory.
把资源文件写入到输出目录之后触发/调用

done
是编译的最后一个钩子里
Executed when the compilation has completed.

<script src="https://cdn.bootcss.com/jquery/3.1.0/jquery.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js"></script>



  21:42
肉包子
importModules includes吧 
shine
地址这个参数 还没用到 
feng撤回了一条消息
ilark
webpack 十级研究者才能写出这个插件吧，好多内部属性方法的调用 
肉包子
这个应该是 要做 module.exports=$ 导入全局变量这一步感觉 
21:49
shine
知识点有点多 哈哈哈 努力吸收中 


35行 是不是 项目中用到的才需要转换成 外部模块，
假如在new插件的时候配置了，但是项目中没用，这里也会创建外部模块 



ilark
import throttle from 'lodash/throttle' 这种应该不需要外链吧 不需要
因为这样的话只会打打一个方法
shine
是不是哪个回调没执行呢 
feng
是怎么让webpack打包不打包lodash代码的？ 
