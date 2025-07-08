


WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/


设置变量的方式
--mode=development


使用有两个地 方
一个是webpack.config.js配置文件中，读取的node的配置的环境变量，可以通过 cross-env key=value
然后我们可以使用这个变量来配置webpack中的mode属性
webpack中的mode会影响和决定打包的源代码中的 process.env.NODE_ENV

process.env.NODE_ENV=>development
仅仅是一个字符串替换，在浏览运行代码的时候并没有process这样的对象

09:58
靜待雨落
先设置环境变量后执行webpack   和先执行后设置环境变量 结果是一样的吗    
设置环境环境肯定执行webpack前设置 


手动设置node的环境变量有啥用 就为了传值给webpack取用嘛 

是的
手工设置node环境变量之后，可以在webpack配置文件中读取此变量，动态根据环境变量调整webpack配置


procss 是node 层级的

process.env.NODE_ENV 是node的环境变量
我赌你的枪里没有子弹
mode 设置的环境变量 会影响 webpack.config内的 process.env.NODE_ENV吗 不会的
--mode --env都不会影响 node环境中的process.env.NODE_ENV

2426
运行的时候，两种设置的方法，是那个在后面那个生效吗？ __env   __mode 

webpack --env=production --mode=development

node NODE_ENV  和 webpack —mode 是不是 更推荐node  

靜待雨落
有个测试的环境.env.qa文件    打包设置cross-env NODE_ENV = QA  webpack里面的mode会是什么 不会是QA吧 
一般来说如果你有一个.env.qa文件


cross-env NODE_ENV = QA

.env.qa
读取里面的环境变量
DB=测试环境数据库
设置环境变量


需要接收参数用函数，如果你不需要接收参数就用对象

-配置文件是对象和函数的区别 那个好，平常脚手架项目好像都是对象 
韦林
就 对象和 函数 函数能拿到环境变变量 ，看你需求 
韦林
推荐 node  模式，所有 就是 对象了没必要函数了 
路人乙
vue 中.development.env和.production.env是咋读到的 




10:13
路人乙
.env 注释是用#的吧 

韦林
.env 是个好东西，最先用的应该是后端。
test  dev pro local  各种环境配置的保存 很方便  不然全都 node命令行传不方便 
畅
那和文件定义重名呢 

DefinePlugin
Conflicting values for 'process.env.NODE_ENV'


10:24
王小玟
start 脚本不能传cros-env吗 



10:33
王小玟
style-loader就是把css通过style标签放到indexhtml 
是的
路人乙
有的时候sass 不好安装是啥原因 

我赌你的枪里没有子弹
现在好像推荐使用dart-sass替代node-sass 就好安装了 
2882
sass 不同版本要对应node不同版本。 
sass 老版的后缀
scss 新版本的后缀
听听听
所以node-sass是干啥的 
负责把sass编译 成css
原始的sass是用ruby,本地安装的话需要编译
node-sass是用node写的，比较 好安装


10:42
a
repeat 
10:50
王小玟
@ import "~amodule"  也行吧？ 
ganlu
~不用配置是吗 这css-loader提供的默认功能，不需要配置
css 中的用法把 

~ 只能css 文件识别 ？ 是的
韦林


importLoaders Allows to enables/disables or setups number of loaders applied before CSS loader for @import at-rules



老师意思是说引入css文件时，该文件额外被几个已经处理过的loader吗 
靜待雨落
是下面的lodader  走几个 
韦林
导入 @import .css. .less   如果不分开设置，那就统一走就可以 
靜待雨落
如果设置2  loader执行的顺序是什么  
靜待雨落
还是 那个规则 从下往上 从右向左 
韦林
loader 不是从下到上，从左到右吗。

到 css-loader 其他loader 不都执行完了，怎么在排除别 loader? 
执行到css-loader的时候 ，处理的是index.css这个文件
设置是如何处理引入的base.css
这个时候 base.css还没 经过任何处理
[
  loader1,loader2
]
loader永远都是从下往 上，从右到左的
靜待雨落
要是个负数呢  不会再往前走那 
最小就是0了
靜待雨落
吧 
