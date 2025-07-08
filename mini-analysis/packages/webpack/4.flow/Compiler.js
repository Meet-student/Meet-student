
const { SyncHook } = require('tapable');
const path = require('path');
const fs = require('fs');
const Compilation = require('./Compilation');
const fileDependencySet = new Set();
class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    }
  }
  run(callback) {
    this.hooks.run.call();
    const onCompiled = (err, stats, fileDependencies) => {
      const { assets } = stats;
      for (const filename in assets) {
        //10.在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
        let filePath = path.join(this.options.output.path, filename)
        fs.writeFileSync(filePath, assets[filename], 'utf8');
      }
      callback(err, {
        toJson: () => stats
      });
      //会遍历依赖的文件，对这些文件进行监听，当这些文件发生变化后会重新开始一次新的编译
      [...fileDependencies].forEach(fileDependency => {
        if (!fileDependencySet.has(fileDependency)) {
          fs.watch(fileDependency, () => this.compile(onCompiled));
          fileDependencySet.add(fileDependency);
        }
      });
      this.hooks.done.call();
    }
    //调用this.compile方法开始真正的编译 ，编译 成功后会执行onCompiled回调
    this.compile(onCompiled);
  }
  //每次调用compile方法，都会创建一个新的Compilation
  compile(callback) {
    const compilation = new Compilation(this.options);
    //调用compilation的build方法开始编译
    compilation.build(callback);
  }
}
module.exports = Compiler;