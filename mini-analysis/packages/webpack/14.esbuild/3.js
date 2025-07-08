const envPlugin = {
  name: 'env',
  setup(build) {//build=Compiler
    //rollup插件里的resolveId,决定如何查找文件路径
    //拦截名为env的导入路径，以使esbuild不把它们映射到文件的系统里
    // 用 env-ns命名空间来标记他们，以便使后面的插件可以处理它们
    build.onResolve({ filter: /^env$/, namespace: 'file' }, args => {
      return {
        path: args.path,//代表此模块的路径 env
        namespace: 'env-xx'//指定env不需于file这个命名空间，也就是说env并不对应文件系统中上的一个文件虚拟的模块
      }
    });
    //rollup插件中的load,决定模块内容
    build.onLoad({ filter: /.*/, namespace: 'env-xx' }, () => {
      return {
        contents: JSON.stringify(process.env),//用于指定模块的内容，如果有了，就走后面的onLoad回调和默读处理逻辑
        loader: 'json' //json用json这个loader 处理这个内容，JSON.parse(JSON.stringify(process.env))
      }
    });
  }
}

require('esbuild').build({
  entryPoints: ['main.js'],
  bundle: true,
  plugins: [envPlugin],
  outfile: 'out.js'
});