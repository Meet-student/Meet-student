const { HookMap, SyncHook } = require('./tapable');
const keyedHookMap = new HookMap(() => new SyncHook(['name']));
keyedHookMap.for('key1').tap('plugin1', (name) => {
  console.log(1, name);
})
keyedHookMap.for('key1').tap('plugin2', (name) => console.log(2, name))
const hook = keyedHookMap.get('key1');
hook.call(' ');//后面在写插件的时候会用到这样的HookMap


keyedHookMap.for('key2').tap('plugin1', (name) => {
  console.log(1, name);
})
keyedHookMap.for('key2').tap('plugin2', (name) => console.log(2, name))
const hook2 = keyedHookMap.get('key1');
hook2.call(' ');//后面在写插件的时候会用到这样的HookMap

console.log(keyedHookMap);