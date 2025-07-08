14:03
TRIS
waterfulHook中间某个不返回呢？ 
14:07
TRIS
121231212312123 

21


老师waterfall可以修改第二个参数吗 不能

14:14
shine
3 2 1呢？ 
shine
setTimeout 3000 2000 1000 

callback('err',…args). callback 可以传多个参数把，错误优先？ 

肉包子
有个 err吧 
shine
对对

//BAI 有一个有返回值就停止  Waterfull 没有返回值就停止 
//bail有返回就停止 ，waterfall不管有没有返回值，都会向下执行


沉默的木子
this._tap 那里的sync就这样写死吗 
14:53
清风
每个Hook的compiler都不一样，是不是应该写在外面 


super（） 
清风
应该是实例上的子方法覆盖了同名父方法，所以可以调子compiler 是的
沉默的木子
懂了 
ilark
这种代理创建的优势是什么？ 1.性能 用到才编译，不用不编译。 2 灵活 


15:03
韦林
const CALL_DELEGATE = function(...args) {
    this.call = this._createCall("sync");
    return this.call(...args);
}; 这个有没有 this 问题  ，使用箭头函数可以吗 CALL_DELEGATE  CALL_DELEGATE（） 的执行时机是什么时候 

有的



15:13
韦林
谁调用的他，this 就是谁 
接着奏乐，接着舞
每种hook的 CALLDELETE 都是独立的吗
父类里定义的，是一样的
现在这个CALLDELETE中的createCall 参数写死了 sync 
15:25
shine
tabIndex和this.args 
清风
老师this._x 哪里设置了 


韦林
触发钩子执行有三种方法
this.call   this.callAsync. this.promise  
接着奏乐，接着舞
this.content 调用了子类方法 子类方法又调用了父类方法 是的

等于绕了一圈回到父类中了，那可以在父类的this.content 直接调用父类方法吗 其实是可以的
沉默的木子
应该调用content哪里还有类型的区分 



15:39
shine
感觉就是组合了所有的回调函数
肯定是的 
韦林
deInit()  这一步的作用 

123
这个函数名anonymous 从哪里来的 
shine
未命名函数吧 


沉默的木子
如果tap注册的时候有一个只接受一个参数的话，生成的函数也就只有一个参数了？ 
接收几个参数是哪里定的


16:34
清风
把done弄成参数传进入 是的
shine
async也要改了这样？ 是的
韦林
onDone 是不是要区分 正常 和异常  



shine
应该要的  但是现在没考虑异常吧 
TRIS
callTap改了吗 


16:45
ilark
SyncHookCodeFactory类里面
刚才直接把this.callTapsSeries()改成this.callTapsSeries()了，这里不是应该判断一下的么？ 



vite 
韦林
会的

register  不调用call 也会执行把  tap 也是在调用了call   才执行的吧 是的
tap需要call

webpack5的联邦模块会讲一下么 会的

Dave
晚上讲什么  
react-query



可以对plugin1执行完毕 添加监听事件吗？ 
构造函数只接收一个工厂函数，为啥还要map来存储？ 


before 和 stage 不能同时存在吧 这个要做判断吗 
可以共存的
