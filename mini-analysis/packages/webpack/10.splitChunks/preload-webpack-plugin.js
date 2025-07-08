
/**
 * 思考一下，这个插件是应该如何实现
 * 1.找到本项目中那些异步加载的代码块
 * 2.针对每个异步加载的代码块，生成
 * <link href="hello.main.js" rel="preload" as="script"></link>
 * 3.把link插入是终生成的html文件里
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class PreloadWebpackPlugin {
  constructor(options) {
    this.options = options;
    this.preloadSources = new Set();
    this.prefetchSources = new Set();
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.parser
        .for('javascript/auto')//普通 的JS文件对应的钩子就是'javascript/auto'
        .tap('AutoExternalPlugin', parser => {
          parser.hooks.importCall.tap("ImportParserPlugin", expr => {//import('./title')
            const { options: importOptions } = parser.parseCommentOptions(expr.range);
            if (importOptions) {
              if (importOptions.webpackPreload === true) {
                const source = expr.source.value;// './hello'
                this.preloadSources.add(source);
              }
              if (importOptions.webpackPrefetch === true) {
                const source = expr.source.value;// './hello'
                this.prefetchSources.add(source);
              }
            }
          })
        })
    })
    compiler.hooks.compilation.tap('PreloadWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync('PreloadWebpackPlugin', (htmlData, callback) => {
        this.generateLinks(compilation, htmlData, callback);
      });
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap('PreloadWebpackPlugin', (htmlData) => {
        const resourceHints = this.resourceHints;
        if (resourceHints) {
          htmlData.assetTags.styles = [
            ...resourceHints,
            ...htmlData.assetTags.styles
          ]
        }
        return htmlData;
      });
    });
  }
  //1.获取异步代码块 2 获取异步代码块的生成的文件 3，生成link标签放入 this.resourceHints
  generateLinks(compilation, htmlData, callback) {
    //1.获取所有的代码块
    const chunks = [...compilation.chunks];
    //获取异步代码块
    const asyncChunks = chunks.filter(chunk => !chunk.canBeInitial()).filter(chunk => {
      //先获取到代码块中的模块，看一看这个模块是否拥有webpackPreload注释,如果有的话，就留下
      let iterable = chunk.modulesIterable;
      let values = iterable.values();
      let { value } = values.next();
      let rawRequest = value.rawRequest;
      return this.preloadSources.has(rawRequest);
    });
    const allFiles = asyncChunks.reduce((accumulated, chunk) => {
      return accumulated.add(...chunk.files);
    }, new Set());
    const links = [];
    for (const file of allFiles.values()) {
      links.push({
        tagName: 'link',
        attributes: {
          rel: 'preload',
          href: file
        }
      });
    }
    this.resourceHints = links;
    callback();
  }
}
module.exports = PreloadWebpackPlugin;