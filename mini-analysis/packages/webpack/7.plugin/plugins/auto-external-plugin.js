
const { ExternalModule } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = Object.keys(this.options);//['lodash','jquery'] 可以外链处理的模块
    this.importedModules = new Set();//本项目真正用到的外部模块
  }
  apply(compiler) {
    debugger
    //当我们创建模块的时候，要先创建一个模块工厂,创建好模块工厂后会触发
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.parser//parser hookMap
        .for('javascript/auto')//获取JS对应的hook
        .tap('AutoExternalPlugin', (parser) => {//acorn
          //解析器会把index.js从源码转成抽象语法树，然后解析抽象语法树，遍历语法树，遍历到不同类型的节点后会触发钩子
          //import $ from 'jquery';
          parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
            //如果此source可以解析成外部模块的话，就添加importedModules
            if (this.externalModules.includes(source)) {//source = jquery 模块名=jquery
              this.importedModules.add(source);
            }
          });
          //require('lodash')   CallExpression 
          parser.hooks.call.for('require').tap('AutoExternalPlugin', (expression) => {
            let value = expression.arguments[0].value;
            if (this.externalModules.includes(value)) {//source = lodash 模块名=lodash
              this.importedModules.add(value);
            }
          })
        })
      //2.介入改造和生产模块的流程,如果是外部模块的话，不再走正常的模块生产逻辑，而是走外部模块的生产逻辑
      normalModuleFactory.hooks.factorize.tapAsync('AutoExternalPlugin', (resolveData, callback) => {
        const { request } = resolveData;//先获取请求的资源 request jquery lodash 
        //这是在webpack生产模块的时候进来的，如果能走到这，肯定是用到了
        if (this.externalModules.includes(request)) {
          let { variable } = this.options[request];//this.options.jquery
          //如果这是一个外部模块，就直接 创建一个外部模块返回了
          callback(null, new ExternalModule(variable, 'window', request));
        } else {//如果不是外部模块，直接调用回调，不传值，那么就会正常生产模块的逻辑
          callback(null);// NormalModule
        }
      });
    });
    compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
      //alterAssetTags用来向输出的HTML文件中插入或者 修改标签 style css js
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin',
        (htmlData,
          callback) => {
          debugger
          Object.keys(this.options)
            .filter(key => this.importedModules.has(key))
            .forEach(key => {// lodash ,jquery
              htmlData.assetTags.scripts.unshift({
                tagName: 'script',
                voidTag: false,
                attributes: {
                  defer: false,
                  src: this.options[key].url
                }
              });
            })
          callback(null, htmlData);
        });
    });
  }
}
module.exports = AutoExternalPlugin;
/**
 * 此插件有两个功能 
 * 1.分析项目代码，找到依赖的外部模块，我得知道我的项目中是否引入了lodash和jquery
 * 2.如果引入了lodash和jquery
 *    1.自动向输出的HTML文件里添加外链 <script src="CDN url">
 *    2.改造生产模块的流程，如果发现要打包的模块是一个外部模块的话就进行特殊处理，走外部模板的创建逻辑
 */