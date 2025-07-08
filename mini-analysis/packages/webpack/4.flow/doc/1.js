//const { SyncHook } = require('tapable')
class SyncHook {
  constructor(args) {
    this.args = args || [];
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push(fn);
  }
  call() {
    const args = Array.prototype.slice.call(arguments, 0, this.args.length);
    this.taps.forEach(tap => tap(...args));
  }
}
const hook = new SyncHook();
//tap 有点像events on
/* hook.tap('name1', (age) => {
  console.log('name1', age);
});
hook.tap('name2', (age) => {
  console.log('name2', age);
}); */
class Plugin1 {
  apply() {
    hook.tap('name1', (age) => {
      console.log('name1', age);
    });
  }
}
class Plugin2 {
  apply() {
    hook.tap('name2', (age) => {
      console.log('name2', age);
    });
  }
}
//先创建插件的实例
const plugin1 = new Plugin1();
const plugin2 = new Plugin2();
//挂载插件或者说要应用插件
plugin1.apply();
plugin2.apply();
//触发  events. emit
hook.call(12);