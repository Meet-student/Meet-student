15:44
韦林
lib目录 对应 commonjs cjs.    es目录 对应 esmodule es吗 
没有这个对应关系
antd
lib commonjs
es esmodule
瑞思拜
commonjs 和 commonjs2 格式有啥区别呢? 
exports.xx = xx;
module.exports = xx;
韦林
amd + cjs  = umd吗 
正常来说
amd+cjs+全局=umd

老师，有点混淆webpack的publicPath是什么 
plugin-node-resolve 是干嘛的呀 
如果你没有resolve,rollup它是不知道如何查找第三方模块的

webpack rollup vite gulp


20:05
大头
拿过来name 到bundle 中是scope hosting  的概念？是的

瑞思拜
在有些无副作用函数前面有 /* PURE */  是什么意思呢? 是这个函数不会被打包进dist里面吗? 


/* PURE */ 
告诉 打包工具说我没有副作用，如果没有调用的话可以大胆删除



定义变量包含function 不 包含
瑞思拜
要是导入后重命名了呢 



能不能看这个那个ast结构写呀 老师。 
Dave
这个吧 
Dave
  
英剑คิดถึง
嗯呐 
aaa
每个操作都要把语法树forEach一遍 
TRIS
分不清语法树里的specifiers和identifier 
import xx specifiers
var name identifier 
20:28
shine
如果有as呢？ 




那如果有父级作用域呢 
大头
为什么在这个地方需要用walk 函数 但是 module。js  直接this.ast.body.forEach if else 呢？ 
20:51
大头
这个varrableDeclaration 哪里来的？ 
肉包子
语法树里的 
Dave
节点的type 
大头
import {name,age} from './msg';
function say(){
    console.log('hello',name);
}
say(); 中没有找到varrableDeclaration。呢？ 是say 函数体内吗？ 

把变量 都用 作用域链串起来 给 构造define那个对象 做准备吗 


1.第一遍
找到每个语句定义的变量
export var name = ' '; 定义一个name
2.第二遍
找到每个语句用了或者说读取哪些变量
say(); 读取了say这个变量
3.第三遍 保存变量定义的语句
module.definitions[name] = statement;



大头
为啥 赶脚分析2遍呢 
肉包子
第一遍分析 是找 导入导出的变量  这次是找声明的变量 
大头
没有identifier的 就是treeshaking 掉的 
小海
walk 是什么函数 
小海
1 
沉默的木子
addToScope 里_defines[name]=true,怎么不是define.values[name]呢 
LiuXi

shine
有点蒙了，1 2 3次遍历都干啥求总结下 
LiuXi
遍历这么多次干啥 
英剑คิดถึง
卡了？ 
shine
没有 



瑞思拜
Rollup 插件机制是咋实现的呀 
下节课讲rollup 插件

沉默的木子
声明的变量，使用的变量，在模块中保存使用的变量语句方便后面删除掉没使用变量的语句 
大头
this.definitions[name] = statement; 这里的statement 是 ast的一部分？ 是的
就是语法树 一级节

这里就是定义变量的那句代码
 

 
CommonJS module支持动态导入，就做不了tree shaking了吧？ 是的
es module支持tree shaking  
大头



webpack5不是也支持嘛 
aaa
删除在哪里来着 
韦林
CommonJS module支持动态导入，就做不了tree shaking了吧？ 为啥不支持。
var age = 'age';
setTimeout(()=>age='age2',3000);
require(age); 
shine
那个只是删除没用到的模块 
shine
没静态分析过程 

21:45
aaa
懂了 
肉包子
展开做的这个操作吧？ 




浏览的时候看见源码里居然手动写/*#__PURE__*/，一般这个是没人写，倒是经过polyfill转换之后，很多代码会自然带上这个标记。
既然这玩意开始有点用处，就稍微总结一下。其实除了这个标记，还有inline ,noinline之类的注释，这个就是给terser使用的。
terser
我们知道terser是个很强大的压缩工具，而为啥react没写pure呢，因为react使用的是googleclosure压缩工具，是个自己整的java压缩工具，跟一般的压缩方式并不相同，是一种破坏性压缩，在书写代码时需要注意某种规定，否则压缩出来的代码无法正常运行。但terser的压缩是非破坏性的，所以压缩效果上自然比google那个差点，但不容易出问题（反正vue代码比react代码少太多了）。 是不是react 的webpack 项目不该使用terser 呢 
ganlu
是不是发晚了一点 
ganlu
不知道老师走了没 
ganlu
哈哈哈哈 




20:49
ganlu
冲突的name是在哪里放到defines里面的 
20:53
大头
const conflicts = {}  冲突的对象是什么样子的我总感觉age 被覆盖了 
是的
记录哪些变量冲突了
age
age conflicts.age=true;
age conflicts.age=true;
20:59
TRIS
还要看看这个重名后是否跟已有的名称也冲突 
废物的点心撤回了一条消息
废物的点心
age$1   age   age    这样替换之后 会和第一个重复马 
