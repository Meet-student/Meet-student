const { AsyncSeriesBailHook } = require('tapable');
const hook = new AsyncSeriesBailHook(['name', 'age']);
console.time('cost');
hook.tapAsync('1', (name, age, callback) => {
  setTimeout(() => {
    console.log('1', name, age);
    callback();
  }, 1000);
});
hook.tapAsync('2', (name, age, callback) => {
  setTimeout(() => {
    console.log('2', name, age);
    callback(null, '第1个返回');
  }, 2000);
});
hook.tapAsync('3', (name, age, callback) => {
  setTimeout(() => {
    console.log('3', name, age);
    callback();
  }, 3000);
});
//call方法只有同步钩子才有，异步是没有
//hook.call(' ', 10);
hook.callAsync(' ', 10, (err, data) => {
  console.log('done', data1, data2);
  console.timeEnd('cost');
});

//老师sync的返回值是不是没用 
