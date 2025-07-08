//有些我们想控制注册的回调函数的执行顺序
const { SyncHook } = require('./tapable');
let hook = new SyncHook(['name']);
hook.tap({ name: 'tap1', stage: 1 }, (name) => {
  console.log(1, name);
});
hook.tap({ name: 'tap3', stage: 3 }, (name) => {
  console.log(3, name);
});
hook.tap({ name: 'tap5', stage: 5 }, (name) => {
  console.log(5, name);
});
hook.tap({ name: 'tap2', before: ['tap3', 'tap5'], stage: 7 }, (name) => {
  console.log(2, name);
});
hook.call(' ');
//其实就是排序，多个回调它的stage是一样